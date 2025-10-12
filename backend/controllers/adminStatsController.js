import db from "../config/db.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalProducts = await db.query("SELECT COUNT(*) FROM products");
    const totalOrders = await db.query(
      "SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURRENT_DATE"
    );
    const outOfStock = await db.query(
      "SELECT COUNT(*) FROM products WHERE quantity = 0"
    );

    res.json({
      products: parseInt(totalProducts.rows[0].count) || 0,
      orders: parseInt(totalOrders.rows[0].count) || 0,
      outOfStock: parseInt(outOfStock.rows[0].count) || 0,
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};
