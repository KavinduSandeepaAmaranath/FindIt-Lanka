import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken") || localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const currentPath = window.location.pathname.toLowerCase();
            const isAuthRoute =
                currentPath === "/login" ||
                currentPath === "/register" ||
                currentPath === "/verify-otp" ||
                currentPath === "/register-otp" ||
                currentPath === "/forgot-password" ||
                currentPath === "/new-password";

            if (!isAuthRoute) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");

                window.location.href = "/login?expired=true";
            }
        }

        return Promise.reject(error);
    }
);

export default api;