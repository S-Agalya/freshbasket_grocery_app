const normalizeText = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const extractQuantity = (text = "") => {
  const match = text.match(/(\d+(?:\.\d+)?)\s*(kg|g|gm|grams|gram|litre|litres|ltr|ml|pcs|pc|piece|pieces|pack|packs|box|boxes|bottle|bottles|dozen|bundles|bundle)?/i);

  if (!match) return 1;

  const amount = Number(match[1]);
  if (Number.isNaN(amount) || amount <= 0) return 1;
  return amount;
};

const scoreProductMatch = (product, query) => {
  const productName = normalizeText(product.name);
  const category = normalizeText(product.category || "");
  const queryText = normalizeText(query);

  if (!queryText) return 0;

  if (productName === queryText) return 100;
  if (productName.includes(queryText) || queryText.includes(productName)) return 85;

  const productTokens = productName.split(" ");
  const queryTokens = queryText.split(" ");
  const overlap = productTokens.filter((token) => queryTokens.includes(token)).length;
  if (overlap > 0) return 30 + overlap * 10;
  if (category.includes(queryText) || queryText.includes(category)) return 20;
  return 0;
};

export const matchProduct = (products = [], searchTerm = "") => {
  if (!searchTerm) return null;

  const ranked = products
    .map((product) => ({
      product,
      score: scoreProductMatch(product, searchTerm),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.product || null;
};

export const buildFallbackShoppingResponse = (message = "", products = []) => {
  const lowerMessage = normalizeText(message);
  const matchedProducts = products.filter((product) => {
    const name = normalizeText(product.name);
    return name && lowerMessage.includes(name);
  });

  if (matchedProducts.length > 0) {
    const primary = matchedProducts[0];
    const qty = extractQuantity(message);
    return {
      intent: "add_to_cart",
      reply: `Sure! I found ${primary.name} and added ${qty} ${primary.unit || "unit"} to your cart.`,
      shouldAddToCart: true,
      items: [
        {
          productName: primary.name,
          qty,
          unit: primary.unit || "unit",
        },
      ],
      suggestions: [],
    };
  }

  if (/recipe|cook|make|prepare|dish|dinner|breakfast|lunch|biryani|pasta|fried rice/i.test(message)) {
    const suggestions = products.slice(0, 4).map((product) => ({
      productName: product.name,
      reason: "Popular choice from the available catalog",
    }));

    return {
      intent: "suggest_products",
      reply: "I can help with that. Here are a few items you may want to consider.",
      shouldAddToCart: false,
      items: [],
      suggestions,
    };
  }

  return {
    intent: "greeting",
    reply: "I can help you add groceries to your cart. Try saying something like: add 2 kg apples or suggest items for biryani.",
    shouldAddToCart: false,
    items: [],
    suggestions: [],
  };
};
