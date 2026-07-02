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
    let { name, price, category, stock, stock_unit, unit_quantity, unit, product_type } = req.body;

    if (!name || !price || !category || !stock || !unit_quantity || !unit) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) return res.status(400).json({ message: "Image is required" });

    // ✅ Auto-fix stock_unit for bulk products
    if (product_type === "bulk") {
      stock_unit = "bags"; // always store as bags
    }

    // Upload image to Cloudinary
    const uploaded = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    const imageUrl = uploaded.secure_url;

    // Insert into DB
    const dbRes = await db.query(
      `INSERT INTO products
      (name, price, category, image, stock, stock_unit, unit_quantity, unit, product_type)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [name, price, category, imageUrl, stock, stock_unit, unit_quantity, unit, product_type]
    );

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
    let { name, price, category, stock, stock_unit, unit_quantity, unit, product_type } = req.body;

    // ✅ Auto-fix stock_unit for bulk products
    if (product_type === "bulk") {
      stock_unit = "bags";
    }

    let imageUrl = null;
    if (req.file) {
      const uploaded = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(req.file.buffer);
      });
      imageUrl = uploaded.secure_url;
    }

    const result = await db.query(
      `UPDATE products
       SET name=$1, price=$2, category=$3,
           stock=$4, stock_unit=$5, unit_quantity=$6, unit=$7,
           product_type=$8,
           image=COALESCE($9, image)
       WHERE id=$10
       RETURNING *`,
      [name, price, category, stock, stock_unit, unit_quantity, unit, product_type, imageUrl, id]
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



// ✅ Bulk add products from CSV (no image upload)
export const bulkAddProducts = async (req, res) => {
  const { products } = req.body;
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "No products provided" });
  }
  try {
    let inserted = 0;
    for (const p of products) {
      if (!p.name || !p.price || !p.category) continue; // skip invalid rows
      await db.query(
        `INSERT INTO products (name, price, category, stock, stock_unit, unit_quantity, unit, product_type, image)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          p.name.trim(),
          parseFloat(p.price),
          p.category.trim(),
          parseInt(p.stock) || 0,
          p.stock_unit?.trim() || 'pcs',
          parseFloat(p.unit_quantity) || 1,
          p.unit?.trim() || 'pcs',
          p.product_type?.trim() || 'normal',
          p.image?.trim() || null,
        ]
      );
      inserted++;
    }
    res.status(201).json({ inserted });
  } catch (err) {
    console.error("❌ Bulk upload error:", err);
    res.status(500).json({ message: "Bulk upload failed", error: err.message });
  }
};
