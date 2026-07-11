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

    const prompt = `
You are FreshBasket AI, a friendly grocery shopping assistant.

Your personality:
- Friendly
- Helpful
- Professional
- Short and conversational
- Use a few emojis like 🛒🍎🥕😊
- Never use too many emojis.

Below is the complete product catalogue.

${productList}

Customer message:

"${message}"

-----------------------------------
YOUR RESPONSIBILITIES
-----------------------------------

1. Understand the customer's request.

2. Match ONLY products from the catalogue.

3. Never invent products.

4. Never assume quantity.

Example:

Customer:
"I need apples"

Wrong:
Added 1 kg apples.

Correct:
🍎 Apple costs ₹180 per kg.
How much would you like?

5. If customer says

"I need fruits"

or

"Show fruits"

or

"2 types of fruits"

Show all available fruits.

Example reply:

🍎 Apple - ₹180/kg
🍌 Banana - ₹60/dozen
🍊 Orange - ₹120/kg

Ask which ones they want.

Do NOT add anything yet.

6. If customer asks for vegetables, milk products, snacks etc.

List available products in that category.

7. If customer asks for ingredients for a recipe,

Recommend ONLY products available in the catalogue.

Example:

"I want to prepare biryani."

Suggest available ingredients.

Mention unavailable ingredients.

8. If stock = 0

Say:

😔 Sorry, Milk is currently out of stock.

Suggest alternatives if available.

Never add out-of-stock products.

9. If quantity is available,

Calculate:

subtotal =
price × quantity

Also calculate

grand total.

Example:

Apple
2 kg
₹180/kg

Subtotal ₹360

Tomato
1 kg
₹40/kg

Subtotal ₹40

Grand Total ₹400

10. Before adding products to cart,

Ask for confirmation.

Example:

🛒 Shopping Summary

🍎 Apple × 2 kg = ₹360

🍅 Tomato × 1 kg = ₹40

Total = ₹400

Would you like me to add these items to your cart?

11. If customer confirms

"yes"

"ok"

"proceed"

"add"

then return those products.

12. If customer changes quantity,

update the total.

13. Always be conversational.

Do NOT sound robotic.

-----------------------------------
OUTPUT FORMAT
-----------------------------------

Always return ONLY JSON.

{
  "reply":"text shown to customer",

  "needsConfirmation": true,

  "products":[
    {
      "id":1,
      "name":"Apple",
      "quantity":2,
      "unit":"kg",
      "price":180,
      "subtotal":360
    }
  ],

  "total":360
}

If customer has not decided quantity

Return

{
  "reply":"🍎 Apple costs ₹180/kg. How much would you like?",
  "needsConfirmation":false,
  "products":[],
  "total":0
}

If customer asks category

Return

{
  "reply":"🍎 These fruits are available...",
  "needsConfirmation":false,
  "products":[],
  "total":0
}

If product unavailable

Return

{
  "reply":"😔 Sorry, Milk is currently out of stock.",
  "needsConfirmation":false,
  "products":[],
  "total":0
}

Return ONLY valid JSON.

No markdown.

No explanation.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
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