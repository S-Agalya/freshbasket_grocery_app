import db from "../config/db.js";

export const getAdminStats = async (req, res) => {
  try {
    console.log("Fetching admin stats...");

    const totalProducts = await db.query("SELECT COUNT(*) FROM products");
    //const outOfStock = await db.query("SELECT COUNT(*) FROM products WHERE quantity = 0");

    console.log("Stats fetched successfully:", {
      totalProducts: totalProducts.rows[0].count,
      //outOfStock: outOfStock.rows[0].count,
    });

    res.json({
      products: parseInt(totalProducts.rows[0].count) || 0,
      // orders: 0,
      // outOfStock: parseInt(outOfStock.rows[0].count) || 0,
    });
  } catch (err) {
    console.error("❌ Error in /api/admin/stats:", err.message);
    res.status(500).json({ message: "Failed to fetch stats", error: err.message });
  }
};






export const getProductStockStats = async (req, res) => {
  try {
    console.log("📊 [stats] Fetching product stock stats...");

    // total products
    const totalRes = await db.query("SELECT COUNT(*) FROM products");
    const totalProducts = parseInt(totalRes.rows[0].count, 10);

    // out of stock (stock = 0)
    const outRes = await db.query("SELECT COUNT(*) FROM products WHERE stock = 0");
    const outOfStock = parseInt(outRes.rows[0].count, 10);

    // in stock (stock > 0)
    const inRes = await db.query("SELECT COUNT(*) FROM products WHERE stock > 0");
    const inStock = parseInt(inRes.rows[0].count, 10);

    // debug: show a few rows so we can visually verify
    const sample = await db.query("SELECT id, name, stock FROM products ORDER BY id LIMIT 20");

    console.log("========== STOCK STATS ==========");
    console.log("Total products :", totalProducts);
    console.log("In stock       :", inStock);
    console.log("Out of stock   :", outOfStock);
    console.log("Sample rows:");
    console.table(sample.rows); // nice table in node console
    console.log("=================================");

    return res.json({ products: totalProducts, inStock, outOfStock });
  } catch (err) {
    console.error("❌ Error in getProductStockStats:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
