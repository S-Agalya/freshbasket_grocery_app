import express from "express";
import { placeOrder, getOrderById} from "../controllers/orderController.js";


const router = express.Router();

router.post("/", placeOrder);
router.get("/:id", getOrderById);
export default router;
