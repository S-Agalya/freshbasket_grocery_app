// controllers/adminOrders.js
import db from "../config/db.js";

export const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders
    const ordersResult = await db.query(`SELECT id, customer_name, phone, address, comments, total_amount, status, created_at FROM orders ORDER BY created_at DESC`);
    const orders = ordersResult.rows;

    // For each order, fetch cart items
    for (const order of orders) {
      const itemsResult = await db.query(
        `SELECT c.product_id, c.quantity, c.price, p.name 
         FROM cart_items c
         JOIN products p ON p.id = c.product_id
         WHERE c.order_id = $1`,
        [order.id]
      );
      order.products = itemsResult.rows;
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    await db.query(
      `UPDATE orders SET status = $1 WHERE id = $2`,
      [status, orderId]
    );
    res.json({ message: "Order status updated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};
