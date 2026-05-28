import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".zip" && ext !== ".pdf") {
      return cb(new Error("Only ZIP or PDF files are allowed"));
    }
    cb(null, true);
  },
});
