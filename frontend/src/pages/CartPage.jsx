import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 shadow bg-white">
        <h1 className="text-3xl font-bold text-green-700">Your Cart</h1>
        <button
          onClick={() => navigate("/order")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          Continue Shopping
        </button>
      </header>

      <main className="flex-1 p-4 md:p-8 flex flex-col justify-between">
        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded-xl shadow grid grid-cols-1 md:grid-cols-[1fr_auto_auto] items-center gap-4"
                >
                  {/* LEFT: Image & Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-green-700 font-bold">₹ {item.price}</p>
                    </div>
                  </div>

                  {/* CENTER: Quantity */}
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="min-w-[2rem] text-center font-semibold">
                      {item.qty} {item.unit} {/* ✅ Display unit */}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  {/* RIGHT: Remove */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center">
              <h3 className="text-xl font-bold text-green-700 mb-4">
                Total Amount: ₹ {totalAmount}
              </h3>
              <button
                onClick={() =>
                  navigate("/summary", {
                    state: { items: cartItems, total: totalAmount },
                  })
                }
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-lg transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CartPage;
