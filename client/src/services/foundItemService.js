import api from "../utils/api.js";

export const getRecentFoundItems = async() => {
    const response = await api.get("/found/found-items/recent");
    return response.data;
};

export const createFoundItem = async (data) => {
  const response = await api.post("/found/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
export const getAllApprovedFoundItems = async () => {
    const response = await api.get("/found/all");
    return response.data;
};

export const getMyFoundItems = async () => {
    const response = await api.get("/found/my-items");
    return response.data;
};

export const updateFoundItem = async (id, data) => {
  const response = await api.put(`/found/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteFoundItem = async (id) => {
  const response = await api.delete(`/found/${id}`);
  return response.data;
};
