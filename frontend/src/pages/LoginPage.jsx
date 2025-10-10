
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const navigate = useNavigate();

  // ✅ Top-level effect to redirect if already logged in
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      navigate("/welcome");
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    try {
      const response = await loginUser(formData);

      console.log("Login response:", response);
      console.log("FormData:", formData);

      // Save login info in localStorage
      localStorage.setItem("username", response.name || "");
      localStorage.setItem("email", formData.email || "");
      localStorage.setItem("password", formData.password || "");
      localStorage.setItem("userId", response.userId || "");

      // ✅ Navigate to welcome page after login
      navigate("/welcome");
    } catch (err) {
      alert(err.message);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default LoginPage;
