import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Quên mật khẩu
router.post("/forgot-password", forgotPassword);

// Reset mật khẩu
router.post("/reset-password", resetPassword);

export default router;
