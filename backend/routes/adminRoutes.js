import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { getAdminStats } from "../controllers/adminStatsController.js";
const router = express.Router();

// Register new admin
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);
router.get("/stats", getAdminStats);
export default router;
