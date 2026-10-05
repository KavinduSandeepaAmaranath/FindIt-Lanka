import api from "../utils/api.js";

export const fetchNotifications = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

export const markNotificationAsReadApi = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};

export const markAllNotificationsAsReadApi = async () => {
  const response = await api.patch("/notifications/read-all");
  return response.data;
};

export const deleteNotificationApi = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};

export const deleteAllNotificationsApi = async () => {
  const response = await api.delete("/notifications/delete-all");
  return response.data;
};
