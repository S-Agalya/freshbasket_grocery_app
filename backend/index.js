import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { register, login } from "./controllers/authController.js";
import authRoutes from "./routes/authRoutes.js"; // ✅


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/register",register)
app.use("/api/login",login)
app.get("/", (req, res) => {
  res.send("FreshBasket backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
