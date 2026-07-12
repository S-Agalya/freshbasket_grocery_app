// import ai from "../services/geminiService.js";

// export const chatWithAI = async (req, res) => {
//   try {
//     const { message } = req.body;

//     const response = await ai.models.generateContent({
//       model: "gemini-flash-latest",
//       contents: message,
//     });

//     res.json({
//       reply: response.text,
//     });

//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       error: err.message,
//     });
//   }
// };

//conecting to db
import ai from "../services/geminiService.js";
import db from "../config/db.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message, history } = req.body;

    // Fetch products
    const result = await db.query(`
      SELECT
        id,
        name,
        category,
        price,
        stock,
        unit,
        unit_quantity
      FROM products
      WHERE stock > 0
      ORDER BY category, name
    `);

    const products = result.rows;

    // Build product catalogue
    const productList = products
      .map((p) => `${p.name} | ₹${p.price} | ${p.unit_quantity} ${p.unit} | stock ${p.stock}`)
      .join("\n");

    // Build system prompt - shopkeeper style, short and emotional
    const systemPrompt = `You are FreshBasket AI, a warm local grocery shopkeeper chatting with a customer.
Talk like a real shopkeeper, not a robot. Be friendly, casual, caring, and a little excited.

STYLE:
- Short and natural, like a real person texting.
- 1 to 2 sentences max.
- Use at least one emoji in every reply.
- Sound warm, helpful, and cheerful.
- Never sound formal or robotic.
- Answer the customer's latest request directly.
- Do not use generic filler. Speak to what the customer actually asked.
- If they ask to add an item, respond as if you are helping them do that.

PERSONALITY:
Cheerful 🌿 Helpful 🤝 Polite 🙏 Caring 💚 Warm 😊

PRODUCTS AVAILABLE:
${productList}

RULES:
- The latest customer message is the most important one.
- If the customer asks for a new product, answer about that new product only.
- Do not repeat the previous item unless the customer asks about it.
- If they say "add 2kg bananas", reply about bananas, not carrots or the old item.
- If they ask "is it available?", answer directly with stock status.
- If something is out of stock, show empathy and suggest a similar option.
- If they confirm with yes, respond with excitement and confirm the add.
- Keep replies simple, warm, and human.

EXAMPLES:
- "🍎 Great choice! Apples are ₹50/kg. How many kilos would you like?"
- "🥕 Fresh carrots today! ₹45/kg. How many kilos?"
- "🍌 Perfect! Bananas × 2kg = ₹90. Shall I add them? 😊"
- "🎉 Done! Added to your cart. Need anything else?"
- "😔 Sorry, milk is out today. But our curd is fresh and lovely!"

Return ONLY JSON.
{
  "reply": "Your warm shopkeeper response with at least one emoji",
  "needsQuantity": false,
  "needsConfirmation": false,
  "products": [{"id": 1, "name": "Banana", "quantity": 2, "price": 45, "subtotal": 90}],
  "total": 90
}`;

    // Build conversation history for Gemini
    const contents = [];

    // Add system message
    contents.push({
      role: "user",
      parts: [{ text: systemPrompt }]
    });

    contents.push({
      role: "model",
      parts: [{ text: "Understood! I'm your friendly shopkeeper. I'll help you shop with warmth and emotion. I remember what we've discussed and won't repeat myself. Ready! 🛒" }]
    });

    // Add a short slice of conversation history if provided
    const recentHistory = Array.isArray(history) ? history.slice(-6) : [];
    if (recentHistory.length > 0) {
      for (const turn of recentHistory) {
        if (turn.role === "user") {
          contents.push({
            role: "user",
            parts: [{ text: turn.text }]
          });
        } else if (turn.role === "assistant") {
          contents.push({
            role: "model",
            parts: [{ text: turn.text }]
          });
        }
      }
    }

    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const isStream = req.query.stream === "true";

    const normalizeText = (rawText) =>
      rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const parsePayload = (rawText) => {
      let parsed;
      try {
        parsed = JSON.parse(normalizeText(rawText));
      } catch (err) {
        console.error("Invalid Gemini JSON");
        console.log(rawText);
        throw new Error("Invalid AI response");
      }

      const reply = typeof parsed.reply === "string" ? parsed.reply.trim() : "";
      const hasEmoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(reply);
      parsed.reply = hasEmoji ? reply : `${reply || "Absolutely! I can help with that"} 😊`;
      return parsed;
    };

    if (isStream) {
      res.setHeader("Content-Type", "application/x-ndjson; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      if (typeof res.flushHeaders === "function") {
        res.flushHeaders();
      }

      let accumulatedText = "";
      try {
        const stream = await ai.models.generateContentStream({
          model: "gemini-flash-latest",
          contents: contents,
        });

        for await (const chunk of stream) {
          const chunkText = (chunk?.text || "").toString();
          if (!chunkText) continue;

          if (chunkText.startsWith(accumulatedText)) {
            accumulatedText = chunkText;
          } else {
            accumulatedText += chunkText;
          }

          res.write(JSON.stringify({ type: "chunk", text: accumulatedText }) + "\n");
          if (typeof res.flush === "function") {
            res.flush();
          }
        }

        const parsed = parsePayload(accumulatedText);
        res.write(JSON.stringify({ type: "done", payload: parsed }) + "\n");
        return res.end();
      } catch (err) {
        console.error(err);
        res.write(JSON.stringify({ type: "error", message: err.message || "AI Error" }) + "\n");
        return res.end();
      }
    }

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: contents,
    });

    let text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("Invalid Gemini JSON");
      console.log(text);

      return res.status(500).json({
        message: "Invalid AI response",
        raw: text,
      });
    }

    const reply = typeof parsed.reply === "string" ? parsed.reply.trim() : "";
    const hasEmoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(reply);

    parsed.reply = hasEmoji ? reply : `${reply || "Absolutely! I can help with that"} 😊`;

    res.json(parsed);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "AI Error",
      error: err.message,
    });
  }
};