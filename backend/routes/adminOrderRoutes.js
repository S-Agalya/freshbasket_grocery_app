import express from "express";
import { getAllOrders, updateOrderStatus ,getOrderStats} from "../controllers/adminOrderController.js";


const router = express.Router();

router.get("/",  getAllOrders);
router.put("/:orderId/status",  updateOrderStatus);
router.get("/orders/stats", getOrderStats);

export default router;
