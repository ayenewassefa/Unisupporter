import { useState } from 'react';
import axios from 'axios';

function Login() {
  // 1. STATE: Memory for what the agent types
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // 2. LOGIC: What happens when they click the button
  const handleLogin = async (e) => {
    e.preventDefault(); // Stop the page from refreshing (Standard SE practice)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      setMessage("Login Successful! Token saved.");
      console.log("Token:", response.data.token);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-2xl rounded-2xl border border-slate-100 max-w-sm mx-auto mt-20">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Support Agent Login</h2>
      
      <form onSubmit={handleLogin} className="w-full space-y-4">
        {/* Username Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Username</label>
          <input 
            type="text" 
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)} // Logic: Update memory
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)} // Logic: Update memory
          />
        </div>

        {/* Login Button - Dynamic Color Logic */}
        <button 
          disabled={username === "" || password === ""}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
            (username === "" || password === "") ? "bg-slate-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          Login to UniSupporter
        </button>
      </form>

      {/* Message Area */}
      {message && <p className="mt-4 text-sm font-medium text-red-500">{message}</p>}
    </div>
  );
}

export default Login;