-- ============================================
-- Single Users Table with Role-Based Access
-- ============================================

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    avatar VARCHAR(255), -- Avatar URL from DiceBear API
    role VARCHAR(50) DEFAULT 'customer', -- 'customer' or 'admin'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Products Table
-- ============================================
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

-- ============================================
-- Orders Table
-- ============================================
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

-- ============================================
-- Cart Items Table
-- ============================================
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL
);

-- ============================================
-- User Profiles Table (Optional - for additional info)
-- ============================================
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    avatar VARCHAR(255), -- Avatar URL from DiceBear API
    bio TEXT,
    preferences TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
