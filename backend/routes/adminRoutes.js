import express from "express";
import { registerAdmin, loginAdmin,getAdminStats } from "../controllers/adminController.js";

const router = express.Router();

// Register new admin
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);
router.get("/stats", getAdminStats);
export default router;
