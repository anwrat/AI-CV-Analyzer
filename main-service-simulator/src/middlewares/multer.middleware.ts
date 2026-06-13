import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "..", "..", "uploads");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const storage = multer.memoryStorage();

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== ".zip" && ext !== ".pdf") {
      return cb(new Error("Only ZIP or PDF files are allowed"));
    }
    cb(null, true);
  },
});
