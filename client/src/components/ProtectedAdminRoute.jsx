import { Navigate } from "react-router-dom";


const ProtectedAdminRoute = ({ children }) => {
    let user = null;
    try {
        const stored = localStorage.getItem("user");
        if (stored && stored !== "undefined") {
            user = JSON.parse(stored);
        }
    } catch (err) {
        user = null;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user && user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;