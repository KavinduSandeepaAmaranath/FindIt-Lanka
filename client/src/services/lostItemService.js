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
export const getAllApprovedLostItems = async () => {
    const response = await api.get("/lost/all");
    return response.data;
};


export const getMyLostItems = async () => {
  const response = await api.get("/lost/my-items");
  return response.data;
};

export const updateLostItem = async (id, data) => {
  const response = await api.put(`/lost/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteLostItem = async (id) => {
  const response = await api.delete(`/lost/${id}`);
  return response.data;
};
