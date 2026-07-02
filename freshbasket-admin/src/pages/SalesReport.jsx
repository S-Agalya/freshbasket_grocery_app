import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const PIE_COLORS = ["#16a34a", "#2563eb", "#d97706", "#dc2626", "#7c3aed", "#0891b2", "#be185d", "#65a30d"];

export default function SalesReport() {
  const [daily, setDaily] = useState([]);
  const [byCategory, setByCategory] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get(`${API_URL}/api/admin/stats/sales`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDaily(
          res.data.daily.map((d) => ({
            date: new Date(d.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
            revenue: parseFloat(d.revenue),
            orders: parseInt(d.orders),
          }))
        );
        setByCategory(
          res.data.byCategory.map((c) => ({
            name: c.category,
            value: parseFloat(c.revenue),
          }))
        );
        setTotalOrders(res.data.totalOrders);
        setTotalRevenue(res.data.totalRevenue);
      } catch (err) {
        console.error("Failed to load sales report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading report...</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Sales Report</h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600 mt-1">₹{totalRevenue.toLocaleString("en-IN")}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-3xl font-bold text-blue-600 mt-1">{totalOrders}</p>
        </div>
      </div>

      {/* Daily Revenue Bar Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Daily Revenue (Last 30 Days)</h3>
        {daily.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No order data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={daily} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${v}`} />
              <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Revenue by Category Pie Chart */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Revenue by Category</h3>
        {byCategory.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No category data yet.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={byCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {byCategory.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip formatter={(value) => `₹${parseFloat(value).toLocaleString("en-IN")}`} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
