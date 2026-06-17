import { createLostItem, getAllLostItems, getMyLostItems } from "../services/lostItemService.js";

export const create = async (req, res) => {
    try {
        const lostItem = await createLostItem({
            ...req.body,
            userId: req.user.userId,
        });

        res.status(201).json({
            message: "Lost item created successfully",
            lostItem,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getAllLostItemsController = async (req, res) => {
    try {
        const lostItems = await getAllLostItems();

        res.status(200).json({
            success: true,
            count: lostItems.length,
            lostItems,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getMyLostItemsController = async (req, res) => {
    try {
        const lostItems = await getMyLostItems(req.user.userId);

        res.status(200).json({
            success: true,
            count: lostItems.length,
            lostItems,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};