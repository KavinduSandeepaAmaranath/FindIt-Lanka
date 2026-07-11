import { Link } from "react-router-dom";
import logo from "../assets/images/Loginlogo.png";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="FindIt Lanka logo"
              className="w-11 h-11 rounded-full object-cover"
            />
            <span className="text-xl font-bold text-slate-900">
              FindIt Lanka
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-sm font-semibold text-slate-800 hover:text-blue-700 transition-colors"
            >
              Home Dashboard
            </Link>
            <Link
              to="/browse"
              className="text-sm font-semibold text-slate-800 hover:text-blue-700 transition-colors"
            >
              Browse Items
            </Link>
            <Link
              to="/about"
              className="text-sm font-semibold text-slate-800 hover:text-blue-700 transition-colors"
            >
              About Us
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-6 py-3 rounded-md text-sm font-semibold text-white bg-sky-400 hover:bg-sky-500 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 rounded-md text-sm font-semibold text-white bg-blue-900 hover:bg-blue-950 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
