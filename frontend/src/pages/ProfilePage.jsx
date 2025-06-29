import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Editable form fields (just local state)
  const [profile, setProfile] = useState({
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    phone: "9876543210",
    address: "123 Main Street, City",
    picture: "",
  });

  // Example hardcoded orders
  const orders = [
    { id: "ORD12345", total: 350 },
    { id: "ORD67890", total: 420 },
  ];

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Your Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full space-y-4">
        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Photo
          </div>
        </div>

        {/* Editable Fields */}
        <div className="space-y-2">
          <label className="block">
            Username:
            <input
              value={profile.username}
              onChange={(e) => handleChange("username", e.target.value)}
              className="border p-2 w-full rounded mt-1"
            />
          </label>
          <label className="block">
            Email:
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border p-2 w-full rounded mt-1"
            />
          </label>
          <label className="block">
            Phone Number:
            <input
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="border p-2 w-full rounded mt-1"
            />
          </label>
          <label className="block">
            Address:
            <input
              value={profile.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="border p-2 w-full rounded mt-1"
            />
          </label>
          <label className="block">
            Password:
            <input
              type="password"
              value={profile.password}
              onChange={(e) => handleChange("password", e.target.value)}
              className="border p-2 w-full rounded mt-1"
            />
          </label>
        </div>

        {/* Orders Section */}
        <div className="mt-6">
          <h3 className="text-xl font-bold text-green-700 mb-2">Your Orders</h3>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders yet.</p>
          ) : (
            <ul className="list-disc list-inside space-y-1">
              {orders.map((order, idx) => (
                <li key={idx}>
                  <strong>Order ID:</strong> {order.id}, <strong>Total:</strong> ₹{order.total}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        onClick={() => navigate("/welcome")}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-lg transition"
      >
        Back to Welcome Page
      </button>
    </div>
  );
};

export default ProfilePage;
