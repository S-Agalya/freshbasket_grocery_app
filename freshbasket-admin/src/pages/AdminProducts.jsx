



// import { useState, useEffect } from "react";
// import axios from "axios";
// import AddProductModal from "../components/AddProductModal";

// function AdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const API_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/admin/products`);
//         setProducts(res.data);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch products");
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleAddProduct = () => setShowModal(true);

//   const handleProductAdded = (newProduct) => {
//     setProducts((prev) => [newProduct, ...prev]);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold text-green-700 mb-6">Products</h1>

//       <button
//         onClick={handleAddProduct}
//         className="mb-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//       >
//         + Add Product
//       </button>

//       {products.length === 0 ? (
//         <div className="bg-white p-6 rounded shadow text-center">
//           <p className="text-lg text-gray-600 mb-4">
//             Your products are empty. Add products to display.
//           </p>
//         </div>
//       ) : (
//         <ul className="space-y-3">
//           {products.map((p, index) => (
//             <li
//               key={index}
//               className="bg-white p-4 rounded shadow flex justify-between items-center"
//             >
//               <div className="flex items-center space-x-4">
//                 {p.image && (
//                   <img
//                     src={`${API_URL}/uploads/${p.image}`}
//                     alt={p.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 )}
//                 <div>
//                   <span className="font-semibold">{p.name}</span>
//                   <p className="text-gray-500">{p.category}</p>
//                 </div>
//               </div>
//               <span className="text-gray-600">
//                 {p.price} ₹ / {p.unit_type}
//               </span>
//             </li>
//           ))}
//         </ul>
//       )}

//       {showModal && (
//         <AddProductModal
//           onClose={() => setShowModal(false)}
//           onProductAdded={handleProductAdded}
//         />
//       )}
//     </div>
//   );
// }

// export default AdminProducts;



import { useState, useEffect } from "react";
import axios from "axios";
import AddProductModal from "../components/AddProductModal";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/products`);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  // Delete product
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_URL}/api/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  // Open modal to edit
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  // Handle after adding/updating product
  const handleProductAdded = (newProduct) => {
    setProducts((prev) => {
      // If editing, replace existing
      const index = prev.findIndex((p) => p.id === newProduct.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = newProduct;
        return updated;
      }
      return [newProduct, ...prev]; // new product
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Products</h1>
      <button
        onClick={() => { setShowModal(true); setEditProduct(null); }}
        className="mb-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add Product
      </button>

      {products.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-lg text-gray-600 mb-4">
            Your products are empty. Add products to display.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {products.map((p) => (
            <li
              key={p.id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                {p.image && (
                  <img
                    src={`${API_URL}/uploads/${p.image}`}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
                <div>
                  <span className="font-semibold">{p.name}</span>
                  <p className="text-gray-500">{p.category}</p>
                </div>
              </div>
              <span className="text-gray-600">{p.price} ₹ / {p.unit_type}</span>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  onClick={() => handleEditProduct(p)}
                >
                  Update
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDeleteProduct(p.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onProductAdded={handleProductAdded}
          editProduct={editProduct}
          API_URL={API_URL}
        />
      )}
    </div>
  );
}

export default AdminProducts;
