import { useState } from 'react';
import axios from 'axios';

// 1. We must pass { onLoginSuccess } here so the function can use it
function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });

      // Flow: If successful, trigger the parent switch
      onLoginSuccess(); 
      console.log("Token:", response.data.token);

    } catch (error) {
      console.error("Full error:", error);
      // Optional chaining (?.) must not have a space
      const serverMessage = error.response?.data?.message || "Server unreachable";
      setMessage(serverMessage);
    }
  }; // <--- THIS BRACE was missing or in the wrong place!

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-xl rounded-2xl border border-slate-100 max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Support Agent Login</h2>
      
      <form onSubmit={handleLogin} className="w-full space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Username</label>
          <input 
            type="text" 
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="•••••••"
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button 
          disabled={username === "" || password === ""}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
            (username === "" || password === "") ? "bg-slate-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          Login to UniSupporter
        </button>
      </form>

      {message && <p className="mt-4 text-sm font-medium text-red-500 text-center">{message}</p>}
    </div>
  );
}

export default Login;