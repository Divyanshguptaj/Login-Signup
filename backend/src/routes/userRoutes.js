import express from "express";
import {
  getAllUsers,
  getUserById,
  updateUserProfile,
  deleteUser,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin-only routes
router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

// Self & admin accessible
router.get("/:id", protect, getUserById);
router.put("/profile", protect, updateUserProfile);

export default router;
