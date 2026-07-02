# Role-Based User System - Implementation Guide

## Overview
Single `users` table with role-based access control. Users can register as either 'customer' or 'admin' based on which frontend they use.

---

## 1. Database Setup

Run on Render Postgres (or use Query Editor):

```sql
-- Drop old tables if they exist
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS admins;

-- Create new unified users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role VARCHAR(50) DEFAULT 'customer', -- 'customer' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rest of tables...
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT,
    category TEXT,
    stock INTEGER DEFAULT 0,
    unit VARCHAR(50),
    unit_type VARCHAR(50),
    stock_unit VARCHAR(50),
    unit_quantity INTEGER,
    product_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    comments TEXT,
    total_amount INTEGER,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL
);
```

---

## 2. Frontend Registration

### Customer Site (frontend)
```javascript
// Send role = 'customer'
axios.post(`${API_URL}/api/auth/register`, {
    name: "John",
    email: "john@example.com",
    password: "password123",
    phone: "9876543210",
    address: "123 Street",
    role: 'customer'  // ← Auto role
});
```

### Admin Site (freshbasket-admin)
```javascript
// Send role = 'admin'
axios.post(`${API_URL}/api/auth/register`, {
    name: "Admin User",
    email: "admin@example.com",
    password: "adminpass123",
    phone: "9876543210",
    address: "123 Admin St",
    role: 'admin'  // ← Auto role
});
```

---

## 3. Backend Auth Flow

### Register (handles both customer & admin)
- Accepts `role` in request body
- Defaults to 'customer' if not provided
- Returns user with role

### Login
- Returns JWT with role included
- Frontend gets role and redirects accordingly:
  - `role: 'admin'` → Admin dashboard
  - `role: 'customer'` → Customer site

---

## 4. Middleware Usage

### Protect Admin Routes
```javascript
import { verifyToken, adminOnly } from "../middleware/roleMiddleware.js";

// Only admins can access
router.post("/add-product", verifyToken, adminOnly, addProduct);
router.delete("/product/:id", verifyToken, adminOnly, deleteProduct);
```

### Protect Customer Routes
```javascript
import { customerOnly } from "../middleware/roleMiddleware.js";

// Only customers can access
router.post("/place-order", verifyToken, customerOnly, placeOrder);
```

### Protect Any Authenticated Route
```javascript
import { authRequired } from "../middleware/roleMiddleware.js";

// Both admin and customer can access
router.get("/profile", authRequired, getProfile);
```

---

## 5. Updated Files

✅ **Backend Controller** - `authController.js`
- Register accepts role, phone, address
- Login returns role

✅ **Middleware** - `roleMiddleware.js` (NEW)
- `verifyToken` - Check JWT validity
- `adminOnly` - Admin access only
- `customerOnly` - Customer access only
- `authRequired` - Both allowed

✅ **Routes** - `adminProductRoutes.js`
- All admin routes protected with `adminOnly` middleware

✅ **Database Schema** - `singleTableSchema.sql` (NEW)
- Single users table with role column

---

## 6. Next Steps

1. **Run schema on Render Postgres** (use singleTableSchema.sql)
2. **Commit and push to GitHub**:
   ```bash
   git add .
   git commit -m "Implement role-based user system"
   git push origin main
   ```
3. **Redeploy backend on Render**
4. **Test registration**:
   - Register on customer site (role = 'customer')
   - Register on admin site (role = 'admin')
5. **Update other admin routes** to use `adminOnly` middleware

---

## 7. Token Structure

JWT now contains:
```javascript
{
    userId: 123,
    name: "John Doe",
    email: "john@example.com",
    role: "customer"  // or "admin"
}
```

Frontend can decode and check role:
```javascript
const decoded = jwt_decode(token);
if (decoded.role === 'admin') {
    // Show admin dashboard
} else {
    // Show customer site
}
```
