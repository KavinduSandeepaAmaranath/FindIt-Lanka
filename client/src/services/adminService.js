import api from "../utils/api.js";

/* Dashboard */
export const getDashboardStatistics = async () => {
    const response = await api.get("/admin/dashboard");
    return response.data;
};

export const getTopLocations = async () => {
    const response = await api.get(
        "/admin/statistics/top-locations"
    );
    return response.data;
};

export const getRecentActivities = async () => {
    const response = await api.get(
        "/admin/statistics/recent-activities"
    );

    return response.data;
};

export const getReportsByCategory = async () => {
    const response = await api.get(
        "/admin/statistics/reports-by-category"
    );

    return response.data;
};

export const getReportOverview = async () => {
    const response = await api.get(
        "/admin/statistics/report-overview"
    );

    return response.data;
};

/* Lost Item */
export const getPendingLostItems = async () => {
    const response = await api.get("/admin/lost-items/pending");
    return response.data;
};

export const approveLostItem = async  (itemId) => {
    const response = await api.patch(
        `/admin/lost-items/${itemId}/approve`
    );
    return response.data;
};

export const rejectLostItem = async (itemId) => {
    const response = await api.patch(
        `/admin/lost-items/${itemId}/reject`
    );

    return response.data;
};

export const getAllLostItems = async () => {
    const response = await api.get("/admin/lost-items");
    return response.data;
};

export const getLostItemDetails = async (itemId) => {
    const response = await api.get(
        `/admin/lost-items/${itemId}`
    );

    return response.data;
};

export const deleteLostItem = async (itemId) => {
    const response = await api.delete(
        `/admin/lost-items/${itemId}`
    );

    return response.data;
};

/* Found Item */
export const getPendingFoundItems = async () => {
    const response = await api.get("/admin/found-items/pending");
    return response.data;
};

export const approveFoundItem = async (itemId) => {
    const response = await api.patch(
        `/admin/found-items/${itemId}/approve`
    );

    return response.data;
};

export const rejectFoundItem = async (itemId) => {
    const response = await api.patch(
        `/admin/found-items/${itemId}/reject`
    );

    return response.data;
};

export const getAllFoundItems = async () => {
    const response = await api.get("/admin/found-items");
    return response.data;
};

export const getFoundItemDetails = async (itemId) => {
    const response = await api.get(
        `/admin/found-items/${itemId}`
    );

    return response.data;
};

export const deleteFoundItem = async (itemId) => {
    const response = await api.delete(
        `/admin/found-items/${itemId}`
    );

    return response.data;
};

/* Users */
export const getAllUsers = async () => {
    const response = await api.get("/admin/users");
    return response.data;
};

export const getUserById = async (userId) => {
    const response = await api.get(
        `/admin/users/${userId}`
    );

    return response.data;
};

export const suspendUser = async (userId) => {
    const response = await api.patch(
        `/admin/users/${userId}/suspend`
    );

    return response.data;
};

export const activateUser = async (userId) => {
    const response = await api.patch(
        `/admin/users/${userId}/activate`
    );

    return response.data;
};

export const updateUserRole = async (userId, role) => {
    const response = await api.patch(
        `/admin/users/${userId}/role`,
        {
            role,
        }
    );

    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await api.delete(
        `/admin/users/${userId}`
    );

    return response.data;
};