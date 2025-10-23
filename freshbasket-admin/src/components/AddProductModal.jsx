import { useState, useEffect } from "react";
import axios from "axios";

function AddProductModal({ onClose, onProductAdded, editProduct, API_URL }) {
  // Product info
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fruits");
  const [price, setPrice] = useState("");

  // Stock info
  const [stock, setStock] = useState(1); // Default stock = 1
  const [stockUnit, setStockUnit] = useState("pcs"); // pcs or bags

  // Unit info
  const [unitQuantity, setUnitQuantity] = useState(1); // Default unit = 1
  const [unitType, setUnitType] = useState("kg"); // kg, g, liter, ml

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const categories = [
    "Fruits",
    "Vegetables",
    "Dairy",
    "Grocery",
    "Detergents",
    "Shampoos",
    "Handwash",
    "Snacks",
    "Soaps"
  ];

  const stockUnits = ["pcs", "bags"];
  const unitTypes = ["kg", "g", "liter", "ml"];

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setCategory(editProduct.category);
      setPrice(editProduct.price);

      setStock(editProduct.stock || 1);
      setStockUnit(editProduct.stock_unit || "pcs");

      setUnitQuantity(editProduct.unit_quantity || 1);
      setUnitType(editProduct.unit_type || "kg");

      setPreview(editProduct.image || null);
      setImage(null);
    } else {
      setName("");
      setCategory("");
      setPrice("");
      setStock(1);
      setStockUnit("pcs");
      setUnitQuantity(1);
      setUnitType("kg");
      setPreview(null);
      setImage(null);
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("stock_unit", stockUnit);
    formData.append("unit_quantity", unitQuantity);
    formData.append("unit_type", unitType);

    if (image) formData.append("image", image);

    console.log("🧾 Sending product data:", [...formData.entries()]);

    try {
      if (editProduct) {
        await axios.put(
          `${API_URL}/api/admin/products/${editProduct.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          `${API_URL}/api/admin/products/add`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      onProductAdded();
      onClose();
    } catch (err) {
      console.error("❌ Error saving product:", err.response?.data || err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">{editProduct ? "Edit" : "Add"} Product</h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          {/* Name */}
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border px-3 py-2 rounded"
          />

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="border px-3 py-2 rounded"
          />

          {/* Stock quantity & stock unit */}
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Stock Quantity"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              className="border px-3 py-2 rounded flex-1"
            />
            <select
              value={stockUnit}
              onChange={(e) => setStockUnit(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              {stockUnits.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          {/* Unit quantity & unit type */}
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Unit Quantity"
              min="1"
              value={unitQuantity}
              onChange={(e) => setUnitQuantity(e.target.value)}
              required
              className="border px-3 py-2 rounded flex-1"
            />
            <select
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
              className="border px-3 py-2 rounded"
            >
              {unitTypes.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded mt-2"
            />
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editProduct ? "Update" : "Add"} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
