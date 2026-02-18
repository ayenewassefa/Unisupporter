import Login from './components/Login';

function App() {
   const isAgentLoggedIn = false;

   return (
     <div>
        { isAgentLoggedIn ? <h1>Welcome Home</h1> : <Login /> }
     </div>
   );
}
export default App;