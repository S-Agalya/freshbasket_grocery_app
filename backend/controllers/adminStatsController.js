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
    console.log("📊 Fetching product stock stats...");

    // Fetch total product count
    const totalRes = await db.query("SELECT COUNT(*) FROM products");
    const totalProducts = parseInt(totalRes.rows[0].count);

    // Fetch out-of-stock count (stock = 0)
    const outOfStockRes = await db.query("SELECT COUNT(*) FROM products WHERE stock = 0");
    const outOfStock = parseInt(outOfStockRes.rows[0].count);

    // Fetch in-stock count (stock > 0)
    const inStockRes = await db.query("SELECT COUNT(*) FROM products WHERE stock > 0");
    const inStock = parseInt(inStockRes.rows[0].count);

    // Log everything for debugging
    console.log("========== 🧾 STOCK STATS ==========");
    console.log("Total Products :", totalProducts);
    console.log("In Stock       :", inStock);
    console.log("Out of Stock   :", outOfStock);
    console.log("====================================");

    res.json({
      products: totalProducts,
      inStock,
      outOfStock,
    });
  } catch (err) {
    console.error("❌ Error fetching product stats:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
