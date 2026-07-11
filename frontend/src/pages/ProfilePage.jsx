import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSignOutAlt, FaEdit,
         FaShoppingBag, FaHeart, FaHeadset, FaInfoCircle, FaChevronRight, FaShieldAlt } from "react-icons/fa";
import { MdCheck, MdClose } from "react-icons/md";
import { getWishlist } from "../utils/wishlist";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userId  = localStorage.getItem("userId");
  const API_URL = import.meta.env.VITE_API_URL;

  const [profile, setProfile] = useState({ username:"", email:"", phone:"", address:"", avatar: null });
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setAvatarError(false); }, [profile.email]);

  useEffect(() => {
    if (!userId) return;
    const load = async () => {
      try {
        const res  = await fetch(`${API_URL}/api/profile/${userId}`);
        const data = await res.json();
        const p = { username: data.username||"", email: data.email||"", phone: data.phone||"", address: data.address||"", avatar: data.avatar||null };
        setProfile(p); setEditData(p);
        if (data.phone) localStorage.setItem("phone", data.phone);
        if (data.phone) {
          const oRes = await fetch(`${API_URL}/api/orders/by-phone/${encodeURIComponent(data.phone)}`);
          if (oRes.ok) setOrders(await oRes.json());
        }
      } catch (err) { console.error("Profile load error:", err); }
      finally { setLoading(false); }
    };
    load();
  }, [userId, API_URL]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/api/profile/${userId}`, {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editData, password: localStorage.getItem("password") || "" }),
      });
      if (!res.ok) throw new Error();
      setProfile(prev => ({ ...prev, ...editData }));
      localStorage.setItem("username", editData.username);
      localStorage.setItem("phone", editData.phone);
      localStorage.setItem("address", editData.address);
      setIsEditing(false);
    } catch { alert("Failed to update profile"); }
  };

  const handleLogout = () => { localStorage.clear(); navigate("/login"); };

  const avatarSrc = !avatarError
    ? (profile.avatar || (profile.email
        ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(profile.email)}&backgroundColor=b6e3f4,ffd5dc,c0aede,d1d4f9`
        : null))
    : null;

  const totalSpent    = orders.reduce((s, o) => s + parseFloat(o.total_amount || 0), 0);
  const wishlistCount = getWishlist().length;

  const QUICK_LINKS = [
    { icon: FaShoppingBag,  label: "My Orders",       sub: `${orders.length} order${orders.length !== 1 ? "s" : ""}`,         path: "/my-orders", color: "#16a34a", bg: "#f0fdf4" },
    { icon: FaHeart,        label: "My Wishlist",      sub: `${wishlistCount} saved item${wishlistCount !== 1 ? "s" : ""}`,    path: "/wishlist",  color: "#e11d48", bg: "#fff1f2" },
    { icon: FaMapMarkerAlt, label: "Delivery Address", sub: profile.address ? profile.address.slice(0,28)+"�" : "Tap to set", path: null, onClick: () => { setIsEditing(true); setEditData({...profile}); }, color: "#2563eb", bg: "#eff6ff" },
    { icon: FaHeadset,      label: "Help & Support",   sub: "Chat, call or email us",  path: null, onClick: () => alert("Support: hello@freshbasket.in\nPhone: +91 98765 43210"), color: "#7c3aed", bg: "#f5f3ff" },
    { icon: FaShieldAlt,    label: "Privacy Policy",   sub: "How we handle your data", path: null, onClick: () => {}, color: "#0891b2", bg: "#ecfeff" },
    { icon: FaInfoCircle,   label: "About FreshBasket",sub: "Version 1.0.0",           path: null, onClick: () => alert("FreshBasket v1.0.0\nFresh groceries, delivered fast."), color: "#b45309", bg: "#fefce8" },
  ];

  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: "#f5f7f5" }}>
      {/* Top bar */}
      <div className="bg-white sticky top-0 z-30" style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06),0 4px 12px rgba(0,0,0,0.04)" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between px-4 py-3.5">
          <button onClick={() => navigate("/welcome")} className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition">←</button>
          <span className="font-bold text-gray-800 text-sm">My Profile</span>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-700 px-2 py-1.5 rounded-xl hover:bg-red-50 transition">
            <FaSignOutAlt size={11} /> Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-20 h-20 rounded-full bg-white animate-pulse" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }} />
          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-3 w-48 bg-gray-100 rounded animate-pulse" />
        </div>
      ) : (
        <div className="max-w-3xl mx-auto px-4 py-5 space-y-4">

          {/* Avatar Hero Card */}
          <div className="bg-white rounded-3xl overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
            <div className="h-24 relative" style={{ background: "linear-gradient(135deg,#0c2e18 0%,#16a34a 60%,#059669 100%)" }}>
              <div className="absolute top-[-20px] right-[-20px] w-32 h-32 rounded-full opacity-10 bg-white" />
              <div className="absolute bottom-[-16px] left-[30%] w-20 h-20 rounded-full opacity-10 bg-white" />
              {!isEditing && (
                <button onClick={() => { setIsEditing(true); setEditData({...profile}); }}
                  className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-xl transition">
                  <FaEdit size={10} /> Edit Profile
                </button>
              )}
            </div>
            <div className="px-5 pb-5 relative">
              <div className="absolute -top-10 left-5 w-20 h-20 rounded-full bg-white p-[3px]" style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
                {avatarSrc ? (
                  <img
                    key={avatarSrc}
                    src={avatarSrc}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                    style={{ background: "#e0f2fe" }}
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="w-full h-full rounded-full flex items-center justify-center text-xl font-extrabold text-white"
                    style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
                    {profile.username ? profile.username.slice(0,2).toUpperCase() : "FB"}
                  </div>
                )}
              </div>
              <div className="pt-12">
                <h2 className="text-lg font-extrabold text-gray-900 leading-tight">{profile.username || "User"}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{profile.email}</p>
                <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#f0fdf4", color: "#15803d" }}>
                  ✓ FreshBasket Member
                </span>
                {isEditing && (
                  <div className="mt-4 space-y-3 pt-4" style={{ borderTop: "1px solid #f1f5f1" }}>
                    <EditField icon={FaUser}         label="Full Name"  value={editData.username} onChange={v => setEditData(d => ({...d, username:v}))} />
                    <EditField icon={FaEnvelope}     label="Email"      value={editData.email}    onChange={v => setEditData(d => ({...d, email:v}))} />
                    <EditField icon={FaPhone}        label="Phone"      value={editData.phone}    onChange={v => setEditData(d => ({...d, phone:v}))} />
                    <EditField icon={FaMapMarkerAlt} label="Address"    value={editData.address}  onChange={v => setEditData(d => ({...d, address:v}))} textarea />
                    <div className="flex gap-3 pt-1">
                      <button onClick={handleSave} className="flex-1 text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-1.5 transition" style={{ background: "linear-gradient(135deg,#16a34a,#059669)" }}>
                        <MdCheck size={16} /> Save
                      </button>
                      <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition">
                        <MdClose size={16} /> Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: orders.length,                             label: "Orders",   color: "#16a34a" },
              { value: `₹${totalSpent.toLocaleString("en-IN")}`, label: "Spent",    color: "#b45309" },
              { value: wishlistCount,                             label: "Wishlist", color: "#e11d48" },
            ].map(({ value, label, color }) => (
              <div key={label} className="bg-white rounded-2xl p-3 text-center" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <p className="text-lg font-extrabold leading-none" style={{ color }}>{value}</p>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">{label}</p>
              </div>
            ))}
          </div>

          {/* Personal Info (view mode) */}
          {!isEditing && (
            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid #f3f4f6" }}>
                <span className="text-sm font-bold text-gray-800">Personal Information</span>
                <button onClick={() => { setIsEditing(true); setEditData({...profile}); }} className="text-xs font-semibold text-green-700 flex items-center gap-1 hover:underline">
                  <FaEdit size={10} /> Edit
                </button>
              </div>
              <div className="divide-y divide-gray-50">
                <InfoRow icon={FaUser}         label="Full Name" value={profile.username || "—"} />
                <InfoRow icon={FaEnvelope}     label="Email"     value={profile.email    || "—"} />
                <InfoRow icon={FaPhone}        label="Phone"     value={profile.phone    || "Not set"} />
                <InfoRow icon={FaMapMarkerAlt} label="Address"   value={profile.address  || "Not set"} />
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div className="px-4 py-3.5" style={{ borderBottom: "1px solid #f3f4f6" }}>
              <span className="text-sm font-bold text-gray-800">My Account</span>
            </div>
            {QUICK_LINKS.map(({ icon: Icon, label, sub, path, onClick, color, bg }, i) => (
              <button key={label} onClick={() => path ? navigate(path) : onClick?.()}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition text-left"
                style={i < QUICK_LINKS.length - 1 ? { borderBottom: "1px solid #f9fafb" } : {}}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                  <Icon size={15} style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{label}</p>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">{sub}</p>
                </div>
                <FaChevronRight size={11} className="text-gray-300 flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* Recent Orders */}
          {orders.length > 0 && (
            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: "1px solid #f3f4f6" }}>
                <span className="text-sm font-bold text-gray-800">Recent Orders</span>
                <button onClick={() => navigate("/my-orders")} className="text-xs font-semibold text-green-700 hover:underline">View all →</button>
              </div>
              <div className="divide-y divide-gray-50">
                {orders.slice(0, 3).map(o => (
                  <div key={o.id} className="flex justify-between items-center px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-base" style={{ background: "#f0fdf4" }}>📦</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Order #{o.id}</p>
                        <p className="text-[11px] text-gray-400">{new Date(o.created_at).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold" style={{ color: "#0f3d22" }}>₹{o.total_amount}</p>
                      <span className={`text-[10px] font-semibold ${o.status==="Delivered"?"text-green-500":o.status==="Cancelled"?"text-red-500":"text-amber-500"}`}>{o.status}</span>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-xl">🥬</span>
              <span className="font-extrabold text-gray-700 text-sm">FreshBasket</span>
            </div>
            <p className="text-xs text-gray-400">Version 1.0.0 · Made with ❤️ in India</p>
          </div>
        </div>
      )}
    </div>
  );
};

// -- helpers ----------------------------------------------
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <div className="w-7 h-7 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={12} className="text-emerald-600" />
      </div>
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-wide">{label}</p>
        <p className="text-sm font-medium text-gray-800 mt-0.5">{value}</p>
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
