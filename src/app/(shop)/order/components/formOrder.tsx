"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCart } from "react-use-cart";
import Button from "@/components/Button";
import {
  API_KEY,
  API_URL,
  TELEGRAM_API_KEY,
  TELEGRAM_API_URL,
  TELEGRAM_CHAT_ID,
} from "@/config/api";
import axios from "axios";
import OrderFields from "./orderFields";
import OrderProducts from "./orderProducts";
import OrderPrice from "./orderPrice";

export default function FormOrder() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const { items, cartTotal, emptyCart } = useCart();

  const [city, setCity] = useState("");
  const [warehouse, setWarehouse] = useState("");

  const watchShippingType = watch("shippingType");

  const [isSubmitting, setIsSubmitting] = useState(false); // State variable to track form submission

  const onSubmit = async (data: any) => {
    try {
      if (isSubmitting) return; // Prevent multiple submissions
      setIsSubmitting(true); // Set isSubmitting to true when form submission starts

      if (cartTotal < 200) {
        toast.error("Мінімальна сума замовлення 200грн", {
          style: { minWidth: "25rem", height: "5rem" },
          position: "bottom-center",
        });
        return;
      }

      if (items.length === 0) {
        toast.error(
          "Додайте хоча б один товар до кошику, щоб зробити замовлення",
        );
        return;
      }
      if (!city) {
        toast.error("Виберіть місто доставки");
        return;
      } else if (!warehouse) {
        toast.error("Виберіть відділення Нової пошти");
        return;
      }

      data.city = city;
      data.warehouse = warehouse;
      data.totalPrice = cartTotal;
      data.orderProducts = items;
      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      const parsedRes = await res.json();
      if (!res.ok) {
        toast.error(
          "Сталась якась помилка, перезавантажте сторінку та спробуйте ще раз",
        );
        return;
      }
      emptyCart();
      const formattedOrderProducts = data.orderProducts.map((product: any) => {
        return `Назва: ${product.title}\n\nЦіна: ${product.price}\n\nЗагальна ціна товару: ${product.itemTotal}\n\nКількість: ${product.quantity}\n\nАртикул: ${product.artycul}\n\nШтрихкод: ${product.barcode}\n\n-------------------------------------------------\n\n`;
        // return {
        //   title: product.title,
        //   price: product.price,
        //   quantity: product.quantity,
        //   totalPrice: product.itemTotal,
        //   img: product.img,
        // };
      });
      axios
        .post(`${TELEGRAM_API_URL}${TELEGRAM_API_KEY}/sendMessage`, {
          chat_id: TELEGRAM_CHAT_ID,
          parse_mode: "html",
          text: `Ім'я: ${
            data.firstName + " " + data.lastName
          }\n\nНомер телефону: ${data.phone}\n\nПошта: ${
            data.email
          }\n\nМісто: ${data.city}\n\nЗагальна ціна за все замовлення: ${
            data.totalPrice
          }\n\nВідділення / Поштомат: ${data.warehouse}\n\nКоментар: ${
            data.comment
          }\n\nТовари: \n\n${formattedOrderProducts.join("")}`,
        })
        .then((response: any) => {})
        .catch((err: any) =>
          toast.error(
            "Сталась якась помилка, перезавантажте сторінку та спробуйте ще раз",
          ),
        );
      router.push(`/order_success/${parsedRes.id}`);
      toast.success("Замовлення успішне!");
      setIsSubmitting(false);
    } catch (err) {
      console.error("Failed to create an order");
      setIsSubmitting(false); // Reset isSubmitting in case of error
    }
  };
  return (
    <form
      className="flex flex-col gap-5 lg:flex-row"
      onSubmit={handleSubmit(onSubmit)}
    >
      <OrderFields
        {...{ register, watch, city, setCity, warehouse, setWarehouse }}
      />

      <div
        style={{ maxWidth: "30rem" }}
        className="mx-auto flex w-full flex-col gap-5"
      >
        <OrderProducts />
        <OrderPrice watchShippingType={watchShippingType} />

        <div className="mx-auto mb-5 w-fit">
          <Button
            // disabled={isSubmitting}
            title="Підтвердити замовлення"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}
