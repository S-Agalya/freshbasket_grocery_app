import express from "express";

import { registerCustomer, registerAdmin, login } from "../controllers/authController.js";

const router = express.Router();

// Customer registration - Auto role = 'customer'
router.post("/register-customer", registerCustomer);

// Admin registration - Auto role = 'admin'
router.post("/register-admin", registerAdmin);

// Login for both customer and admin
router.post("/login", login);

export default router;
