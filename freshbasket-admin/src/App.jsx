import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Dashboard from "./pages/Dashboard";
import AdminProducts from "./pages/AdminProducts";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/admin/products" element={<AdminProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
