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
    const { message } = req.body;

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

 const prompt = `You're a friendly grocery shopkeeper. Be warm, emotional, SHORT.
Use 1 emoji max per response. Act like a real friend.

PRODUCTS:
${productList}

CUSTOMER: "${message}"

IF wants fruits/veggies → List available, ask which
IF says product name → Show price, ask quantity  
IF says quantity (e.g. "2kg apple", "carrot and apple") → 
  - Check if available + stock > 0
  - Show all items with prices & total
  - Ask to add (needsConfirmation=true)
IF says "yes/ok/add" → Show excitement, confirm
IF asks "is it available?" → Answer directly with stock status
IF out of stock → Show empathy, suggest alternatives
IF thanks → Say "Happy to help! 💚"

IMPORTANT:
✓ Parse multiple items ("carrot and apple" = 2 products)
✓ Extract quantities (2kg, 3 units, etc)
✓ Always check stock before confirming
✓ Be SHORT and emotional, not robotic
✓ Answer their actual question

Return ONLY valid JSON:
{
  "reply": "Your warm response (1-2 lines max)",
  "needsQuantity": false,
  "needsConfirmation": false,
  "products": [{"id": 1, "name": "Apple", "quantity": 2, "price": 100, "subtotal": 200}],
  "total": 200
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
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