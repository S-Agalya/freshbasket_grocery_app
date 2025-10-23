import db from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Get all products
export const getAdminProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// ✅ Add product
export const addAdminProduct = async (req, res) => {
  try {
    console.log("📦 Incoming Product:", req.body);
    console.log("📸 File received:", req.file ? req.file.originalname : "No file");

    const { name, price, unitType, category, stock, unit, unitQuantity } = req.body; // ✅ added unitQuantity

    if (!name || !price || !unitType || !category || stock == null || !unit) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ Upload image to Cloudinary
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            reject(error);
          } else {
            console.log("✅ Cloudinary uploaded:", result.secure_url);
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer);
    });

    const imageUrl = uploaded.secure_url;

    // ✅ Insert into PostgreSQL with unit_quantity
    const dbRes = await db.query(
      `INSERT INTO products (name, price, unit_type, category, image, stock, unit, unit_quantity)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [name, price, unitType, category, imageUrl, stock, unit, unitQuantity || 1] // ✅ default 1 if not provided
    );

    console.log("✅ Product added:", dbRes.rows[0]);
    res.status(201).json(dbRes.rows[0]);
  } catch (err) {
    console.error("🔥 Backend Error in addAdminProduct:", err);
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};

// ✅ Update product
export const updateAdminProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unitType, category, stock, unit, unitQuantity } = req.body; // ✅ added unitQuantity

    let imageUrl = null;

    if (req.file) {
      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploaded.secure_url;
    }

    // ✅ Update with new column
    const result = await db.query(
      `
      UPDATE products
      SET name=$1, price=$2, unit_type=$3, category=$4, stock=$5, unit=$6, unit_quantity=$7,
          image = COALESCE($8, image)
      WHERE id=$9
      RETURNING *;
      `,
      [name, price, unitType, category, stock, unit, unitQuantity || 1, imageUrl, id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ message: "Product not found" });

    res.json(result.rows[0]);
  } catch (err) {
    console.error("🔥 Error updating product:", err);
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

// ✅ Delete product
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
