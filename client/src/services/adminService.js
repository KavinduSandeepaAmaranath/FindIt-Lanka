import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.token) {
        config.headers.Authorization = "Bearer " + user.token;
      }
    } catch (e) {
      console.error("Error parsing user token:", e);
    }
  }
  return config;
});

/* Dashboard Stats */
export const getAdminDashboardStats = async () => {
  const response = await api.get("/admin/dashboard/stats");
  return response.data;
};

/* Lost Items */
export const getPendingLostItems = async () => {
  const response = await api.get("/admin/lost-items/pending");
  return response.data;
};

export const getAllLostItems = async () => {
  const response = await api.get("/admin/lost-items");
  return response.data;
};

export const approveLostItem = async (itemId) => {
  const response = await api.patch("/admin/lost-items/" + itemId + "/approve");
  return response.data;
};

export const rejectLostItem = async (itemId) => {
  const response = await api.patch("/admin/lost-items/" + itemId + "/reject");
  return response.data;
};

export const getLostItemDetails = async (itemId) => {
  const response = await api.get("/admin/lost-items/" + itemId);
  return response.data;
};

export const deleteLostItem = async (itemId) => {
  const response = await api.delete("/admin/lost-items/" + itemId);
  return response.data;
};

/* Found Items */
export const getPendingFoundItems = async () => {
  const response = await api.get("/admin/found-items/pending");
  return response.data;
};

export const getAllFoundItems = async () => {
  const response = await api.get("/admin/found-items");
  return response.data;
};

export const approveFoundItem = async (itemId) => {
  const response = await api.patch("/admin/found-items/" + itemId + "/approve");
  return response.data;
};

export const rejectFoundItem = async (itemId) => {
  const response = await api.patch("/admin/found-items/" + itemId + "/reject");
  return response.data;
};

export const getFoundItemDetails = async (itemId) => {
  const response = await api.get("/admin/found-items/" + itemId);
  return response.data;
};

export const deleteFoundItem = async (itemId) => {
  const response = await api.delete("/admin/found-items/" + itemId);
  return response.data;
};

/* Users */
export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get("/admin/users/" + userId);
  return response.data;
};

export const suspendUser = async (userId) => {
  const response = await api.patch("/admin/users/" + userId + "/suspend");
  return response.data;
};

export const activateUser = async (userId) => {
  const response = await api.patch("/admin/users/" + userId + "/activate");
  return response.data;
};

export const updateUserRole = async (userId, role) => {
  const response = await api.patch("/admin/users/" + userId + "/role", { role });
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete("/admin/users/" + userId);
  return response.data;
};

export default api;
