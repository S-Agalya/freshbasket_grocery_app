import db from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

export const getAdminProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// ✅ Add new product
export const addAdminProduct = async (req, res) => {
  try {
    const { name, price, unitType, category } = req.body;

    let imageUrl = null;
    if (req.file) {
      const uploaded = await cloudinary.uploader.upload_stream(
        { folder: "products" },
        async (error, result) => {
          if (error) throw new Error("Cloudinary upload failed");
          imageUrl = result.secure_url;

          const dbRes = await db.query(
            `INSERT INTO products (name, price, unit_type, category, image)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [name, price, unitType, category, imageUrl]
          );

          return res.status(201).json(dbRes.rows[0]);
        }
      );

      // Pipe buffer data
      uploaded.end(req.file.buffer);
    } else {
      return res.status(400).json({ message: "Image is required" });
    }
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};

// ✅ Update product
export const updateAdminProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unitType, category } = req.body;

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

    const result = await db.query(
      `
      UPDATE products
      SET name=$1, price=$2, unit_type=$3, category=$4, image=COALESCE($5, image)
      WHERE id=$6 RETURNING *`,
      [name, price, unitType, category, imageUrl, id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error updating product:", err);
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
