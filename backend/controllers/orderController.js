

import db from "../config/db.js";

export const placeOrder = async (req, res) => {
  const { customerName, customerPhone, customerAddress, comments, cartItems } = req.body;

  try {
    // ✅ Check stock availability first
    for (const item of cartItems) {
      const productRes = await db.query("SELECT stock, name FROM products WHERE id = $1", [item.id]);
      if (!productRes.rows[0]) return res.status(404).json({ message: `Product ${item.name} not found` });
      if (productRes.rows[0].stock < item.qty) {
        return res.status(400).json({ message: `Insufficient stock for ${productRes.rows[0].name}` });
      }
    }

    // Calculate total
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    // Insert order
    const result = await db.query(
      `INSERT INTO orders (customer_name, phone, address, comments, total_amount)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [customerName, customerPhone, customerAddress, comments, totalAmount]
    );
    const orderId = result.rows[0].id;

    // Insert cart items & reduce stock
    for (const item of cartItems) {
      await db.query(
        `INSERT INTO cart_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [orderId, item.id, item.qty, item.price]
      );

      await db.query(
        `UPDATE products SET stock = stock - $1 WHERE id = $2`,
        [item.qty, item.id]
      );
    }

    res.status(201).json({ orderId, message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

export const getOrdersByPhone = async (req, res) => {
  const { phone } = req.params;
  try {
    const ordersResult = await db.query(
      `SELECT id, customer_name, phone, address, total_amount, status, created_at
       FROM orders WHERE phone = $1 ORDER BY created_at DESC`,
      [phone]
    );
    const orders = ordersResult.rows;
    for (const order of orders) {
      const itemsResult = await db.query(
        `SELECT ci.quantity, ci.price, p.name, p.image
         FROM cart_items ci
         JOIN products p ON p.id = ci.product_id
         WHERE ci.order_id = $1`,
        [order.id]
      );
      order.items = itemsResult.rows;
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

export const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch order info
    const orderResult = await db.query(
      `SELECT * FROM orders WHERE id = $1`,
      [id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const order = orderResult.rows[0];

    // Fetch items for this order
    const itemsResult = await db.query(
      `SELECT * FROM cart_items WHERE order_id = $1`,
      [id]
    );

    order.items = itemsResult.rows;

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order", error: err.message });
  }
};
