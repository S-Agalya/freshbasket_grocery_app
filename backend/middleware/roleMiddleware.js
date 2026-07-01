import jwt from "jsonwebtoken";

// ✅ Verify JWT and extract user info
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Only allow admin role
export const adminOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  next();
};

// ✅ Only allow customer role
export const customerOnly = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  if (req.user.role !== "customer") {
    return res.status(403).json({ message: "Customer access only" });
  }

  next();
};

// ✅ Allow both admin and customer
export const authRequired = verifyToken;
