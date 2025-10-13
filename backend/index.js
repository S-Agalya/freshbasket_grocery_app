// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { register, login } from "./controllers/authController.js";
// import authRoutes from "./routes/authRoutes.js"; // ✅
// import productRoutes from "./routes/productRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import profileRoutes from "./routes/profileRoutes.js";
// import path from "path";
// import adminProductRoutes from "./routes/adminProductRoutes.js";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/products", productRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/orders", orderRoutes);

// app.get("/", (req, res) => {
//   res.send("FreshBasket backend is running 🚀");
// });
// app.use("/api/profile", profileRoutes);



// app.use("/api/admin/products", adminProductRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// //app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// const PORT = process.env.PORT ;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
