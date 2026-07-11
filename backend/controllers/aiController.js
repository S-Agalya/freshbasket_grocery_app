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

    // Get all products
    const result = await db.query(`
      SELECT
        id,
        name,
        category,
        price,
        image,
        stock,
        unit,
        unit_quantity
      FROM products
      ORDER BY name
    `);

    const products = result.rows;

    const prompt = `
You are an AI shopping assistant for FreshBasket.

These are the products available.

${JSON.stringify(products)}

Customer says:

"${message}"

Your task:

1. Understand what the customer wants.
2. Match ONLY products from the above list.
3. Never invent products.
4. If quantity is mentioned, extract it.
5. Return ONLY JSON.

Format:

{
  "reply":"Short response",
  "products":[
      {
        "id":1,
        "quantity":2
      }
  ]
}

No markdown.
No explanation.
Only JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text.trim();

    // Remove markdown if Gemini adds it
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const parsed = JSON.parse(text);

    res.json(parsed);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};