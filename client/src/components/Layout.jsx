import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/register-otp";


  return (
    <>
      {!hideNavbar && <Navbar />}

      <main className="min-h-screen">{children}</main>

      <Footer />
    </>
  );
}

export default Layout;