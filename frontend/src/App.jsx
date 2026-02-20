import {useState , useEffect} from 'react';
import Login from './components/Login'; 
import Dashboard from './components/Dashboard';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-slate-600 p-4 text-white shadow-md flex justify-between">
        <h1 className="font-bold">UniSupporter</h1>
        {isLoggedIn && <button onClick={() => setIsLoggedIn(false)} className="text-sm underline hover:text-red-200">Logout</button>}
      </nav>

      <main className="py-10">
        {/* 2. LOGIC: The Ternary Switch */}
        {isLoggedIn ? (
          <Dashboard /> 
        ) : (
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          
          
        )}
      </main>

    </div>
    
  );
}
export default App;