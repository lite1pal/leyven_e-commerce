"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext<any>({
  cart: "",
  revalidateCart: {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<any>({});

  const revalidateCart = () => {};

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useLanguage() {
  return useContext(CartContext);
}
