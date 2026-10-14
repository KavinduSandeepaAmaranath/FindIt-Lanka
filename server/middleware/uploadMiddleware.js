import multer from "multer";
import path from "path";
import { IMAGE_STORAGE_DIR } from "../utils/fileStorage.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, IMAGE_STORAGE_DIR);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
});

export default upload;