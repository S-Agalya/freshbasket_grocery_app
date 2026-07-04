const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🥬</span>
            <span className="font-extrabold text-white text-xl">FreshBasket</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">Fresh groceries delivered fast to your door. Quality produce, dairy, and household essentials — all in one place.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/welcome" className="hover:text-green-400 transition">Home</a></li>
            <li><a href="/order" className="hover:text-green-400 transition">Shop</a></li>
            <li><a href="/cart" className="hover:text-green-400 transition">Cart</a></li>
            <li><a href="/my-orders" className="hover:text-green-400 transition">My Orders</a></li>
            <li><a href="/profile" className="hover:text-green-400 transition">Profile</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>📍 123, Main Market Road, Your City</li>
            <li>📞 +91 98765 43210</li>
            <li>📧 hello@freshbasket.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} FreshBasket. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
