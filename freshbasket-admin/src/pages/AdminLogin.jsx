import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaLock } from "react-icons/fa";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    navigate("/dashboard");
  }
}, [navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 via-emerald-600 to-green-800">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        {/* Logo / Title */}
        <div className="flex flex-col items-center mb-6">
          <FaUserShield className="text-green-600 text-5xl mb-2" />
          <h2 className="text-3xl font-extrabold text-green-700">
            Admin Portal
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to manage FreshBasket
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaUserShield className="text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-2 py-2 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 focus-within:ring-2 focus-within:ring-green-500">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-2 py-2 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 hover:shadow-lg transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-sm text-gray-600 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-700 font-semibold cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
