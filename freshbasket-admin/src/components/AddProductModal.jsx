


// import { useState, useEffect } from "react";
// import axios from "axios";

// function AddProductModal({ onClose, onProductAdded, editProduct, API_URL }) {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [unitType, setUnitType] = useState("kg");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);

//   // Pre-fill modal if editing
//   useEffect(() => {
//     if (editProduct) {
//       setName(editProduct.name);
//       setPrice(editProduct.price);
//       setUnitType(editProduct.unit_type);
//       setCategory(editProduct.category);
//       setImage(null); // image optional
//     }
//   }, [editProduct]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !price || !unitType || !category) {
//       alert("Please fill all fields");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("unitType", unitType);
//     formData.append("category", category);
//     if (image) formData.append("image", image);

//     try {
//       let res;
//       if (editProduct) {
//         // Update product
//         res = await axios.put(`${API_URL}/api/admin/products/${editProduct.id}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         // Add new product
//         res = await axios.post(`${API_URL}/api/admin/products`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       onProductAdded(res.data);
//       onClose();
//       setName("");
//       setPrice("");
//       setUnitType("kg");
//       setCategory("");
//       setImage(null);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save product");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white rounded p-6 w-96">
//         <h2 className="text-xl font-bold mb-4">
//           {editProduct ? "Update Product" : "Add Product"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           />
//           <input
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           />
//           <select
//             value={unitType}
//             onChange={(e) => setUnitType(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           >
//             <option value="kg">Per kg</option>
//             <option value="piece">Per piece</option>
//             <option value="piece">Per litre</option>
//           </select>
//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full border px-3 py-2 rounded"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               {editProduct ? "Update" : "Add"}
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
  const [price, setPrice] = useState("");
  const [unitType, setUnitType] = useState("kg");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // For showing current/selected image

  // Pre-fill fields if editing
  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setPrice(editProduct.price);
      setUnitType(editProduct.unit_type);
      setCategory(editProduct.category);
      setPreview(editProduct.image ? `${API_URL}/uploads/${editProduct.image}` : null);
      setImage(null); // Only update if user selects a new file
    } else {
      setName("");
      setPrice("");
      setUnitType("kg");
      setCategory("");
      setImage(null);
      setPreview(null);
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !unitType || !category) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("unitType", unitType);
    formData.append("category", category);
    if (image) formData.append("image", image);

    // try {
    //   let res;
    //   if (editProduct) {
    //     // Update product
    //     res = await axios.put(`${API_URL}/api/admin/products/${editProduct.id}`, formData, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     });
    //   } else {
    //     // Add new product
    //     res = await axios.post(`${API_URL}/api/admin/products`, formData, {
    //       headers: { "Content-Type": "multipart/form-data" },
    //     });
    //   }

    //   onProductAdded(res.data);
    //   onClose();
    // } catch (err) {
    //   console.error(err);
    //   alert(editProduct ? "Failed to update product" : "Failed to add product");
    // }

    try {
  let res;
  if (editProduct) {
    // ✅ Update product
    res = await axios.put(
      `${API_URL}/api/admin/products/update/${editProduct.id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  } else {
    // ✅ Add new product
    res = await axios.post(
      `${API_URL}/api/admin/products/add`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  }

  onProductAdded(res.data);
  onClose();
} catch (err) {
  console.error(err);
  alert(editProduct ? "Failed to update product" : "Failed to add product");
}

  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          {editProduct ? "Update Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <select
            value={unitType}
            onChange={(e) => setUnitType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="kg">Per kg</option>
            <option value="piece">Per piece</option>
            <option value="litre">Per litre</option>
          </select>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {preview && (
            <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded mt-2" />
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {editProduct ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
