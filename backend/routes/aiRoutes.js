import express from "express";
import { chatWithAI } from "../controllers/aiController.js";
import { scanShoppingList } from "../controllers/aiAssistantController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/chat", chatWithAI);
router.post("/assistant/image", upload.single("image"), scanShoppingList);

export default router;