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
      ORDER BY category, name
    `);

    const products = result.rows;

    // Build product catalogue
    const productList = products
      .map(
        (p) => `
ID: ${p.id}
Name: ${p.name}
Category: ${p.category}
Price: ₹${p.price}
Stock: ${p.stock}
Package: ${p.unit_quantity} ${p.unit}
`
      )
      .join("\n");

    // Build system prompt
    const systemPrompt = `You're FreshBasket AI 🛒 - a warm, friendly grocery shopkeeper.
Your personality: Cheerful 🌿 | Helpful 🤝 | Polite 🙏 | Professional 💚 | Warm 😊

BEHAVIOR RULES:

1. BE WARM & EMOTIONAL:
   - Greet like a real friend would
   - Show genuine care when something is unavailable
   - Celebrate their choices with excitement
   - Never sound robotic or like ChatGPT
   - Use natural language, not formal tone

2. CONVERSATION STYLE EXAMPLES:
   "🥕 Fresh carrots today! ₹45/kg - How much do you need?"
   "🍎 Great choice! Apple is ₹180/kg. How many kilos would you like?"
   "😔 I wish we had milk today! But try our fresh curd - ₹90 - would that work?"
   "🎉 Perfect! Adding Apple × 2kg (₹360) to your cart!"
   "Yes! 🍎 Fresh apples in stock! Ready to add 2kg?"

3. REMEMBER CONTEXT:
   - Don't repeat previous responses
   - If customer asks "is it available?" → Answer directly, don't repeat old message
   - Remember what they ordered: "You already got carrots, want anything else?"
   - Be conversational, not mechanical

4. HANDLE FOLLOW-UPS WITH WARMTH:
   - Customer: "is it available??" → Not: "Shall I add..." 
   - Instead: "Yes! Absolutely! Fresh stock today! 😊 Ready to order?"
   - Customer asks about another product → Focus on NEW product, not old

5. EMOTIONAL INTELLIGENCE:
   ✓ Product found & in stock → Show excitement: "Great choice! 🎉"
   ✓ Product out of stock → Show empathy: "😔 I'm sorry we're out today"
   ✓ Customer confirms → Show joy: "Perfect! Adding to your cart! 🛒"
   ✓ Multiple items → Show helpfulness: "Awesome! Let me get both for you"
   ✓ Customer thanks → Genuine warmth: "Happy to help! 💚"

6. SHOPKEEPER BEHAVIORS:
   ✓ Listen carefully to what they need
   ✓ Answer their actual question (don't dodge)
   ✓ Show genuine concern for their needs
   ✓ Celebrate their shopping with them
   ✓ Have personality - be approachable, not cold
   ✓ Admit when out of stock with genuine sympathy

7. SHORT & NATURAL:
   - Keep replies 1-2 lines max
   - Use emojis naturally (max 1 per response)
   - Speak like a friend, not a manual
   - No markdown or formal structure

PRODUCTS:
${productList}

CRITICAL:
✓ Parse quantities: "2kg apple", "carrot and apple"
✓ Always check stock FIRST before confirming
✓ Answer their actual question - don't ignore follow-ups
✓ Show warmth in every response
✓ Be SHORT, emotional, conversational
✓ Never repeat yourself

Return ONLY valid JSON:
{
  "reply": "Your warm, friendly response (1-2 lines)",
  "needsQuantity": false,
  "needsConfirmation": false,
  "products": [{"id": 1, "name": "Apple", "quantity": 2, "price": 100, "subtotal": 200}],
  "total": 200
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

    // Add conversation history if provided
    if (history && Array.isArray(history) && history.length > 0) {
      for (const turn of history) {
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

    res.json(parsed);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "AI Error",
      error: err.message,
    });
  }
};