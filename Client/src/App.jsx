import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <Navbar />
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
