import express from "express";
import { getProductStockStats } from "../controllers/adminStatsController.js";

import { getProductStockStats,
    getLowStockProducts,
    getSalesReport } from "../controllers/adminStatsController.js";

    import {verifyToken, adminOnly} from "../middleware/roleMiddleware.js";
const router = express.Router();


router.get("/", getProductStockStats);
router.get("/low-stock", verifyToken, adminOnly, getLowStockProducts);
router.get("/sales", verifyToken, adminOnly, getSalesReport);
export default router;
