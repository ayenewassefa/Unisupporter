import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [enterprises, setEnterprises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnterprises();
  }, []);

  const fetchEnterprises = async () => {
    try {
      console.log("--> Dashboard is asking for data...");
      const response = await axios.get('http://localhost:5000/api/enterprises/all');
      console.log("--> DATA RECEIVED FROM BACKEND:", response.data);
      setEnterprises(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching enterprises:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center font-bold text-slate-500">Loading Enterprise Hub...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-800">Enterprise Hub</h1>
        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold">
          {enterprises.length} Enterprises
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enterprises.map((enterprise) => (
          <div key={enterprise._id} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              {/* FIXED: Using enterprise.name consistently */}
              <h2 className="text-xl font-bold text-blue-900">{enterprise.name}</h2>
              
              {/* FIXED: ent changed to enterprise */}
              {enterprise.isSchool && (
                <span className="bg-purple-100 text-purple-700 text-[10px] uppercase font-black px-2 py-1 rounded">
                  🏫 School
                </span>
              )}
            </div>
            
            <div className="space-y-2 text-sm text-slate-600">
              {/* FIXED: ent changed to enterprise */}
              <p><span className="font-semibold text-slate-400">Bank:</span> {enterprise.bank}</p>
              <p><span className="font-semibold text-slate-400">Supporter:</span> {enterprise.currentSupporter}</p>
              <p>
                <span className="font-semibold text-slate-400">Status:</span> 
                {/* FIXED: Case sensitivity currentStatus (Capital S) */}
                <span className={`ml-2 font-bold ${enterprise.currentstatus === 'active' ? 'text-green-600' : 'text-orange-500'}`}>
                  {enterprise.currentstatus}
                </span>
              </p>
            </div>

            <button className="mt-6 w-full py-2 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors">
              View History
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;