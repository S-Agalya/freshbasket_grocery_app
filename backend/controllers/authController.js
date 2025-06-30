import db from "../config/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists with this email
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Account not registered" });
    }

    const user = result.rows[0];

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Create a JWT token
    const token = jwt.sign({ userId: user.id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 4. Send success response
    res.json({
      message: "Login successful",
      token,
      name: user.name, // 🟢 send name to frontend
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};