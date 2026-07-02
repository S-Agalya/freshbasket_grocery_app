import express from "express";
import { placeOrder, getOrderById, getOrdersByPhone} from "../controllers/orderController.js";


const router = express.Router();

router.post("/", placeOrder);
router.get("/:id", getOrderById);
router.get("/by-phone/:phone", getOrdersByPhone);
export default router;
