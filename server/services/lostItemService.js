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

export const getAllLostItems = async () => {
    return await LostItem.find();
};

export const getMyLostItems = async (userId) => {
    return await LostItem.find({ userId });
};

export const getLostItemById = async (itemId) => {
    const lostItem = await LostItem.findById(itemId);

    if (!lostItem) {
        throw new Error("Lost item not found");
    }

    return lostItem;
};

export const getSingleLostItem = async (itemId, userId) => {
    const lostItem = await LostItem.findOne({
        _id: itemId,
        userId,
    });

    if (!lostItem) {
        throw new Error("Lost item not found");
    };

    return lostItem;
};

export const updateLostItem = async (itemId, userId, updateData) => {
    const lostItem = await LostItem.findOneAndUpdate({
        _id: itemId,
        userId,            
    },
    updateData,
    {
        new: true,
        runValidators: true,
    });

    if (!lostItem) {
        throw new Error("Item not found");
    }

    return lostItem;
};