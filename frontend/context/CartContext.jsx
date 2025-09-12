"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load from localStorage initially
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const [wishlist, setWishlist] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("wishlist");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ Reusable cart functions
  const updateCart = (id, change) => {
    setCart((prev) => {
      const qty = (prev[id] || 0) + change;
      if (qty <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: qty };
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        wishlist,
        setWishlist,
        updateCart,
        removeFromCart,
        toggleWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
