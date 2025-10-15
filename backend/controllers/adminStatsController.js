import db from "../config/db.js";

export const getAdminStats = async (req, res) => {
  try {
    console.log("Fetching admin stats...");

    const totalProducts = await db.query("SELECT COUNT(*) FROM products");
    const outOfStock = await db.query("SELECT COUNT(*) FROM products WHERE quantity = 0");

    console.log("Stats fetched successfully:", {
      totalProducts: totalProducts.rows[0].count,
      outOfStock: outOfStock.rows[0].count,
    });

    res.json({
      products: parseInt(totalProducts.rows[0].count) || 0,
      orders: 0,
      outOfStock: parseInt(outOfStock.rows[0].count) || 0,
    });
  } catch (err) {
    console.error("❌ Error in /api/admin/stats:", err.message);
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};
export const getProductStockStats = async (req, res) => {
  try {
    // Total products
    const totalRes = await db.query("SELECT COUNT(*) FROM products");
    const totalProducts = parseInt(totalRes.rows[0].count);

    // Out of stock products (using the correct column name: stocks)
    const outOfStockRes = await db.query(
      "SELECT COUNT(*) FROM products WHERE stocks = 0"
    );
    const outOfStock = parseInt(outOfStockRes.rows[0].count);

    res.json({ products: totalProducts, outOfStock });
  } catch (err) {
    console.error("Error fetching product stats:", err);
    res.status(500).json({ message: "Server error" });
  }
};