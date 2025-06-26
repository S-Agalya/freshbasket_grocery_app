import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import WelcomePage from './pages/WelcomePage';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
 return(
  //  <div className="min-h-screen flex items-center justify-center bg-gray-100">
  //     <h1 className="text-4xl font-bold text-blue-600">Tailwind is working ✅</h1>
  //   </div>
   <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         <Route path="/welcome" element={<WelcomePage />} />

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>

 )
}

export default App
