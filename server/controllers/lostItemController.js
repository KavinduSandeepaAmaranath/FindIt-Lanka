import { createLostItem, getAllLostItems, getLostItemById, getMyLostItems, getSingleLostItem, updateLostItem } from "../services/lostItemService.js";

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

export const getLostItemByIdController = async (req, res) => {
    try {
        const lostItem = await getLostItemById(req.params.id);

        res.status(200).json({
            success: true,
            lostItem,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getSingleLostItemController = async (req, res) => {
    try {
        const lostItem = await getSingleLostItem(
            req.params.id,
            req.user.userId,
        );

        res.status(200).json({
            success: true,
            lostItem,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const update = async (req, res) => {
    try {
        const item = await updateLostItem(
            req.params.id,
            req.user.userId,
            req.body,
        );

        res.status(200).json({
            success: true,
            message: "Item updated successfully",
            item,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};