import express from "express";
import { getProductStockStats } from "../controllers/adminStatsController.js";

const router = express.Router();


router.get("/", getProductStockStats);
export default router;
