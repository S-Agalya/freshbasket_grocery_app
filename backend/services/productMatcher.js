const normalize = (value = "") =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ");

const extractQuantity = (text) => {
  const match = text.match(/(\d+(?:\.\d+)?)\s*(kg|g|litre|litres|ltr|l|dozen|pcs|piece|pack|packet|bottle|bottles)/i);

  if (!match) return null;

  const quantity = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  return { quantity, unit };
};

export const parseShoppingRequest = (message, products = []) => {
  const text = message || "";
  const normalizedText = normalize(text);

  if (!normalizedText) {
    return {
      intent: "PRODUCT_ONLY",
      reply: "😊 What would you like to add today?",
      needsQuantity: true,
      needsConfirmation: false,
      products: [],
      total: 0,
    };
  }

  const matchedProduct = products.find((product) => normalize(product.name) === normalizedText);

  if (matchedProduct) {
    if (matchedProduct.stock <= 0) {
      return {
        intent: "OUT_OF_STOCK",
        reply: `😔 Sorry! ${matchedProduct.name} is currently out of stock. We’ll be happy to help you with a similar option soon 😊`,
        needsQuantity: false,
        needsConfirmation: false,
        products: [],
        total: 0,
      };
    }

    const qtyInfo = extractQuantity(text);

    if (!qtyInfo) {
      return {
        intent: "PRODUCT_ONLY",
        reply: `🛒 ${matchedProduct.name} is available! How much would you like today? 😊`,
        needsQuantity: true,
        needsConfirmation: false,
        products: [],
        total: 0,
      };
    }

    const subtotal = matchedProduct.price * qtyInfo.quantity;

    return {
      intent: "PRODUCT_WITH_QUANTITY",
      reply: `🛒 Great choice! ${matchedProduct.name} × ${qtyInfo.quantity} ${qtyInfo.unit} will cost ₹${subtotal}. Would you like me to add it to your cart? 😊`,
      needsQuantity: false,
      needsConfirmation: true,
      products: [
        {
          id: matchedProduct.id,
          name: matchedProduct.name,
          quantity: qtyInfo.quantity,
          unit: qtyInfo.unit,
          price: matchedProduct.price,
          subtotal,
        },
      ],
      total: subtotal,
    };
  }

  const closeMatch = products.find((product) => {
    const name = normalize(product.name);
    return name.includes(normalizedText) || normalizedText.includes(name);
  });

  if (closeMatch) {
    return {
      intent: "SPELLING_SUGGESTION",
      reply: `😊 Did you mean ${closeMatch.name}? I can help you with that.`,
      needsQuantity: false,
      needsConfirmation: false,
      products: [],
      total: 0,
    };
  }

  return {
    intent: "PRODUCT_NOT_FOUND",
    reply: `� Sorry! We’re not having "${message}" in our store right now. If you want, I can suggest a similar product from our fresh range 😊`,
    needsQuantity: false,
    needsConfirmation: false,
    products: [],
    total: 0,
  };
};
