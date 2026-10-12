import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const parseJwt = (token) => {
  if (!token || typeof token !== "string") return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const ProtectedAdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isSessionValid, setIsSessionValid] = useState(() => {
    const token =
      localStorage.getItem("accessToken") || localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) return false;

    try {
      const user = JSON.parse(userStr);
      if (user.role !== "admin") return false;
    } catch {
      return false;
    }

    const payload = parseJwt(token);
    if (!payload) return false;

    if (payload.exp && payload.exp * 1000 <= Date.now()) {
      return false;
    }

    return true;
  });

  useEffect(() => {
    const clearAuthAndRedirect = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setIsSessionValid(false);
      navigate("/login?expired=true", { replace: true });
    };

    const checkAndHandleExpiry = () => {
      const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (!token || !userStr) {
        clearAuthAndRedirect();
        return;
      }

      const payload = parseJwt(token);
      if (!payload || (payload.exp && payload.exp * 1000 <= Date.now())) {
        clearAuthAndRedirect();
      }
    };

    const token =
      localStorage.getItem("accessToken") || localStorage.getItem("token");
    const payload = parseJwt(token);

    let timer = null;
    if (payload && payload.exp) {
      const remainingMs = payload.exp * 1000 - Date.now();
      if (remainingMs <= 0) {
        clearAuthAndRedirect();
      } else {
        timer = setTimeout(() => {
          clearAuthAndRedirect();
        }, remainingMs);
      }
    }

    window.addEventListener("focus", checkAndHandleExpiry);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("focus", checkAndHandleExpiry);
    };
  }, [navigate]);

  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored && stored !== "undefined") {
      user = JSON.parse(stored);
    }
  } catch {
    user = null;
  }

  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");
  const payload = parseJwt(token);
  const isExpired = payload?.exp ? payload.exp * 1000 <= Date.now() : !token;

  if (!user || !token || isExpired || !isSessionValid) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    return <Navigate to="/login?expired=true" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;