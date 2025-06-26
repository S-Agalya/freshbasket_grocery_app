// import AuthForm from "../components/AuthForm";
// import { loginUser } from "../api/auth";
// const LoginPage = () => {
//   const handleLogin = async (formData) => {
//   try {
//     const response = await loginUser(formData);
//     alert(response.message);
//     localStorage.setItem("username", response.name); // ✅ store name (not email)
//     navigate("/welcome");
//   } catch (err) {
//     alert(err.message);
//   }
// };


//   return <AuthForm type="login" onSubmit={handleLogin} />;
// };

// export default LoginPage;


import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const response = await loginUser(formData); // formData = { email, password }
      alert(response.message);
      localStorage.setItem("username", response.name); // save name
      navigate("/welcome");
    } catch (err) {
      alert(err.message);
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default LoginPage;
