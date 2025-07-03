import db from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
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
