

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import Dashboard from "./pages/Dashboard";
import AdminProducts from "./pages/AdminProducts";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/register" element={<AdminRegister />} />

        {/* Dashboard layout with nested routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
          <Route path="/dashboard/products" element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
          {/* You can add more nested pages here, like orders, settings, etc. */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

