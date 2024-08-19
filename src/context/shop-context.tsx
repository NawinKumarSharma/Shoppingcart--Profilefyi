"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { PRODUCTS } from "@/Data/products";

interface ShopContextType {
  cartItems: Record<number, number>;
  addToCart: (itemId: number) => void;
  updateCartItemCount: (newAmount: number, itemId: number) => void;
  removeFromCart: (itemId: number) => void;
  getTotalCartAmount: () => number;
  checkout: () => void;
}

export const ShopContext = createContext<ShopContextType | null>(null);

const getDefaultCart = () => {
  const cart: Record<number, number> = {};
  for (let i = 1; i <= PRODUCTS.length; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState(() => {
    // only incase of rendering in server (need to fix hydration error)
    if (typeof window == "undefined") {
      return getDefaultCart();
    }
    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(getDefaultCart()));
      return getDefaultCart();
    }
    return JSON.parse(localStorage.getItem("cart") as string);
  });

  useEffect(() => {
    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify(getDefaultCart()));
      setCartItems(() => {
        return getDefaultCart();
      });
    }
    setCartItems(() => {
      return JSON.parse(localStorage.getItem("cart") as string);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = PRODUCTS.find(
          (product) => product.id === Number(item)
        );
        totalAmount += cartItems[item] * (itemInfo ? itemInfo.price : 0);
      }
    }
    return totalAmount;
  };

  const addToCart = (itemId: number) => {
    // @ts-ignore
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: number) => {
    // @ts-ignore
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));
  };

  const updateCartItemCount = (newAmount: number, itemId: number) => {
    // @ts-ignore

    setCartItems((prev) => ({ ...prev, [itemId]: Math.max(newAmount, 0) }));
  };

  const checkout = () => {
    setCartItems(getDefaultCart());
  };

  const contextValue: ShopContextType = {
    cartItems,
    addToCart,
    updateCartItemCount,
    removeFromCart,
    getTotalCartAmount,
    checkout,
  };

  return (
    <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>
  );
};
