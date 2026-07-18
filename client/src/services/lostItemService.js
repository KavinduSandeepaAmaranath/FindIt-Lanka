import api from "../utils/api.js";

export const getRecentLostItems = async() => {
    const response = await api.get("/lost/lost-items/recent");
    return response.data;
};
