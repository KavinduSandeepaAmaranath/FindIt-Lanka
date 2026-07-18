import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AUTH_ROUTES = ["/login", "/register", "/register-otp", "/forgot-password", "/verify-otp", "/new-password"];

function Layout({ children }) {
  const location = useLocation();

  const isAuthRoute = AUTH_ROUTES.includes(location.pathname);
  const isDashboardRoute = location.pathname.startsWith("/dashboard");

  const hideNavbar = isAuthRoute || isDashboardRoute;
  const hideFooter = isAuthRoute;

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main className="min-h-screen">{children}</main>

      {!hideFooter && <Footer />}
    </>
  );
}

export default Layout;
