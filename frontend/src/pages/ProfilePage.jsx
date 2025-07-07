// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const ProfilePage = () => {
//   const navigate = useNavigate();

//   const initialProfile = {
//     username: localStorage.getItem("username") || "",
//     email: localStorage.getItem("email") || "",
//     password: localStorage.getItem("password") || "",
//     phone: localStorage.getItem("phone") || "",
//     address: localStorage.getItem("address") || "",
//   };

//   const [profile, setProfile] = useState(initialProfile);
//   const [isEditing, setIsEditing] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showOrders, setShowOrders] = useState(false);

//   // Sample orders (replace with fetch later)
//   const [orders] = useState([
//     { id: "ORD12345", total: 350 },
//     { id: "ORD67890", total: 420 },
//   ]);

//   useEffect(() => {
//     // Log what you actually have in localStorage
//     console.log("Loaded email from storage:", localStorage.getItem("email"));
//   }, []);

//   const handleChange = (field, value) => {
//     setProfile((prev) => ({ ...prev, [field]: value }));
//   };

//   // const handleSave = () => {
//     // localStorage.setItem("username", profile.username);
//     // localStorage.setItem("email", profile.email);
//     // localStorage.setItem("password", profile.password);
//     // localStorage.setItem("phone", profile.phone);
//     // localStorage.setItem("address", profile.address);
//   //   setIsEditing(false);
//   //   alert("Profile updated!");
//   // };
//   const handleSave = async () => {
//   try {
//     // Assuming you stored userId in localStorage or context
//     const userId = localStorage.getItem("userId");

//     await fetch(`http://localhost:5000/api/profile/${userId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(profile)
//     });

//     alert("Profile updated successfully!");
//     setIsEditing(false);

//   } catch (err) {
//     console.error(err);
//     alert("Failed to update profile");
//   }
// };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 p-6 flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-green-700 mb-6">Your Profile</h1>

//       <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full space-y-4">
//         {/* Username */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Username</label>
//           <input
//             type="text"
//             value={profile.username}
//             disabled={!isEditing}
//             onChange={(e) => handleChange("username", e.target.value)}
//             className={`border p-2 w-full rounded ${!isEditing ? "bg-gray-100" : ""}`}
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             value={profile.email}
//             disabled={!isEditing}
//             onChange={(e) => handleChange("email", e.target.value)}
//             className={`border p-2 w-full rounded ${!isEditing ? "bg-gray-100" : ""}`}
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Password</label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               value={profile.password}
//               disabled={!isEditing}
//               onChange={(e) => handleChange("password", e.target.value)}
//               className={`border p-2 w-full rounded pr-10 ${!isEditing ? "bg-gray-100" : ""}`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Phone Number</label>
//           <input
//             type="text"
//             value={profile.phone}
//             disabled={!isEditing}
//             onChange={(e) => handleChange("phone", e.target.value)}
//             className={`border p-2 w-full rounded ${!isEditing ? "bg-gray-100" : ""}`}
//           />
//         </div>

//         {/* Address */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Address</label>
//           <textarea
//             value={profile.address}
//             disabled={!isEditing}
//             onChange={(e) => handleChange("address", e.target.value)}
//             className={`border p-2 w-full rounded ${!isEditing ? "bg-gray-100" : ""}`}
//           />
//         </div>

//         {/* Edit Buttons */}
//         <div className="flex gap-4 mt-4">
//           {isEditing ? (
//             <>
//               <button
//                 onClick={handleSave}
//                 className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
//               >
//                 Save
//               </button>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded shadow"
//               >
//                 Cancel
//               </button>
//             </>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow w-full"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>

//         {/* View Orders Button */}
//         <div className="mt-4">
//           <button
//             onClick={() => setShowOrders((prev) => !prev)}
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
//           >
//             {showOrders ? "Hide My Orders" : "View My Orders"}
//           </button>
//         </div>

//         {/* Orders Display */}
//         {showOrders && (
//           <div className="bg-gray-100 p-4 mt-2 rounded">
//             {orders.length === 0 ? (
//               <p>No orders found.</p>
//             ) : (
//               <ul className="list-disc list-inside space-y-1">
//                 {orders.map((order, idx) => (
//                   <li key={idx}>
//                     <strong>Order ID:</strong> {order.id} — ₹{order.total}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//       </div>

//       <button
//         onClick={() => navigate("/welcome")}
//         className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded shadow-lg transition"
//       >
//         Back to Welcome Page
//       </button>
//     </div>
//   );
// };

// export default ProfilePage;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const [orders] = useState([
    { id: "ORD12345", total: 350 },
    { id: "ORD67890", total: 420 },
  ]);

  // ✅ Load from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`)
                     //await fetch(`http://localhost:5000/api/profile/${userId}`)
console.log("hsdbhj")

        const data = await res.json();

        // setProfile({
        //   username: data.username || "",
        //   email: data.email || "",
        //   password: "",
        //   phone: data.phone || "",
        //   address: data.address || "",
        // });

        setProfile({
  username: data.username || "",
  email: data.email || "",
  password: localStorage.getItem("password") || "",
  phone: data.phone || "",
  address: data.address || "",
});

      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      // await fetch(`http://localhost:5000/api/profile/${userId}`, {
await fetch(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`, {

        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      localStorage.setItem("username", profile.username);
      localStorage.setItem("email", profile.email);
      localStorage.setItem("password", profile.password);
      localStorage.setItem("phone", profile.phone);
      localStorage.setItem("address", profile.address);

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Your Profile</h1>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={profile.username}
            disabled={!isEditing}
            onChange={(e) => handleChange("username", e.target.value)}
            className={`border p-2 w-full rounded ${!isEditing ? "bg-gray-100" : ""}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={profile.email}
            disabled={!isEditing}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`border p-2 w-full rounded ${!isEditing ? "bg-gray-100" : ""}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={profile.password}
              disabled={!isEditing}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`border p-2 w-full rounded pr-10 ${!isEditing ? "bg-gray-100" : ""}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value={profile.phone}
            disabled={!isEditing}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`border p-2 w-full rounded ${!isEditing ? "bg-gray-100" : ""}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            value={profile.address}
            disabled={!isEditing}
            onChange={(e) => handleChange("address", e.target.value)}
            className={`border p-2 w-full rounded ${!isEditing ? "bg-gray-100" : ""}`}
          />
        </div>

        <div className="flex gap-4 mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded shadow"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow w-full"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowOrders((prev) => !prev)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            {showOrders ? "Hide My Orders" : "View My Orders"}
          </button>
        </div>

        {showOrders && (
          <div className="bg-gray-100 p-4 mt-2 rounded">
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {orders.map((order, idx) => (
                  <li key={idx}>
                    <strong>Order ID:</strong> {order.id} — ₹{order.total}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
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
