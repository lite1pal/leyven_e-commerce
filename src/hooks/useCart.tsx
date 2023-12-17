"use client";

import { API_URL } from "@/config/api";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

interface IProps {
  session: Session | null;
}

export default function useCart({ session }: IProps) {
  const [cart, setCart] = useState({ totalPrice: "", cartProducts: [] });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCart = async () => {
    setLoading(true);
    if (!session) {
      console.error("Failed fetching a cart");
      return;
    }
    const res = await fetch(`${API_URL}/cart?email=${session?.user?.email}`);
    const data = await res.json();
    setCart(data);
    setLoading(false);
  };

  const refetchCart = () => {
    fetchCart();
  };

  const increaseQuantity = async (cartProductId: string) => {
    try {
      setLoading(true);
      if (!cartProductId) {
        return console.log("Provide product id as a parameter");
      }
      await fetch(
        `${API_URL}/cartProduct?cartProductId=${cartProductId}&type=increase`,
        {
          method: "PUT",
        }
      );
      setLoading(false);
      // getCart();
    } catch (err) {
      console.error(err);
    }
  };

  const decreaseQuantity = async (cartProductId: string) => {
    try {
      setLoading(true);
      if (!cartProductId) {
        return console.log("Provide product id as a parameter");
      }

      await fetch(
        `${API_URL}/cartProduct?cartProductId=${cartProductId}&type=decrease`,
        {
          method: "PUT",
        }
      );
      setLoading(false);
      // getCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { cart, loading, refetchCart, increaseQuantity, decreaseQuantity };
}
