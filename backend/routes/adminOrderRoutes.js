import express from "express";
import { getAllOrders, updateOrderStatus } from "../controllers/adminOrderController.js";


const router = express.Router();

router.get("/",  getAllOrders);
router.put("/:orderId/status",  updateOrderStatus);
export default router;
