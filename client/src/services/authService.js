import api from "../utils/api.js";

export const startRegistration = async (userData) => {
    const response = await api.post("/auth/startRegistration", userData);
    return response.data;
};

export const verifyRegistrationOTP = async (email, otp) => {
    const response = await api.post("/auth/verifyRegistrationOTP", {
        email,
        otp,
    });
    return response.data;
};

export const resendRegistrationOTP = async (email) => {
    const response = await api.post("/auth/resendRegistrationOTP", {
        email,
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post("/auth/login",{
        email,
        password,
    });
    const { 
        accessToken, 
        refreshToken, 
        user,
     } = response.data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );

    return {
        accessToken,
        refreshToken,
        user,
    };
};

export const logout = async () => {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    } catch (error) {
        console.warn("Logout API call failed or already invalidated:", error?.message);
        return { success: true };
    } finally {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    }
};

export const sendResetOTP = async (email) => {
    const response = await api.post("/auth/sendResetOTP", {
        email,
    });
    return response.data;
};

export const verifyResetOTP = async (email, otp) => {
    const response = await api.post("/auth/verifyResetOTP", {
        email,
        otp,
    });
    return response.data;
};

export const resendResetOTP = async (email) => {
    const response = await api.post("/auth/resendResetOTP", {
        email,
    });
    return response.data;
};

export const resetPassword = async (
    email,
    password,
    confirmPassword,
) => {
    const response = await api.post("/auth/resetPassword", {
        email,
        password,
        confirmPassword,
    });
    return response.data;
};