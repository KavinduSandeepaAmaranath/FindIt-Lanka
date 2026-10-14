import fs from "fs";
import path from "path";

export const IMAGE_STORAGE_DIR = process.env.IMAGE_STORAGE_DIR || "D:/FindItLankaImages";

// Ensure storage directory exists
try {
    if (!fs.existsSync(IMAGE_STORAGE_DIR)) {
        fs.mkdirSync(IMAGE_STORAGE_DIR, { recursive: true });
    }
} catch (err) {
    console.error(`[Storage] Could not create storage directory ${IMAGE_STORAGE_DIR}:`, err.message);
}

/**
 * Safely deletes an array of image files from the storage directory.
 * @param {string[]} imagePaths - Array of image paths/filenames stored in database
 */
export const deleteImageFiles = async (imagePaths) => {
    if (!imagePaths || !Array.isArray(imagePaths) || imagePaths.length === 0) {
        return;
    }

    for (const imgPath of imagePaths) {
        if (!imgPath || typeof imgPath !== "string") continue;
        try {
            // Strip any query params if present and get the basename
            const cleanPath = imgPath.split("?")[0].replace(/\\/g, "/");
            const filename = path.basename(cleanPath);
            if (!filename) continue;

            const absolutePath = path.join(IMAGE_STORAGE_DIR, filename);

            if (fs.existsSync(absolutePath)) {
                await fs.promises.unlink(absolutePath);
                console.log(`[Storage] Deleted image file: ${absolutePath}`);
            }
        } catch (err) {
            console.error(`[Storage] Error deleting image file (${imgPath}):`, err.message);
        }
    }
};
