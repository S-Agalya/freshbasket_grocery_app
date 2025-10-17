import express from "express";
import {
  addAdminProduct,
  updateAdminProduct,
  getAdminProducts,
  deleteAdminProduct
} from "../controllers/adminProductController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Add product (with image)
router.post("/add", upload.single("image"), addAdminProduct);

// Update product (image optional)
router.put("/:id", upload.single("image"), updateAdminProduct);


// Get all products
router.get("/", getAdminProducts);

// Delete product
router.delete("/:id", deleteAdminProduct);

export default router;
