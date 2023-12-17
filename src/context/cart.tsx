"use client";

import { ReactNode } from "react";
import { CartProvider } from "react-use-cart";

export default function ServerCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
