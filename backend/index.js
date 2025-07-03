import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register, login } from "./controllers/authController.js";
import authRoutes from "./routes/authRoutes.js"; // ✅
import productRoutes from "./routes/productRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/register",register)
app.use("/api/login",login)
app.get("/", (req, res) => {
  res.send("FreshBasket backend is running 🚀");
});
app.use("/api/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
