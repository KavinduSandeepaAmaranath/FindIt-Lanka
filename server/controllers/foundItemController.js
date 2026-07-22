import { 
    createFoundItem, 
    deleteFoundItem, 
    getAllFoundItems, 
    getFoundItemById, 
    getMyFoundItems, 
    getSingleFoundItem, 
    markFoundItemAsReturned, 
    updateFoundItem,
    getRecentFoundItems,
} from "../services/foundItemService.js";

export const create = async (req, res) => {
    try {
        const imagePaths = req.files
            ? req.files.map((file) => file.path)
            : [];

        const foundItem = await createFoundItem({
            ...req.body,
            images: imagePaths,
            userId: req.user.userId,
        });

        res.status(201).json({
            message: "Found item created successfully",
            foundItem,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getAllFoundItemsController = async (req, res) => {
    try {
        const foundItems = await getAllFoundItems();

        res.status(200).json({
            success: true,
            count: foundItems.length,
            foundItems,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getMyFoundItemsController = async (req, res) => {
    try {
        const foundItems = await getMyFoundItems(req.user.userId);

        res.status(200).json({
            success: true,
            count: foundItems.length,
            foundItems,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getFoundItemByIdController = async (req, res) => {
    try {
        const foundItem = await getFoundItemById(req.params.id);

        res.status(200).json({
            success: true,
            foundItem,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const getSingleFoundItemController = async (req, res) => {
    try {
        const foundItem = await getSingleFoundItem(
            req.params.id,
            req.user.userId,
        );

        res.status(200).json({
            success: true,
            foundItem,
        });
    } catch (error) {
        res.status(404).json({
            message: error.message,
        });
    }
};

export const update = async (req, res) => {
    try {
        const item = await updateFoundItem(
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

export const remove = async (req, res) => {
    try {
        await deleteFoundItem(
            req.params.id,
            req.user.userId,
        );

        res.status(200).json({
            message: "Found Item deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const markAsReturned = async (req, res) => {
    try {
        const foundItem = await markFoundItemAsReturned(
            req.params.id,
            req.user.userId,
        );

        res.status(200).json({
            success: true,
            message: "Item marked as returned successfully",
            foundItem,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

export const getRecentFoundItemsController = async (req, res) => {
    try {
        const foundItems = await getRecentFoundItems();

        res.status(200).json({
            success: true,
            count: foundItems.length,
            foundItems,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};