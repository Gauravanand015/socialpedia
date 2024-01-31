import multer from "multer";
import express from "express";
import { login, register } from "../controllers/auth.js";
const authRoutes = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage });

authRoutes.post("/register", upload.single("picture"), register);
authRoutes.post("/login", login);

export default authRoutes;
