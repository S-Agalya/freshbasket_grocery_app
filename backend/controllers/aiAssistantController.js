import ai from "../services/geminiService.js";
import db from "../config/db.js";

const normalize = (value = "") =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const findBestProduct = (products, inputName) => {
  const query = normalize(inputName);
  if (!query) return null;

  let bestMatch = null;
  let bestScore = 0;

  products.forEach((product) => {
    const name = normalize(product.name);
    if (!name) return;

    if (query === name) {
      bestMatch = product;
      bestScore = 100;
      return;
    }

    if (query.includes(name) || name.includes(query)) {
      bestMatch = product;
      bestScore = 90;
      return;
    }

    const score = Math.max(
      name.includes(query.split(" ")[0]) ? 50 : 0,
      query.includes(name.split(" ")[0]) ? 50 : 0
    );

    if (score > bestScore) {
      bestScore = score;
      bestMatch = product;
    }
  });

  return bestScore >= 50 ? bestMatch : null;
};

export const scanShoppingList = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a shopping list image." });
    }

    const productResult = await db.query(`
      SELECT id, name, category, price, stock, unit, unit_quantity
      FROM products
      ORDER BY name
    `);

    const products = productResult.rows;
    const productList = products
      .map((p) => `${p.name} | category: ${p.category} | price: ₹${p.price} | stock: ${p.stock} | unit: ${p.unit_quantity} ${p.unit}`)
      .join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are FreshBasket AI. Read this grocery shopping list image and extract the items that appear on the list.
Return ONLY valid JSON in this exact shape:
{
  "reply": "Short friendly message",
  "items": [{ "name": "Apple", "quantity": 2, "unit": "kg" }]
}
Rules:
- Only include grocery items that are likely available in the store.
- Keep item names short and clear.
- If the image has a quantity like 2kg or 1 litre, capture it in quantity and unit.
- If you cannot identify an item confidently, skip it.
- Do not include any extra commentary.

Available products:
${productList}`,
            },
            {
              inlineData: {
                mimeType: req.file.mimetype,
                data: req.file.buffer.toString("base64"),
              },
            },
          ],
        },
      ],
    });

    let text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      console.error("Invalid image list JSON", err);
      return res.status(500).json({
        message: "Could not understand the uploaded list.",
        raw: text,
      });
    }

    const matchedProducts = [];
    (parsed.items || []).forEach((item) => {
      const product = findBestProduct(products, item.name);
      if (!product) return;
      if (Number(product.stock) <= 0) return;

      const quantity = Number(item.quantity || 1);
      matchedProducts.push({
        id: product.id,
        name: product.name,
        quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1,
        unit: item.unit || product.unit || "qty",
        price: Number(product.price),
        subtotal: Number(product.price) * (Number.isFinite(quantity) && quantity > 0 ? quantity : 1),
      });
    });

    const total = matchedProducts.reduce((sum, item) => sum + item.subtotal, 0);

    res.json({
      intent: "PHOTO_LIST",
      reply:
        parsed.reply || `I found ${matchedProducts.length} item(s) from your photo and added them to your cart.`,
      needsQuantity: false,
      needsConfirmation: false,
      products: matchedProducts,
      total,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "AI image analysis failed", error: err.message });
  }
};
