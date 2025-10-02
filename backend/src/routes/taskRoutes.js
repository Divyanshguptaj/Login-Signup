import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskControllers.js";
import { protect } from "../middlewares/authMiddleware.js";
// import { authorizeRoles } from "../../middlewares/roleMiddleware.js";

const router = express.Router();

// All routes are private
router.use(protect);

// CRUD routes
router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// Optional: admin-only endpoint example
// router.delete("/:id", authorizeRoles("admin"), deleteTask);

export default router;
