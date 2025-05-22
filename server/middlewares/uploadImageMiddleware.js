import multer from "multer";
import ApiError from "../utils/apiError.js";
import sharp from "sharp";

export const uploadSingleImage = (fieldName) => {
    const storage = multer.memoryStorage();

    const multerFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb(new ApiError("Not an image! Please upload only images.", 400), false);
        }
    };
    
    const upload = multer({ storage: storage, fileFilter: multerFilter });
    return upload.single(fieldName);
}

