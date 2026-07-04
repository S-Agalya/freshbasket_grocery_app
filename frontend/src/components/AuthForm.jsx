import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLeaf } from "react-icons/fa";
import { MdEmail, MdLock, MdPerson, MdPhone, MdLocationOn } from "react-icons/md";
//
const AuthForm = ({ type = "login", onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", address: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const isLogin = type === "login";

  const InputField = ({ icon: Icon, name, type: inputType, placeholder, required }) => (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={16} /></span>
      <input
        type={inputType}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex">
      {/* LEFT — Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-800 via-emerald-600 to-green-500 flex-col items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 text-center max-w-md">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-white/20 p-3 rounded-2xl">
              <FaLeaf size={32} className="text-white" />
            </div>
            <span className="text-4xl font-extrabold tracking-tight">FreshBasket</span>
          </div>
          <p className="text-xl font-medium text-green-100 mb-4 leading-relaxed">
            Fresh groceries delivered to your doorstep — fast, easy & affordable.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-10">
            {[["🥦", "Fresh Veggies"], ["🥛", "Dairy"], ["🛒", "Groceries"], ["🍎", "Fruits"], ["🧴", "Care"], ["🍪", "Snacks"]].map(([emoji, label]) => (
              <div key={label} className="bg-white/15 rounded-2xl p-3 text-center">
                <div className="text-2xl mb-1">{emoji}</div>
                <div className="text-xs text-green-100 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <FaLeaf className="text-green-600" size={24} />
            <span className="text-2xl font-extrabold text-green-700">FreshBasket</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-1">
            {isLogin ? "Welcome back! 👋" : "Create account"}
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            {isLogin ? "Sign in to continue shopping" : "Join FreshBasket and start ordering fresh"}
          </p>

          <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-4">
            {!isLogin && <InputField icon={MdPerson} name="name" type="text" placeholder="Full name" required />}
            <InputField icon={MdEmail} name="email" type="email" placeholder="Email address" required />

            {/* Password with toggle */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><MdLock size={16} /></span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent focus:bg-white transition"
              />
              <button type="button" onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
              </button>
            </div>

            {!isLogin && (
              <>
                <InputField icon={MdPhone} name="phone" type="tel" placeholder="Phone number" />
                <InputField icon={MdLocationOn} name="address" type="text" placeholder="Delivery address" />
              </>
            )}

            <button type="submit"
              className="w-full py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white rounded-xl font-semibold text-sm tracking-wide transition shadow-sm shadow-green-200 mt-2">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link to={isLogin ? "/register" : "/login"} className="text-green-600 font-semibold hover:underline">
              {isLogin ? "Register" : "Sign in"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

