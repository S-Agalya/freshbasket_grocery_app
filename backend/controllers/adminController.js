// // // backend/controllers/adminController.js
// // import db from "../config/db.js"; // ✅ fixed path
// // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";

// // export const registerAdmin = async (req, res) => {
// //   const { name, email, password } = req.body;
// //   try {
// //     // check if admin exists
// //     const existingAdmin = await db.query(
// //       "SELECT * FROM admins WHERE email = $1",
// //       [email]
// //     );
// //     if (existingAdmin.rows.length > 0) {
// //       return res.status(400).json({ message: "Admin already exists" });
// //     }

// //     // hash password
// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     // insert new admin
// //     const newAdmin = await db.query(
// //       "INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING *",
// //       [name, email, hashedPassword]
// //     );

// //     res
// //       .status(201)
// //       .json({
// //         message: "Admin registered successfully!",
// //         admin: newAdmin.rows[0],
// //       });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };

// // export const loginAdmin = async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     // check admin
// //     const admin = await db.query("SELECT * FROM admins WHERE email = $1", [
// //       email,
// //     ]);
// //     if (admin.rows.length === 0) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     // compare password
// //     const validPassword = await bcrypt.compare(
// //       password,
// //       admin.rows[0].password
// //     );
// //     if (!validPassword) {
// //       return res.status(400).json({ message: "Invalid credentials" });
// //     }

// //     // generate token
// //     const token = jwt.sign(
// //       { id: admin.rows[0].id, email: admin.rows[0].email },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1d" }
// //     );

// //     res.json({
// //       message: "Login successful",
// //       token,
// //       admin: {
// //         id: admin.rows[0].id,
// //         name: admin.rows[0].name,
// //         email: admin.rows[0].email,
// //       },
// //     });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // };


// import db from "../config/db.js"; // ✅ make sure this points to your Postgres pool
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// // ========================
// // Register Admin
// // ========================
// export const registerAdmin = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     console.log("📩 Incoming Register Request:", req.body);

//     // 1. Check if admin already exists
//     const existingAdmin = await db.query(
//       "SELECT * FROM admins WHERE email = $1",
//       [email]
//     );
//     console.log("✅ Existing admin check:", existingAdmin.rows);

//     if (existingAdmin.rows.length > 0) {
//       return res.status(400).json({ message: "Admin already exists" });
//     }

//     // 2. Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // 3. Insert new admin
//     const newAdmin = await db.query(
//       "INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING *",
//       [name, email, hashedPassword]
//     );

//     console.log("✅ New admin inserted:", newAdmin.rows[0]);

//     res.status(201).json({
//       message: "Admin registered successfully!",
//       admin: newAdmin.rows[0],
//     });
//   } catch (err) {
//     console.error("❌ Error in registerAdmin:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // ========================
// // Login Admin
// // ========================
// export const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     console.log("📩 Incoming Login Request:", req.body);

//     // 1. Find admin by email
//     const admin = await db.query("SELECT * FROM admins WHERE email = $1", [
//       email,
//     ]);
//     console.log("✅ Admin lookup result:", admin.rows);

//     if (admin.rows.length === 0) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 2. Compare password
//     const validPassword = await bcrypt.compare(
//       password,
//       admin.rows[0].password
//     );

//     if (!validPassword) {
//       console.warn("⚠️ Invalid password attempt for:", email);
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // 3. Generate JWT
//     const token = jwt.sign(
//       { id: admin.rows[0].id, email: admin.rows[0].email },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     console.log("✅ Login successful for:", email);

//     res.json({
//       message: "Login successful",
//       token,
//       admin: {
//         id: admin.rows[0].id,
//         name: admin.rows[0].name,
//         email: admin.rows[0].email,
//       },
//     });
//   } catch (err) {
//     console.error("❌ Error in loginAdmin:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };



import db from "../config/db.js";

// Get all admin products
export const getAdminProducts = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

// Add a new product
export const addAdminProduct = async (req, res) => {
  try {
    const { name, price, unitType, category } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !price || !unitType || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await db.query(
      `INSERT INTO products (name, price, unit_type, category, image) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, price, unitType, category, image]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error adding product:", err);
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};
