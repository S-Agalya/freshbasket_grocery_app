import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

export default function Navbar({ onToggleSidebar }) {
  return (
    <header className="w-full flex items-center justify-between py-4 px-6 bg-primary-900 text-white shadow-premium">
      <div className="flex items-center gap-5">
        <button className="md:hidden text-accent" onClick={onToggleSidebar} aria-label="Toggle sidebar">☰</button>
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-md bg-primary-700 flex items-center justify-center text-white font-extrabold">FB</div>
          <div>
            <div className="text-lg font-semibold">FreshBasket Admin</div>
            <div className="text-xs text-muted">Manage products, orders and reports</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white/80 hover:text-white" aria-label="Notifications"><FaBell /></button>
        <button className="flex items-center gap-2 text-white/80 hover:text-white">
          <FaUserCircle /> <span className="hidden sm:inline">Admin</span>
        </button>
      </div>
    </header>
  );
}
