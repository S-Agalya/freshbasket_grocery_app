// import express from "express";
// import multer from "multer";
// import { getAdminProducts, addAdminProduct } from "../controllers/adminProductController.js";

// const router = express.Router();

// // Multer config for image uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // store images in uploads folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage });

// // Routes
// router.get("/", getAdminProducts);
// router.post("/", upload.single("image"), addAdminProduct);

// export default router;


import express from "express";
import multer from "multer";
import { getAdminProducts, addAdminProduct ,updateAdminProduct, deleteAdminProduct} from "../controllers/adminProductController.js";

const router = express.Router();

// Create uploads folder if it doesn't exist
import fs from "fs";
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.get("/", getAdminProducts);
router.post("/", upload.single("image"), addAdminProduct);
router.put("/:id", upload.single("image"), updateAdminProduct); // update product
router.delete("/:id", deleteAdminProduct); // delete product
export default router;
