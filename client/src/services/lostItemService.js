import api from "../utils/api.js";

export const getRecentLostItems = async() => {
    const response = await api.get("/lost/lost-items/recent");
    return response.data;
};

export const createLostItem = async (data) => {
  const response = await api.post("/lost/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};