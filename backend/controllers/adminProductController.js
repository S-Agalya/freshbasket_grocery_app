// export const updateAdminProduct = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, price, unitType, category } = req.body;
//     const image = req.file ? req.file.filename : null;

//     // Dynamic query
//     let query = `UPDATE products SET name=$1, price=$2, unit_type=$3, category=$4`;
//     const params = [name, price, unitType, category];

//     if (image) {
//       query += `, image=$5 WHERE id=$6 RETURNING *`;
//       params.push(image, id);
//     } else {
//       query += ` WHERE id=$5 RETURNING *`;
//       params.push(id);
//     }

//     const result = await db.query(query, params);
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error("❌ Error updating product:", err);
//     res.status(500).json({ message: "Failed to update product", error: err.message });
//   }
// };

import db from "../config/db.js";
export const getAdminProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Add new product
export const addAdminProduct = async (req, res) => {
  try {
    const { name, price, unitType, category } = req.body;
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    if (!name || !price || !unitType || !category || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await db.query(
      `INSERT INTO products (name, price, unit_type, category, image)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, price, unitType, category, imageUrl]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};

// Update product
export const updateAdminProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unitType, category } = req.body;
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    let query = `UPDATE products SET name=$1, price=$2, unit_type=$3, category=$4`;
    const params = [name, price, unitType, category];

    if (imageUrl) {
      query += `, image=$5 WHERE id=$6 RETURNING *`;
      params.push(imageUrl, id);
    } else {
      query += ` WHERE id=$5 RETURNING *`;
      params.push(id);
    }

    const result = await db.query(query, params);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

// Delete product
export const deleteAdminProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};
