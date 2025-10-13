import db from "../config/db.js";

// export const getAdminStats = async (req, res) => {
//   try {
//     console.log("Fetching total products...");
//     const totalProducts = await db.query("SELECT COUNT(*) FROM products");

//     console.log("Fetching today's orders...");
//     const totalOrders = await db.query(
//       "SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURRENT_DATE"
//     );

//     console.log("Fetching out of stock products...");
//     const outOfStock = await db.query(
//       "SELECT COUNT(*) FROM products WHERE quantity = 0"
//     );

//     res.json({
//       products: parseInt(totalProducts.rows[0].count) || 0,
//       orders: parseInt(totalOrders.rows[0].count) || 0,
//       outOfStock: parseInt(outOfStock.rows[0].count) || 0,
//     });
//   } catch (err) {
//     console.error("Error fetching stats:", err.message);
//     res.status(500).json({ message: "Failed to fetch stats", error: err.message });
//   }
// };


// export const getAdminStats = async (req, res) => {
//   try {
//     const totalProducts = await db.query("SELECT COUNT(*) FROM products");
//     // Temporarily remove this line causing 500 error
//     // const totalOrders = await db.query("SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURRENT_DATE");
//     const outOfStock = await db.query("SELECT COUNT(*) FROM products WHERE quantity = 0");

//     res.json({
//       products: parseInt(totalProducts.rows[0].count) || 0,
//       orders: 0, // return static value for now
//       outOfStock: parseInt(outOfStock.rows[0].count) || 0,
//     });
//   } catch (err) {
//     console.error("Error fetching stats:", err);
//     res.status(500).json({ message: "Failed to fetch stats" });
//   }
// };


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
