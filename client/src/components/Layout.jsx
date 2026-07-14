import { useLocation , Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AUTH_ROUTES = ["/login", "/register", "/register-otp", "/forgot-password"];

function Layout() {
  const location = useLocation();

  const hideNavbarAndFooter = AUTH_ROUTES.includes(location.pathname);

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}

      <main className="min-h-screen">
        <Outlet />
        </main>

      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

export default Layout;