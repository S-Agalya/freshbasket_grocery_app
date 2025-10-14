// controllers/adminOrders.js
import db from "../config/db.js";

// export const getAllOrders = async (req, res) => {
//   try {
//     // Fetch all orders
//     const ordersResult = await db.query(`SELECT id, customer_name, phone, address, comments, total_amount, status, created_at FROM orders ORDER BY created_at DESC`);
//     const orders = ordersResult.rows;

//     // For each order, fetch cart items
//     for (const order of orders) {
//       const itemsResult = await db.query(
//         `SELECT c.product_id, c.quantity, c.price, p.name 
//          FROM cart_items c
//          JOIN products p ON p.id = c.product_id
//          WHERE c.order_id = $1`,
//         [order.id]
//       );
//       order.products = itemsResult.rows;
//     }

//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch orders", error: err.message });
//   }
// };
export const getAllOrders = async (req, res) => {
  try {
    const { today } = req.query;

    let query = `
      SELECT id, customer_name, phone, address, comments, total_amount, status, created_at
      FROM orders
    `;

    // If frontend asks for only today's orders
    if (today === "true") {
      query += ` WHERE DATE(created_at) = CURRENT_DATE`;
    }

    query += ` ORDER BY created_at DESC`;

    const ordersResult = await db.query(query);
    const orders = ordersResult.rows;

    // Fetch items for each order
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
    console.error("Error fetching orders:", err);
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

export const getOrderStats = async (req, res) => {
  try {
    const totalOrdersResult = await db.query(`SELECT COUNT(*) FROM orders`);
    const pendingOrdersResult = await db.query(`SELECT COUNT(*) FROM orders WHERE status = 'Pending'`);
    const completedOrdersResult = await db.query(`SELECT COUNT(*) FROM orders WHERE status = 'Completed'`);

    const todayOrdersResult = await db.query(`
      SELECT COUNT(*) 
      FROM orders 
      WHERE DATE(created_at) = CURRENT_DATE
    `);

    const todayPendingOrdersResult = await db.query(`
      SELECT COUNT(*) 
      FROM orders 
      WHERE DATE(created_at) = CURRENT_DATE AND status = 'Pending'
    `);

    res.json({
      totalOrders: parseInt(totalOrdersResult.rows[0].count),
      pendingOrders: parseInt(pendingOrdersResult.rows[0].count),
      completedOrders: parseInt(completedOrdersResult.rows[0].count),
      todayOrders: parseInt(todayOrdersResult.rows[0].count),
      todayPendingOrders: parseInt(todayPendingOrdersResult.rows[0].count),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order stats", error: err.message });
  }
};
