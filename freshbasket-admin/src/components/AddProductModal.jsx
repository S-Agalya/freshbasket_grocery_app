



// import { useState, useEffect } from "react";
// import axios from "axios";

// function AddProductModal({ onClose, onProductAdded, editProduct, API_URL }) {
//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("Fruits");
  
//   const [price, setPrice] = useState("");
//   const [stock, setStock] = useState(1); // <-- stock
//   const [unit, setUnit] = useState("pcs"); // <-- unit
//    const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);


//   const categories = [
//     "Fruits",
//     "Vegetables",
//     "Dairy",
//     "Grocery",
//     "Detergents",
//     "Shampoos",
//     "Handwash",
//     "Snacks",
//     "Soaps"
//   ];

//   const units = ["pcs", "kg", "g", "liter", "ml"];

//   useEffect(() => {
//     if (editProduct) {
//       setName(editProduct.name);
//       setCategory(editProduct.category);
//       setPrice(editProduct.price);
//       setStock(editProduct.stock || 1);
//       setUnit(editProduct.unit || "pcs");
//        setPreview(editProduct.image || null);
//        setImage(null);
//     }else {
//       setName("");
//       setPrice("");
//       setUnit("kg");
//       setCategory("");
//       setStock("1")
//       setImage(null);
//       setPreview(null);
//     }
//   }, [editProduct]);

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append("name", name);
//   formData.append("price", price);
//   formData.append("unitType", unit); // must match backend
//   formData.append("category", category);
//   formData.append("stock", stock);
//   formData.append("unit", unit);
//   if (image) formData.append("image", image);

//   console.log("🧾 Sending product data:", [...formData.entries()]);

//   try {
//     if (editProduct) {
//       await axios.put(
//         `${API_URL}/api/admin/products/${editProduct.id}`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//     } else {
//       await axios.post(
//         `${API_URL}/api/admin/products/add`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//     }

//     onProductAdded();
//     onClose();
//   } catch (err) {
//     console.error("❌ Error saving product:", err.response?.data || err.message);
//   }
// };


//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4">{editProduct ? "Edit" : "Add"} Product</h2>

//         <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="border px-3 py-2 rounded"
//           />

//           <select
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border px-3 py-2 rounded"
//             required
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>

//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             className="border px-3 py-2 rounded"
//           />

//           {/* ✅ Stock input */}
//           <div className="flex space-x-2">
//             <input
//               type="number"
//               placeholder="Stock Quantity"
//               min="0"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//               required
//               className="border px-3 py-2 rounded flex-1"
//             />
//             <select
//               value={unit}
//               onChange={(e) => setUnit(e.target.value)}
//               className="border px-3 py-2 rounded"
//             >
//               {units.map((u) => (
//                 <option key={u} value={u}>{u}</option>
//               ))}
//             </select>
//           </div>

//            <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               setImage(e.target.files[0]);
//               setPreview(URL.createObjectURL(e.target.files[0]));
//             }}
//           />

//           {preview && (
//             <img
//               src={preview}
//               alt="Preview"
//               className="w-24 h-24 object-cover rounded mt-2"
//             />
//           )}


//           <div className="flex justify-end space-x-2 mt-3">
//             <button
//               type="button"
//               onClick={onClose}
//               className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//             >
//               {editProduct ? "Update" : "Add"} Product
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddProductModal;


import { useState, useEffect } from "react";
import axios from "axios";

function AddProductModal({ onClose, onProductAdded, editProduct, API_URL }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Select Category");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState("pcs");
  const [unitQuantity, setUnitQuantity] = useState(""); // ✅ Default 1
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
    "Soaps",
  ];

  const units = ["pcs", "kg", "g", "liter", "ml", "others"];

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setCategory(editProduct.category);
      setPrice(editProduct.price);
      setStock(editProduct.stock );
      setUnit(editProduct.unit || "pcs");
      setUnitQuantity(editProduct.unitQuantity ); // ✅ default to 1 if missing
      setPreview(editProduct.image || null);
      setImage(null);
    } else {
      setName("");
      setPrice("");
      setUnit("kg");
      setCategory("");
      setStock("");
      setUnitQuantity(""); // ✅ default to 1
      setImage(null);
      setPreview(null);
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("unit", unit);
    formData.append("unitQuantity", unitQuantity); // ✅ added field
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
        <h2 className="text-xl font-bold mb-4">
          {editProduct ? "Edit" : "Add"} Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          {/* Product name */}
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
              <option key={cat} value={cat}>
                {cat}
              </option>
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

          {/* ✅ Stock + Unit + Quantity */}
          <div className="flex flex-col space-y-2">
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
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                {units.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ Unit Quantity (default 1) */}
            <input
              type="number"
              min="1"
              placeholder="Unit Quantity (e.g., 1, 5, 10, 25)"
              value={unitQuantity}
              onChange={(e) => setUnitQuantity(e.target.value)}
              required
              className="border px-3 py-2 rounded"
            />

            {/* Example preview */}
            <p className="text-gray-500 text-sm">
              Unit: {unitQuantity} {unit}
            </p>
          </div>

          {/* Image upload */}
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
