import { createContext, useEffect, useMemo, useState } from "react";
import { cards as defaultSections } from "../../test";

const STORAGE_KEY = "wix_gift_card_state_v1";
const DEFAULT_CARD_IMAGE =
  "https://www.mygiftcardsupply.com/wp-content/uploads/2022/01/amazon-gift-card.png";

const FALLBACK_CONTEXT = {
  marketCards: [],
  ownedCards: [],
  history: [],
  cart: [],
  categories: [],
  getCardById: (_cardId) => null,
  addToCart: (_cardId) => ({
    ok: false,
    message: "Gift card store unavailable.",
  }),
  removeFromCart: (_cardId) => {},
  startCheckout: (_cardId) => ({
    ok: false,
    message: "Gift card store unavailable.",
  }),
  clearCart: () => {},
  completeCheckout: () => ({
    ok: false,
    message: "Gift card store unavailable.",
  }),
  listCard: (_payload) => ({
    ok: false,
    message: "Gift card store unavailable.",
  }),
};

export const GiftCardContext = createContext(FALLBACK_CONTEXT);

function flattenDefaultCards() {
  const categoryMap = {
    Amazon: "Retail",
    Walmart: "Retail",
    Target: "Retail",
    Xbox: "Gaming",
    Steam: "Gaming",
    Netflix: "Entertainment",
    Spotify: "Entertainment",
  };

  const now = new Date().toISOString();

  return defaultSections
    .flatMap((section) => section.data)
    .map((card) => ({
      ...card,
      image: DEFAULT_CARD_IMAGE,
      category: categoryMap[card.name] ?? "Digital",
      sellerName: "Trusted Seller",
      sellerEmail: "seller@wixchange.app",
      sellerPhone: "+234 123 123 1234",
      createdAt: now,
      source: "seed",
    }));
}

function safeParseStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getCurrentUserName() {
  try {
    const raw = localStorage.getItem("wix_user");
    if (!raw) {
      return "You";
    }
    const parsed = JSON.parse(raw);
    return parsed?.username || parsed?.name || parsed?.fullName || "You";
  } catch {
    return "You";
  }
}

function createHistoryRecord(card, type, status, amount) {
  return {
    id: crypto.randomUUID(),
    cardId: card.id,
    cardName: card.name,
    type,
    status,
    amount,
    createdAt: new Date().toISOString(),
  };
}

function GiftCardProvider({ children }) {
  const [marketCards, setMarketCards] = useState([]);
  const [ownedCards, setOwnedCards] = useState([]);
  const [history, setHistory] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cached = safeParseStorage();

    if (cached) {
      setMarketCards(
        Array.isArray(cached.marketCards) ? cached.marketCards : [],
      );
      setOwnedCards(Array.isArray(cached.ownedCards) ? cached.ownedCards : []);
      setHistory(Array.isArray(cached.history) ? cached.history : []);
      setCart(Array.isArray(cached.cart) ? cached.cart : []);
      return;
    }

    setMarketCards(flattenDefaultCards());
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ marketCards, ownedCards, history, cart }),
    );
  }, [marketCards, ownedCards, history, cart]);

  const categories = useMemo(() => {
    const bucket = new Set(marketCards.map((card) => card.category));
    return ["All", ...Array.from(bucket)];
  }, [marketCards]);

  const getCardById = (cardId) => {
    return marketCards.find((card) => card.id === cardId) ?? null;
  };

  const addToCart = (cardId) => {
    const card = getCardById(cardId);

    if (!card) {
      return {
        ok: false,
        message: "Gift card not found or no longer available.",
      };
    }

    const alreadyInCart = cart.some((item) => item.id === cardId);
    if (alreadyInCart) {
      return { ok: false, message: "Gift card is already in your cart." };
    }

    setCart((prev) => [...prev, card]);
    return { ok: true, message: "Gift card added to cart." };
  };

  const removeFromCart = (cardId) => {
    setCart((prev) => prev.filter((item) => item.id !== cardId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const startCheckout = (cardId) => {
    const card = getCardById(cardId);

    if (!card) {
      return {
        ok: false,
        message: "Gift card not found or no longer available.",
      };
    }

    setCart([card]);
    return { ok: true, message: "Ready for checkout." };
  };

  const completeCheckout = () => {
    if (cart.length === 0) {
      return { ok: false, message: "No gift cards in cart." };
    }

    const purchasedIds = new Set(cart.map((item) => item.id));
    setMarketCards((prev) => prev.filter((item) => !purchasedIds.has(item.id)));
    setOwnedCards((prev) => [...cart, ...prev]);
    setHistory((prev) => {
      const records = cart.map((item) =>
        createHistoryRecord(item, "buy", "completed", item.price),
      );
      return [...records, ...prev];
    });
    setCart([]);

    return { ok: true, message: "Purchase completed successfully." };
  };

  const listCard = (payload) => {
    const cardValue = Number(payload.value);
    const cardPrice = Number(payload.price);
    const discountPercent = Number(payload.discountPercent || 0);

    if (!payload.name.trim()) {
      return { ok: false, message: "Brand is required." };
    }

    if (!payload.cardNumber.trim() || payload.cardNumber.trim().length < 6) {
      return { ok: false, message: "Card number is invalid." };
    }

    if (!payload.pin.trim() || payload.pin.trim().length < 4) {
      return { ok: false, message: "Card PIN is invalid." };
    }

    if (Number.isNaN(cardValue) || cardValue <= 0) {
      return { ok: false, message: "Card value must be greater than zero." };
    }

    if (Number.isNaN(cardPrice) || cardPrice <= 0) {
      return { ok: false, message: "Selling price must be greater than zero." };
    }

    if (discountPercent < 0 || discountPercent > 100) {
      return { ok: false, message: "Discount must be between 0 and 100." };
    }

    const discount = Number(((cardPrice * discountPercent) / 100).toFixed(2));

    const newCard = {
      id: crypto.randomUUID(),
      sellerId: "local-user",
      name: payload.name.trim(),
      value: cardValue,
      price: cardPrice,
      discount,
      image: DEFAULT_CARD_IMAGE,
      category: payload.category || "Digital",
      sellerName: getCurrentUserName(),
      sellerEmail: "you@wixchange.app",
      sellerPhone: "+234 000 000 0000",
      createdAt: new Date().toISOString(),
      source: "user",
    };

    setMarketCards((prev) => [newCard, ...prev]);
    setHistory((prev) => [
      createHistoryRecord(newCard, "list", "pending", newCard.price),
      ...prev,
    ]);

    return {
      ok: true,
      message: "Gift card listed successfully.",
      card: newCard,
    };
  };

  return (
    <GiftCardContext.Provider
      value={{
        marketCards,
        ownedCards,
        history,
        cart,
        categories,
        getCardById,
        addToCart,
        removeFromCart,
        startCheckout,
        clearCart,
        completeCheckout,
        listCard,
      }}
    >
      {children}
    </GiftCardContext.Provider>
  );
}

export default GiftCardProvider;
