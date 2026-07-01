import db from "../config/db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ Register as Customer
export const registerCustomer = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;

    const result = await db.query(
      "INSERT INTO users (name, avatar, email, password, phone, address, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, avatar, email, phone, address, role",
      [name, avatar, email, hashedPassword, phone || null, address || null, 'customer']
    );

    res.status(201).json({
      message: "Customer registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
};

// ✅ Register as Admin
export const registerAdmin = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const avatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;

    const result = await db.query(
      "INSERT INTO users (name, avatar, email, password, phone, address, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, avatar, email, phone, address, role",
      [name, avatar, email, hashedPassword, phone || null, address || null, 'admin']
    );

    res.status(201).json({
      message: "Admin registered successfully",
      user: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err.message });
  }
};


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

    // 3. Create a JWT token with role
    const token = jwt.sign(
      { 
        userId: user.id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    // 4. Send success response
    res.json({
      message: "Login successful",
      token,
      name: user.name,
      userId: user.id,
      email: user.email,
      role: user.role // ✅ Send role to frontend
    });

  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};