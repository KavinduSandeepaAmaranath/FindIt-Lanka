import LostItem from "../models/LostItem.js";

export const createLostItem = async ({
    title,
    category,
    description,
    district,
    location,
    lostDate,
    images,
    userId,
}) => {
    return await LostItem.create({
        title,
        category,
        description,
        district,
        location,
        lostDate,
        images,
        userId,
    });
};