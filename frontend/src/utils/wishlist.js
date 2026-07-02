// Wishlist helpers — stored in localStorage

export const getWishlist = () => {
  try { return JSON.parse(localStorage.getItem("fb_wishlist") || "[]"); } catch { return []; }
};

export const isWishlisted = (productId) => getWishlist().some(p => p.id === productId);

export const toggleWishlist = (product) => {
  const list = getWishlist();
  const exists = list.some(p => p.id === product.id);
  const updated = exists ? list.filter(p => p.id !== product.id) : [...list, product];
  localStorage.setItem("fb_wishlist", JSON.stringify(updated));
  return !exists; // returns new state (true = added)
};

// Recently viewed — stores last 10 products
export const addRecentlyViewed = (product) => {
  try {
    const list = JSON.parse(localStorage.getItem("fb_recent") || "[]");
    const filtered = list.filter(p => p.id !== product.id);
    const updated = [product, ...filtered].slice(0, 10);
    localStorage.setItem("fb_recent", JSON.stringify(updated));
  } catch { /* ignore */ }
};

export const getRecentlyViewed = () => {
  try { return JSON.parse(localStorage.getItem("fb_recent") || "[]"); } catch { return []; }
};
