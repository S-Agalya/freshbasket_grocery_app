import express from "express";
import { updateProfile,getProfile } from "../controllers/profileController.js";

const router = express.Router();

router.put("/:userId", updateProfile);
router.get("/:userId", getProfile);
export default router;
