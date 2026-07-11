import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import logo from "../assets/images/Loginlogo.png";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="FindIt Lanka logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-lg font-bold text-white">FindIt Lanka</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Connecting people across Sri Lanka with their lost items.
            Together, we build a more caring community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/report-lost" className="hover:text-white transition-colors">Report Lost Item</Link></li>
            <li><Link to="/report-found" className="hover:text-white transition-colors">Report Found Item</Link></li>
            <li><Link to="/browse" className="hover:text-white transition-colors">Browse Items</Link></li>
            <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link to="/safety-tips" className="hover:text-white transition-colors">Safety Tips</Link></li>
            <li><Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <FiPhone className="w-4 h-4 mt-0.5 text-blue-400" />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Phone</p>
                <p>+94 11 123 4567</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="w-4 h-4 mt-0.5 text-blue-400" />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
                <p>support@finditlanka.lk</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <FiMapPin className="w-4 h-4 mt-0.5 text-blue-400" />
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Location</p>
                <p>Colombo, Sri Lanka</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© 2024 FindIt Lanka. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
