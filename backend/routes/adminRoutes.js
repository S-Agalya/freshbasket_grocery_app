import express from "express";
import { getAdminStats } from "../controllers/adminStatsController.js";
const router = express.Router();

// ✅ Use /api/auth/register-admin and /api/auth/login instead
// Admin authentication routes are now in authRoutes.js

export default router;
