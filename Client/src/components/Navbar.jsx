import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";

/**
 * Navbar Component — Cream & Purple Theme
 */
const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-40 bg-[rgba(254,249,231,0.8)] backdrop-blur-md border-b border-[#6C63FF]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#6C63FF] rounded-lg flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <span className="text-xl font-bold text-[#4A4A4A] group-hover:text-[#6C63FF] transition-colors duration-200">
              TaskNest
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-[#9B9B9B] text-sm hidden sm:block">
                  Welcome, <span className="font-semibold text-[#6C63FF]">{user?.name || user?.username}</span>
                </span>
                <Button onClick={handleLogout} variant="secondary" className="text-sm py-1.5 border-gray-200 hover:border-[#6C63FF]/30">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="secondary" className="text-sm py-1.5">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" className="text-sm py-1.5 shadow-sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
