import api from "../utils/api.js";

export const getRecentFoundItems = async() => {
    const response = await api.get("/found/found-items/recent");
    return response.data;
};