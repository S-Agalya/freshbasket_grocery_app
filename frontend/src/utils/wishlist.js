// Wishlist helpers — stored in localStorage, scoped per user

const getWishlistKey = () => `fb_wishlist_${localStorage.getItem("userId") || "guest"}`;
const getRecentKey = () => `fb_recent_${localStorage.getItem("userId") || "guest"}`;

export const getWishlist = () => {
  try { return JSON.parse(localStorage.getItem(getWishlistKey()) || "[]"); } catch { return []; }
};

export const isWishlisted = (productId) => getWishlist().some(p => p.id === productId);

export const toggleWishlist = (product) => {
  const list = getWishlist();
  const exists = list.some(p => p.id === product.id);
  const updated = exists ? list.filter(p => p.id !== product.id) : [...list, product];
  localStorage.setItem(getWishlistKey(), JSON.stringify(updated));
  return !exists; // returns new state (true = added)
};

// Recently viewed — stores last 10 products
export const addRecentlyViewed = (product) => {
  try {
    const key = getRecentKey();
    const list = JSON.parse(localStorage.getItem(key) || "[]");
    const filtered = list.filter(p => p.id !== product.id);
    const updated = [product, ...filtered].slice(0, 10);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch { /* ignore */ }
};

export const getRecentlyViewed = () => {
  try { return JSON.parse(localStorage.getItem(getRecentKey()) || "[]"); } catch { return []; }
};
