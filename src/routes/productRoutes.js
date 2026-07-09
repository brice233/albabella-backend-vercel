import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, authorize("superadmin", "admin"), createProduct);

router
  .route("/:idOrSlug")
  .get(getProduct)
  .put(protect, authorize("superadmin", "admin"), updateProduct)
  .delete(protect, authorize("superadmin", "admin"), deleteProduct);

export default router;
