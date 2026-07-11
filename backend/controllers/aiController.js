import ai from "../services/geminiService.js";
import db from "../config/db.js";
import { parseShoppingRequest } from "../services/productMatcher.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

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

    const fallbackResult = parseShoppingRequest(message, products);

    if (fallbackResult.intent !== "PRODUCT_ONLY" && fallbackResult.intent !== "PRODUCT_WITH_QUANTITY") {
      return res.json(fallbackResult);
    }

    const productList = products
      .map((p) => `ID: ${p.id} | Name: ${p.name} | Category: ${p.category} | Price: ₹${p.price} | Stock: ${p.stock} | Package: ${p.unit_quantity || ""} ${p.unit || ""}`)
      .join("\n");

    const prompt = `
You are FreshBasket AI, a friendly grocery assistant.
Your job is to understand shopping requests and return JSON only.

Available products:
${productList}

Customer message:
"${message}"

Return JSON in this exact shape:
{
  "intent": "PRODUCT_WITH_QUANTITY",
  "reply": "",
  "needsQuantity": false,
  "needsConfirmation": true,
  "products": [
    { "id": 1, "name": "Apple", "quantity": 2, "unit": "kg", "price": 180, "subtotal": 360 }
  ],
  "total": 360
}

Rules:
- If the customer only names a product and no quantity, return needsQuantity=true.
- If the customer includes quantity, return needsConfirmation=true and include the product with subtotal.
- If the product is out of stock, return intent "OUT_OF_STOCK".
- If the product is not found, return intent "PRODUCT_NOT_FOUND".
- Do not guess. Use only the available products.
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