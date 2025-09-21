import db from "../config/db.js";

// Get all admin products
export const getAdminProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM admin_products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin products", error: err.message });
  }
};

// Add new admin product (also updates app products table)
export const addAdminProduct = async (req, res) => {
  try {
    const { name, price, unitType, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !price || !unitType || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Insert into admin_products
    const adminQuery = `
      INSERT INTO admin_products (name, price, unit_type, category, image)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const adminResult = await db.query(adminQuery, [name, price, unitType, category, image]);

    // Insert into application products table
    const appQuery = `
      INSERT INTO products (name, price, unit_type, category, image)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await db.query(appQuery, [name, price, unitType, category, image]);

    res.json(adminResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add admin product", error: err.message });
  }
};
