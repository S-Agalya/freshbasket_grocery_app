// import { useState } from "react";
// import AddProductModal from "../components/AddProductModal"; // import the modal

// function AdminProducts() {
//   const [products, setProducts] = useState([]); // initially empty
//   const [showModal, setShowModal] = useState(false);

//   const handleAddProduct = () => {
//     setShowModal(true); // open modal instead of navigating
//   };

//   const handleProductAdded = (newProduct) => {
//     // update products list when a new product is added
//     setProducts((prev) => [...prev, newProduct]);
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold text-green-700 mb-6">Products</h1>

//       {products.length === 0 ? (
//         <div className="bg-white p-6 rounded shadow text-center">
//           <p className="text-lg text-gray-600 mb-4">
//             Your products are empty.
//           </p>
//           <button
//             onClick={handleAddProduct}
//             className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             + Add Product
//           </button>
//         </div>
//       ) : (
//         <div>
//           <button
//             onClick={handleAddProduct}
//             className="mb-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//           >
//             + Add Product
//           </button>
//           <ul className="space-y-3">
//             {products.map((p, index) => (
//               <li
//                 key={index}
//                 className="bg-white p-4 rounded shadow flex justify-between items-center"
//               >
//                 <div>
//                   <span className="font-semibold">{p.name}</span>
//                   <span className="ml-2 text-gray-500">{p.category}</span>
//                 </div>
//                 <span className="text-gray-600">
//                   {p.price} ₹ / {p.unitType}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Add Product Modal */}
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

  // Fetch products from backend when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/admin/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = () => setShowModal(true);

  // Update products after adding a new one
  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Products</h1>

      <button
        onClick={handleAddProduct}
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
          {products.map((p, index) => (
            <li
              key={index}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <span className="font-semibold">{p.name}</span>
              <span className="text-gray-600">
                {p.price} ₹ / {p.unit_type}
              </span>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onProductAdded={handleProductAdded}
        />
      )}
    </div>
  );
}

export default AdminProducts;
