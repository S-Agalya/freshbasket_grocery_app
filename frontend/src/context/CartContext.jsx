import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const getCartKey = () => `cartItems_${localStorage.getItem("userId") || "guest"}`;

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem(getCartKey());
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(getCartKey(), JSON.stringify(cartItems));
  }, [cartItems]);

  // Call this after login to load the newly logged-in user's cart
  const loadUserCart = (userId) => {
    const stored = localStorage.getItem(`cartItems_${userId}`);
    setCartItems(stored ? JSON.parse(stored) : []);
  };

  // Your existing functions
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const increaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const setItemQty = (id, qty) => {
    const n = parseInt(qty);
    if (isNaN(n) || n < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: n } : item));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(getCartKey());
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, setItemQty, clearCart, loadUserCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
