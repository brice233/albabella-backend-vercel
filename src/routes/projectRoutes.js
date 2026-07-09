import express from "express";
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProjects)
  .post(protect, authorize("superadmin", "admin"), createProject);

router
  .route("/:idOrSlug")
  .get(getProject)
  .put(protect, authorize("superadmin", "admin"), updateProject)
  .delete(protect, authorize("superadmin", "admin"), deleteProject);

export default router;
