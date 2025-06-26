import AuthForm from "../components/AuthForm";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    console.log("Registration Submitted", formData); // This will later send to backend
    try {
    const response = await registerUser(formData);
    alert(response.message); // Success
    navigate("/login");
  } catch (err) {
    alert(err.message); // Error
  }

  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
};

export default RegisterPage;
