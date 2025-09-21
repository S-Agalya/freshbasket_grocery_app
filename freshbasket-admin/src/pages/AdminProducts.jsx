import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // initially empty

  const handleAddProduct = () => {
    // navigate to add product page (you can create it later)
    navigate("/admin/add-product");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Products</h1>

      {products.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center">
          <p className="text-lg text-gray-600 mb-4">
            Your products are empty.
          </p>
          <button
            onClick={handleAddProduct}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add Product
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleAddProduct}
            className="mb-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            + Add Product
          </button>
          <ul className="space-y-3">
            {products.map((p, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <span className="font-semibold">{p.name}</span>
                <span className="text-gray-600">{p.price} ₹</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;
