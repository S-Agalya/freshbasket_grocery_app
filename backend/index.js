import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { registerCustomer, login } from "./controllers/authController.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import path from "path";
import adminProductRoutes from "./routes/adminProductRoutes.js";
import { fileURLToPath } from "url";
import adminOrderRoutes from "./routes/adminOrderRoutes.js"
import statsRoutes from "./routes/statsRoutes.js"

import aiRoutes from "./routes/aiRoutes.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://freshbasket-grocery-app-admin.onrender.com",
    "http://localhost:5173",
    "https://greencartfrontend-grocery-app-2.onrender.com" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ your routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/admin/products", adminProductRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

app.use("/api/admin/stats", statsRoutes);
app.use("/api/admin/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("FreshBasket backend is running 🚀");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/ai", aiRoutes);
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));