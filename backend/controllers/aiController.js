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

    // Fetch products from database
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
      ORDER BY name
    `);

    const products = result.rows;

    // Build a clean product list for Gemini
    const productList = products
      .map(
        (p) => `
ID: ${p.id}
Name: ${p.name}
Category: ${p.category}
Price: ₹${p.price}
Stock: ${p.stock}
Unit: ${p.unit_quantity} ${p.unit}
`
      )
      .join("\n");

    const prompt = `
You are the AI shopping assistant of FreshBasket Grocery Store.

These are the available products in the store.

${productList}

Customer Request:
"${message}"

Instructions:

1. Understand exactly what the customer wants.
2. Match ONLY products from the product list.
3. Never invent product names.
4. Extract quantities if the customer mentions them.
5. If stock = 0, tell the customer the product is out of stock.
6. NEVER include out-of-stock products in the "products" array.
7. If possible, suggest similar available products.
8. If the customer asks for ingredients for a recipe, recommend ONLY products available in the list.
9. Return ONLY valid JSON.

Response format:

{
  "reply": "Your response to the customer",
  "products": [
    {
      "id": 1,
      "quantity": 2
    }
  ]
}

If nothing can be added:

{
  "reply": "Sorry, Milk is currently out of stock.",
  "products": []
}

Return ONLY JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });

    let text = response.text;

    // Remove markdown if Gemini returns it
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("Gemini returned invalid JSON:");
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