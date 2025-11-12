import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { validateTask } from "../middleware/validator.js";

const router = express.Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", validateTask, createTask);
router.put("/:id", validateTask, updateTask);
router.delete("/:id", deleteTask);

export default router;
