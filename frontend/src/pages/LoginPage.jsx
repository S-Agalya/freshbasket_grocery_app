
// import { loginUser } from "../api/auth";
// import { useNavigate} from "react-router-dom";
// import { useEffect } from "react";
// import AuthForm from "../components/AuthForm";

// const LoginPage = () => {
//   const navigate = useNavigate();

//   // const handleLogin = async (formData) => {
//   //   try {
//   //     const response = await loginUser(formData); // formData = { email, password }
//   //     alert(response.message);
//   //     //localStorage.setItem("username", response.name); // save name
//   //      // Save login info in localStorage so Profile page can read it
//   //     localStorage.setItem("username", response.name);
//   //     localStorage.setItem("email", formData.email);
//   //     localStorage.setItem("password", formData.password);

//   //     navigate("/welcome");
//   //   } catch (err) {
//   //     alert(err.message);
//   //   }
//   // };
// const handleLogin = async (formData) => {
//   try {
//     const response = await loginUser(formData);

//     // Make sure formData has email & password!
//     console.log("Login response:", response);
//     console.log("FormData:", formData);

//     localStorage.setItem("username", response.name || "");
//     localStorage.setItem("email", formData.email || "");
//     localStorage.setItem("password", formData.password || "");
// localStorage.setItem("userId", response.userId); // ✅ This is needed for update later!

//     //navigate("/welcome");
//     useEffect(() => {
//     const username = localStorage.getItem("username");
//     if (username) {
//       navigate("/welcome"); // ✅ redirect if already logged in
//     }
//   }, []);
//     console.log("FormData:", formData);

//   } catch (err) {
//     alert(err.message);
//   }
// };

//   return <AuthForm type="login" onSubmit={handleLogin} />;
// };

// export default LoginPage;


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
