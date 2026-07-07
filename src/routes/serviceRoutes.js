import express from "express";
import {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getServices)
  .post(protect, authorize("superadmin", "admin", "editor"), createService);

router
  .route("/:idOrSlug")
  .get(getService);

router
  .route("/:id")
  .put(protect, authorize("superadmin", "admin", "editor"), updateService)
  .delete(protect, authorize("superadmin", "admin"), deleteService);

export default router;
