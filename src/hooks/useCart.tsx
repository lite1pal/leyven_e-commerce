"use client";

import { API_URL } from "@/config/api";
import { Session } from "next-auth";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  session: Session | null;
  open: boolean | null;
  setOpen: (boolean: boolean) => void;
}

export default function useCart({ session, open, setOpen }: IProps) {
  const [cart, setCart] = useState({ totalPrice: "", cartProducts: [] });
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCart = async () => {
    // setLoading(true);
    if (!session) {
      console.error("Failed fetching a cart");
      return;
    }
    const res = await fetch(`${API_URL}/cart?email=${session.user?.email}`);
    const data = await res.json();
    setCart(data);
    // setLoading(false);
  };

  const refetchCart = async () => {
    await fetchCart();
  };

  const isProductAlreadyInCart = useCallback(
    ({ data }: any) => {
      const existingCartProduct = cart.cartProducts.filter(
        (cartProduct: any) => cartProduct.productId === data.id
      );
      return existingCartProduct[0];
    },
    [cart]
  );

  const addProductToCart = async ({ data }: any) => {
    try {
      setLoading(true);

      if (!isProductAlreadyInCart({ data })) {
        await fetch(`${API_URL}/cartProduct`, {
          method: "POST",
          body: JSON.stringify({ data, session }),
        });
        toast.success("Товар доданий у корзину!");
      }
      setLoading(false);
      setOpen(true);
      await refetchCart();
    } catch (err) {
      console.error("Failed to add a product to the cart", err);
    }
  };

  const deleteProductFromCart = async (cartProductId: string) => {
    try {
      setLoading(true);
      if (!cartProductId)
        return console.log("Provide product id as a parameter");

      await fetch(`${API_URL}/cartProduct?cartProductId=${cartProductId}`, {
        method: "DELETE",
      });
      toast.success(`Товар видалено з корзини`);
      await refetchCart();
      setLoading(false);
    } catch (err) {
      console.error("Failed to delete a product from the cart", err);
    }
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
      await refetchCart();
      setLoading(false);
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
      await refetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [open]);

  return {
    cart,
    loading,
    refetchCart,
    addProductToCart,
    deleteProductFromCart,
    increaseQuantity,
    decreaseQuantity,
    isProductAlreadyInCart,
  };
}
