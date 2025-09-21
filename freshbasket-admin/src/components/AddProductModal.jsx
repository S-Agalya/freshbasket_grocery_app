// // import { useState } from "react";
// // import axios from "axios";

// // function AddProductModal({ onClose, onProductAdded }) {
// //   const [name, setName] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [unitType, setUnitType] = useState("kg");
// //   const [category, setCategory] = useState(""); // new category field
// //   const [image, setImage] = useState(null);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!name || !price || !unitType || !category || !image) {
// //       alert("Please fill all fields");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("name", name);
// //     formData.append("price", price);
// //     formData.append("unitType", unitType);
// //     formData.append("category", category); // include category
// //     formData.append("image", image);

// //     try {
// //       const res = await axios.post("/api/products", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });

// //       onProductAdded(res.data); // pass the new product to parent
// //       onClose(); // close the modal

// //       // reset form
// //       setName("");
// //       setPrice("");
// //       setUnitType("kg");
// //       setCategory("");
// //       setImage(null);
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to add product");
// //     }
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
// //       <div className="bg-white rounded p-6 w-96">
// //         <h2 className="text-xl font-bold mb-4">Add Product</h2>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block mb-1">Product Name</label>
// //             <input
// //               type="text"
// //               value={name}
// //               onChange={(e) => setName(e.target.value)}
// //               className="w-full border px-3 py-2 rounded"
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-1">Category</label>
// //             <input
// //               type="text"
// //               value={category}
// //               onChange={(e) => setCategory(e.target.value)}
// //               placeholder="e.g., Fruits, Vegetables, Grains"
// //               className="w-full border px-3 py-2 rounded"
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-1">Unit Type</label>
// //             <select
// //               value={unitType}
// //               onChange={(e) => setUnitType(e.target.value)}
// //               className="w-full border px-3 py-2 rounded"
// //             >
// //               <option value="kg">Per kg</option>
// //               <option value="piece">Per piece</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label className="block mb-1">
// //               Price ({unitType === "kg" ? "per kg" : "per piece"})
// //             </label>
// //             <input
// //               type="number"
// //               value={price}
// //               onChange={(e) => setPrice(e.target.value)}
// //               className="w-full border px-3 py-2 rounded"
// //             />
// //           </div>

// //           <div>
// //             <label className="block mb-1">Product Image</label>
// //             <input
// //               type="file"
// //               onChange={(e) => setImage(e.target.files[0])}
// //               accept="image/*"
// //             />
// //           </div>

// //           <div className="flex justify-end space-x-2">
// //             <button
// //               type="button"
// //               onClick={onClose}
// //               className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
// //             >
// //               Cancel
// //             </button>
// //             <button
// //               type="submit"
// //               className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
// //             >
// //               Add
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AddProductModal;


// import { useState } from "react";
// import axios from "axios";

// function AddProductModal({ onClose, onProductAdded, backendUrl }) {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [unitType, setUnitType] = useState("kg");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !price || !unitType || !category || !image) {
//       alert("Please fill all fields");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("price", price);
//     formData.append("unitType", unitType);
//     formData.append("category", category);
//     formData.append("image", image);

//     try {
//       const res = await axios.post(`${backendUrl}/api/admin/products`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       onProductAdded(res.data); // update parent
//       onClose();

//       // reset form
//       setName("");
//       setPrice("");
//       setUnitType("kg");
//       setCategory("");
//       setImage(null);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white rounded p-6 w-96">
//         <h2 className="text-xl font-bold mb-4">Add Product</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1">Product Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Category</label>
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               placeholder="e.g., Fruits, Vegetables, Grains"
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Unit Type</label>
//             <select
//               value={unitType}
//               onChange={(e) => setUnitType(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             >
//               <option value="kg">Per kg</option>
//               <option value="piece">Per piece</option>
//             </select>
//           </div>

//           <div>
//             <label className="block mb-1">
//               Price ({unitType === "kg" ? "per kg" : "per piece"})
//             </label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="w-full border px-3 py-2 rounded"
//             />
//           </div>

//           <div>
//             <label className="block mb-1">Product Image</label>
//             <input
//               type="file"
//               onChange={(e) => setImage(e.target.files[0])}
//               accept="image/*"
//             />
//           </div>

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
//               Add
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddProductModal;



import { useState } from "react";
import axios from "axios";

function AddProductModal({ onClose, onProductAdded }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unitType, setUnitType] = useState("kg");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // for preview

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // generate preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !unitType || !category || !image) {
      alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("unitType", unitType);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onProductAdded(res.data); // pass the new product to parent
      onClose(); // close modal

      // reset form
      setName("");
      setPrice("");
      setUnitType("kg");
      setCategory("");
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Fruits, Vegetables, Grains"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Unit Type</label>
            <select
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="kg">Per kg</option>
              <option value="piece">Per piece</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">
              Price ({unitType === "kg" ? "per kg" : "per piece"})
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded border"
              />
            )}
          </div>

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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProductModal;
