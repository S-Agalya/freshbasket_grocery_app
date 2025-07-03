// // import db from "../config/db.js";
// // import bcrypt from "bcrypt";

// // export const updateProfile = async (req, res) => {
// //   const { userId } = req.params;
// //   const { username, email, password, phone, address } = req.body;

// //   try {
// //     // 1. Update users table (username, email, password)
// //     let hashedPassword = null;
// //     if (password) {
// //       hashedPassword = await bcrypt.hash(password, 10);
// //     }

// //     await db.query(
// //       `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`,
// //       [username, email, hashedPassword, userId]
// //     );

// //     // 2. Check if user_profiles entry exists
// //     const profileCheck = await db.query(
// //       `SELECT * FROM user_profiles WHERE user_id = $1`,
// //       [userId]
// //     );

// //     if (profileCheck.rows.length === 0) {
// //       // insert new profile row
// //       await db.query(
// //         `INSERT INTO user_profiles (user_id, phone, address) VALUES ($1, $2, $3)`,
// //         [userId, phone, address]
// //       );
// //     } else {
// //       // update existing profile
// //       await db.query(
// //         `UPDATE user_profiles SET phone = $1, address = $2 WHERE user_id = $3`,
// //         [phone, address, userId]
// //       );
// //     }

// //     res.json({ message: "Profile updated successfully!" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: "Error updating profile", details: err.message });
// //   }
// // };


// import db from "../config/db.js";
// import bcrypt from "bcrypt";

// export const updateProfile = async (req, res) => {
//   const { userId } = req.params;
//   const { username, email, password, phone, address } = req.body;

//   try {
//     let hashedPassword = await bcrypt.hash(password, 10);

//     await db.query(
//       `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`,
//       [username, email, hashedPassword, userId]
//     );

//     const profileCheck = await db.query(
//       `SELECT * FROM user_profiles WHERE user_id = $1`,
//       [userId]
//     );

//     if (profileCheck.rows.length === 0) {
//       await db.query(
//         `INSERT INTO user_profiles (user_id, phone, address) VALUES ($1, $2, $3)`,
//         [userId, phone, address]
//       );
//     } else {
//       await db.query(
//         `UPDATE user_profiles SET phone = $1, address = $2 WHERE user_id = $3`,
//         [phone, address, userId]
//       );
//     }

//     res.json({ message: "Profile updated successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error updating profile", details: err.message });
//   }
// };


import db from "../config/db.js";
import bcrypt from "bcrypt";

// ✅ PUT - Update Profile
export const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, email, password, phone, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // 1️⃣ Update users table
    await db.query(
      `UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`,
      [username, email, hashedPassword, userId]
    );

    // 2️⃣ Insert or update user_profiles
    const profileCheck = await db.query(
      `SELECT * FROM user_profiles WHERE user_id = $1`,
      [userId]
    );

    if (profileCheck.rows.length === 0) {
      await db.query(
        `INSERT INTO user_profiles (user_id, phone, address) VALUES ($1, $2, $3)`,
        [userId, phone, address]
      );
    } else {
      await db.query(
        `UPDATE user_profiles SET phone = $1, address = $2 WHERE user_id = $3`,
        [phone, address, userId]
      );
    }

    res.json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating profile", details: err.message });
  }
};

// ✅ GET - Get Profile
export const getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const userResult = await db.query(
      `SELECT name, email FROM users WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    const profileResult = await db.query(
      `SELECT phone, address FROM user_profiles WHERE user_id = $1`,
      [userId]
    );

    const profile = profileResult.rows[0] || {};

    res.json({
      username: user.name,
      email: user.email,
      phone: profile.phone || "",
      address: profile.address || ""
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching profile", details: err.message });
  }
};
