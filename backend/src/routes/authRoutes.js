import express from "express";
import {
  signup,
  login,
  getProfile,
} from "../controllers/authControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Private route
router.get("/profile", protect, getProfile);

export default router;
