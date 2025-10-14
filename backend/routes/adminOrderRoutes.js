import express from "express";
import { getAllOrders, updateOrderStatus } from "../controllers/adminOrders.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyAdmin, getAllOrders);
router.put("/:orderId/status", verifyAdmin, updateOrderStatus);
export default router;
