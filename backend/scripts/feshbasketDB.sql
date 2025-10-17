-- Users table

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password TEXT NOT NULL
);
-- User Profiles table
CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    phone VARCHAR(20),
    address TEXT
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    image TEXT,
    category TEXT
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    comments TEXT,
    total_amount INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items table
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id)
    
);

ALTER TABLE products 
ADD COLUMN stock INTEGER DEFAULT 0,
ADD COLUMN unit VARCHAR(50),
ADD COLUMN unit_type VARCHAR(50);
ALTER TABLE orders ADD COLUMN status TEXT DEFAULT 'Pending';
