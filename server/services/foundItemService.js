import FoundItem from "../models/FoundItem.js";

export const createFoundItem = async ({
    title,
    category,
    description,
    district,
    location,
    foundDate,
    images,
    userId,
}) => {
    return await FoundItem.create({
        title,
        category,
        description,
        district,
        location,
        foundDate,
        images,
        userId,
    });
};

export const getAllFoundItems = async () => {
    return await FoundItem.find();
};

export const getMyFoundItems = async (userId) => {
    return await FoundItem.find({ userId });
};

export const getFoundItemById = async (itemId) => {
    const foundItem = await FoundItem.findById(itemId);

    if (!foundItem) {
        throw new Error("Found item not found");
    }

    return foundItem;
};

export const getSingleFoundItem = async (itemId, userId) => {
    const foundItem = await FoundItem.findOne({
        _id: itemId,
        userId,
    });

    if (!foundItem) {
        throw new Error("Found item not found");
    }

    return foundItem;
};

export const updateFoundItem = async (itemId, userId, updateData) => {
    const foundItem = await FoundItem.findOneAndUpdate({
        _id: itemId,
        userId,            
    },
    updateData,
    {
        new: true,
        runValidators: true,
    });

    if (!foundItem) {
        throw new Error("Found item not found");
    }

    return foundItem;
};

export const deleteFoundItem = async (itemId, userId) => {
    const foundItem = await FoundItem.findOneAndDelete({
        _id: itemId,
        userId,
    });

    if (!foundItem) {
        throw new Error("Found item not found");
    }

    return foundItem;
};

export const markFoundItemAsReturned = async (itemId, userId) => {
    const foundItem = await FoundItem.findOne({
        _id: itemId,
        userId,
    });

    if (!foundItem) {
        throw new Error("Found item not found or unauthorized");
    }

    if (foundItem.status !== "found") {
        throw new Error("Only found items can be marked as returned");
    }

    foundItem.status = "returned";

    await foundItem.save();

    return foundItem;
};