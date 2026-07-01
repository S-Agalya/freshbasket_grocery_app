import express from "express";
import {
  addAdminProduct,
  updateAdminProduct,
  getAdminProducts,
  deleteAdminProduct
} from "../controllers/adminProductController.js";
import { upload } from "../middleware/upload.js";
import { verifyToken, adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Add product (with image) - Admin only
router.post("/add", verifyToken, adminOnly, upload.single("image"), addAdminProduct);

// Update product (image optional) - Admin only
router.put("/:id", verifyToken, adminOnly, upload.single("image"), updateAdminProduct);

// Get all products - Admin only
router.get("/", verifyToken, adminOnly, getAdminProducts);

// Delete product - Admin only
router.delete("/:id", verifyToken, adminOnly, deleteAdminProduct);

export default router;
