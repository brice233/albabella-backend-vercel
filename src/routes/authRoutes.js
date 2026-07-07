import express from "express";
import { login, registerAdmin, getMe, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register-admin", registerAdmin);
router.get("/me", protect, getMe);
router.get("/logout", logout);

export default router;
