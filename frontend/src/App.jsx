import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WelcomePage from './pages/WelcomePage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ProtectedRoute from './components/ProtectedRoute';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import OrderSummaryPage from './pages/OrderSummaryPage';
import ProfilePage from './pages/ProfilePage';
import ProductDetailPage from './pages/ProductDetailPage';
import MyOrdersPage from './pages/MyOrdersPage';
import WishlistPage from './pages/WishlistPage';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import './App.css';

// Hide footer on browse/auth pages where a fixed sidebar exists or there's no need
function ConditionalFooter() {
  const { pathname } = useLocation();
  const noFooter = ["/login", "/register", "/order"];
  if (noFooter.some(p => pathname === p || pathname.startsWith("/order"))) return null;
  return <Footer />;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/welcome" element={ <ProtectedRoute><WelcomePage /></ProtectedRoute>} />
              <Route path="/product/:id" element={<ProtectedRoute><ProductDetailPage /></ProtectedRoute>} />
              <Route path="/my-orders" element={<ProtectedRoute><MyOrdersPage /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/order" element={<ProtectedRoute><PlaceOrderPage /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
              <Route path="/summary" element={<ProtectedRoute><OrderSummaryPage /></ProtectedRoute>} />
              <Route
  
/>
              <Route path="*" element={<LoginPage />} />
            </Routes>
          </div>
           <AIFloatingButton />
          <ConditionalFooter />
          <BottomNav />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;