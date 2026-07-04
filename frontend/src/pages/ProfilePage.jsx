import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSignOutAlt, FaEdit } from "react-icons/fa";
import { MdCheck, MdClose } from "react-icons/md";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userId  = localStorage.getItem("userId");
  const API_URL = import.meta.env.VITE_API_URL;

  const [profile,    setProfile]    = useState({ username:"", email:"", phone:"", address:"" });
  const [editData,   setEditData]   = useState({});
  const [isEditing,  setIsEditing]  = useState(false);
  const [orders,     setOrders]     = useState([]);
  const [loading,    setLoading]    = useState(true);

  // ── Auto-fetch profile + orders ──────────────────────
  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      try {
        const res  = await fetch(`${API_URL}/api/profile/${userId}`);
        const data = await res.json();
        const p = {
          username: data.username || "",
          email:    data.email    || "",
          phone:    data.phone    || "",
          address:  data.address  || "",
        };
        setProfile(p);
        setEditData(p);
        // Save phone so notifications / buy-again work
        if (data.phone) localStorage.setItem("phone", data.phone);

        // Load real orders by phone
        if (data.phone) {
          const oRes = await fetch(`${API_URL}/api/orders/by-phone/${encodeURIComponent(data.phone)}`);
          if (oRes.ok) setOrders(await oRes.json());
        }
      } catch (err) {
        console.error("Profile load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId, API_URL]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/api/profile/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editData, password: localStorage.getItem("password") || "" }),
      });
      if (!res.ok) throw new Error();
      setProfile(editData);
      localStorage.setItem("username", editData.username);
      localStorage.setItem("phone",    editData.phone);
      localStorage.setItem("address",  editData.address);
      setIsEditing(false);
    } catch {
      alert("Failed to update profile");
    }
  };

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  const initials   = profile.username ? profile.username.slice(0, 2).toUpperCase() : "FB";
  const totalSpent = orders.reduce((s, o) => s + parseFloat(o.total_amount || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/welcome")}
          className="text-gray-500 hover:text-emerald-600 text-sm font-medium flex items-center gap-1 transition">
          ← Back
        </button>
        <span className="font-bold text-gray-800 text-sm">My Profile</span>
        <button onClick={handleLogout}
          className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition">
          <FaSignOutAlt size={12} /> Logout
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-gray-400">Loading profile…</div>
      ) : (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">

          {/* Avatar banner */}
          <div className="bg-gradient-to-br from-emerald-600 to-green-500 rounded-2xl p-6 text-white flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-extrabold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold truncate">{profile.username || "User"}</h2>
              <p className="text-emerald-100 text-sm truncate">{profile.email}</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => { setIsEditing(true); setEditData({ ...profile }); }}
                className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl text-sm font-medium flex items-center gap-1 transition shrink-0">
                <FaEdit size={11} /> Edit
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <p className="text-2xl font-extrabold text-emerald-600">{orders.length}</p>
              <p className="text-xs text-gray-500 mt-0.5">Total Orders</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 text-center">
              <p className="text-2xl font-extrabold text-amber-500">₹{totalSpent.toLocaleString("en-IN")}</p>
              <p className="text-xs text-gray-500 mt-0.5">Total Spent</p>
            </div>
          </div>

          {/* Profile details / edit form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-4">Personal Information</h3>

            {isEditing ? (
              <div className="space-y-4">
                <EditField icon={FaUser}          label="Full Name"  value={editData.username} onChange={v => setEditData(d => ({ ...d, username: v }))} />
                <EditField icon={FaEnvelope}      label="Email"      value={editData.email}    onChange={v => setEditData(d => ({ ...d, email: v }))} />
                <EditField icon={FaPhone}         label="Phone"      value={editData.phone}    onChange={v => setEditData(d => ({ ...d, phone: v }))} />
                <EditField icon={FaMapMarkerAlt}  label="Address"    value={editData.address}  onChange={v => setEditData(d => ({ ...d, address: v }))} textarea />
                <div className="flex gap-3 pt-1">
                  <button onClick={handleSave}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1 transition shadow-sm">
                    <MdCheck size={16} /> Save Changes
                  </button>
                  <button onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1 transition">
                    <MdClose size={16} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                <InfoRow icon={FaUser}         label="Full Name" value={profile.username || "—"} />
                <InfoRow icon={FaEnvelope}     label="Email"     value={profile.email    || "—"} />
                <InfoRow icon={FaPhone}        label="Phone"     value={profile.phone    || "Not set"} />
                <InfoRow icon={FaMapMarkerAlt} label="Address"   value={profile.address  || "Not set"} />
              </div>
            )}
          </div>

          {/* Recent Orders */}
          {orders.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">Recent Orders</h3>
                <button onClick={() => navigate("/my-orders")}
                  className="text-xs text-emerald-600 font-medium hover:underline">
                  View all →
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                {orders.slice(0, 3).map(o => (
                  <div key={o.id} className="flex justify-between items-center py-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Order #{o.id}</p>
                      <p className="text-xs text-gray-400">{new Date(o.created_at).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-600">₹{o.total_amount}</p>
                      <span className={`text-xs font-semibold ${
                        o.status === "Delivered" ? "text-green-500"
                        : o.status === "Cancelled" ? "text-red-500"
                        : "text-amber-500"}`}>
                        {o.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ── helpers ──────────────────────────────────────────────
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
        <Icon size={13} className="text-emerald-600" />
      </div>
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function EditField({ icon: Icon, label, value, onChange, textarea }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1.5 flex items-center gap-1">
        <Icon size={11} className="text-emerald-500" /> {label}
      </label>
      {textarea ? (
        <textarea rows={2} value={value} onChange={e => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none" />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
      )}
    </div>
  );
}

export default ProfilePage;

