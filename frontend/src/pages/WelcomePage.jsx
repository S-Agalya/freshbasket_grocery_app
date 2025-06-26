import { useEffect, useState } from "react";

const WelcomePage = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("username");
    if (savedName) {
      setUsername(savedName);
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <div className="bg-white shadow-lg p-10 rounded-xl text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Welcome 🎉</h1>
        <p className="text-xl text-gray-700">
          Hello, <strong>{username}</strong>! You have successfully logged in.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
