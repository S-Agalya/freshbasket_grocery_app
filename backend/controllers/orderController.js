import db from "../config/db.js";

export const placeOrder = async (req, res) => {
  const { customerName, customerPhone, customerAddress, comments, cartItems } = req.body;

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  try {
    // Insert order
    const result = await db.query(
      `INSERT INTO orders (customer_name, phone, address, comments, total_amount)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [customerName, customerPhone, customerAddress, comments, totalAmount]
    );

    const orderId = result.rows[0].id;

    // Insert cart items
    for (const item of cartItems) {
      await db.query(
        `INSERT INTO cart_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.id, item.qty, item.price]
      );
    }

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};
