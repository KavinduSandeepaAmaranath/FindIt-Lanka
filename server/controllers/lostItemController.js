import { createLostItem } from "../services/lostItemService.js";

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