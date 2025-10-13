

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

        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
>
  <Route
    path="products"
    element={
      <ProtectedRoute>
        <AdminProducts />
      </ProtectedRoute>
    }
  />
</Route>
<Route
    path="manage-orders"
    element={
      <ProtectedRoute>
        <AdminOrderPage />
      </ProtectedRoute>
    }
  />
      </Routes>
    </Router>
  );
}

export default App;

