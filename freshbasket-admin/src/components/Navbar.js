import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="w-full flex items-center justify-between py-3 px-4 bg-navy-900 text-sand shadow-premium">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gold-600" onClick={onToggleSidebar}>☰</button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-navy-700 flex items-center justify-center text-gold font-bold">FB</div>
          <div>
            <div className="text-white font-semibold">FreshBasket Admin</div>
            <div className="text-xs text-sand">Welcome back, Admin</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-sand hover:text-white"><FaBell /></button>
        <button className="flex items-center gap-2 text-sand hover:text-white">
          <FaUserCircle /> <span className="hidden sm:inline">Admin</span>
        </button>
      </div>
    </header>
  );
}
