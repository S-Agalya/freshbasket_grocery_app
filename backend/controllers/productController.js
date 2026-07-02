import db from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
};

export const searchProducts = async (req, res) => {
  const { q } = req.query;
  if (!q || q.trim().length === 0) return res.json([]);
  try {
    const result = await db.query(
      "SELECT * FROM products WHERE LOWER(name) LIKE $1 OR LOWER(category) LIKE $1 LIMIT 10",
      [`%${q.toLowerCase().trim()}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const result = await db.query("SELECT * FROM products WHERE category = $1", [category]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};
