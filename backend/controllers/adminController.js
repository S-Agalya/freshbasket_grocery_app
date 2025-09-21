import pool from "../db.js"; // your pg pool connection
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // check if admin exists
    const existingAdmin = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
    if (existingAdmin.rows.length > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert new admin
    const newAdmin = await pool.query(
      "INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Admin registered successfully!", admin: newAdmin.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check admin
    const admin = await pool.query("SELECT * FROM admins WHERE email = $1", [email]);
    if (admin.rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // compare password
    const validPassword = await bcrypt.compare(password, admin.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign(
      { id: admin.rows[0].id, email: admin.rows[0].email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
