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