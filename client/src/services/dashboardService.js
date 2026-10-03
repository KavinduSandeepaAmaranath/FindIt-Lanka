import api from "../utils/api.js";


export const getDashboardProfile = async () => {
    const response = await api.get("/dashboard/profile");
    return response.data;
};


export const getDashboardStatistics = async () => {
    const response = await api.get("/dashboard/statistics");
    return response.data;
};


export const getMyLostItems = async () => {
    const response = await api.get("/dashboard/lost-items");
    return response.data;
};

export const getMyFoundItems = async () => {
    const response = await api.get("/dashboard/found-items");
    return response.data;
};

export const getRecentActivities = async () => {
    const response = await api.get("/dashboard/recent-activities");
    return response.data;
};