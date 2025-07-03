import express from "express";
import { getAllProducts, getProductsByCategory } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/category/:category", getProductsByCategory);

export default router;
