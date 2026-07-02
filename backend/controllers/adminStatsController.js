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
    console.log("📊 [Admin Stats] Fetching stock summary...");

    // Total products
    const totalRes = await db.query("SELECT COUNT(*) FROM products");
    const totalProducts = parseInt(totalRes.rows[0].count, 10);

    // In stock and Out of stock using correct column name: 'stock'
    const inStockRes = await db.query("SELECT COUNT(*) FROM products WHERE stock > 0");
    const outOfStockRes = await db.query("SELECT COUNT(*) FROM products WHERE stock = 0");

    const inStock = parseInt(inStockRes.rows[0].count, 10);
    const outOfStock = parseInt(outOfStockRes.rows[0].count, 10);

    // Debug log — shows full data
    const sampleRows = await db.query("SELECT id, name, stock FROM products ORDER BY id");
    console.log("========= 📦 STOCK DETAILS =========");
    console.log("Total Products :", totalProducts);
    console.log("In Stock       :", inStock);
    console.log("Out of Stock   :", outOfStock);
    console.table(sampleRows.rows);
    console.log("====================================");

    res.json({
      products: totalProducts,
      inStock,
      outOfStock,
    });
  } catch (err) {
    console.error("❌ Error fetching product stats:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



// ✅ Low stock alert — products at or below threshold
export const getLowStockProducts = async (req, res) => {
  const threshold = parseInt(req.query.threshold) || 5;
  try {
    const result = await db.query(
      "SELECT id, name, category, stock, stock_unit FROM products WHERE stock <= $1 ORDER BY stock ASC",
      [threshold]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching low stock:", err);
    res.status(500).json({ message: "Failed to fetch low stock", error: err.message });
  }
};

// ✅ Sales report — daily revenue (last 30 days) + revenue by category
export const getSalesReport = async (req, res) => {
  try {
    const daily = await db.query(`
      SELECT DATE(created_at) as date,
             COALESCE(SUM(total_amount), 0)::numeric as revenue,
             COUNT(*) as orders
      FROM orders
      WHERE status NOT IN ('Cancelled')
      GROUP BY DATE(created_at)
      ORDER BY date ASC
      LIMIT 30
    `);

    const byCategory = await db.query(`
      SELECT p.category,
             COALESCE(SUM(ci.price * ci.quantity), 0)::numeric as revenue
      FROM cart_items ci
      JOIN products p ON p.id = ci.product_id
      JOIN orders o ON o.id = ci.order_id
      WHERE o.status NOT IN ('Cancelled')
      GROUP BY p.category
      ORDER BY revenue DESC
    `);

    const totals = await db.query(`
      SELECT
        COUNT(*) as total_orders,
        COALESCE(SUM(total_amount), 0)::numeric as total_revenue
      FROM orders
      WHERE status NOT IN ('Cancelled')
    `);

    res.json({
      daily: daily.rows,
      byCategory: byCategory.rows,
      totalOrders: parseInt(totals.rows[0].total_orders),
      totalRevenue: parseFloat(totals.rows[0].total_revenue),
    });
  } catch (err) {
    console.error("❌ Error fetching sales report:", err);
    res.status(500).json({ message: "Failed to fetch sales report", error: err.message });
  }
};
