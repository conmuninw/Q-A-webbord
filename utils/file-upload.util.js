import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "img_upload");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null,uniqueSuffix + file.originalname);
    }
});
const upload = multer({ storage: storage }).single("image_file");
export { upload };
