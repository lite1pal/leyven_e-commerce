"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCart } from "react-use-cart";
import {
  API_URL,
  TELEGRAM_API_KEY,
  TELEGRAM_API_URL,
  TELEGRAM_CHAT_ID,
} from "@/config/api";
import axios from "axios";
import OrderProducts from "./components/products-card";
import OrderPrice from "./components/price-card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormSection from "./components/section";
import CitySelect from "./components/city-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import WarehouseSelect from "./components/warehouse-select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { wait } from "@/libs/utils";

// Define a form schema
const formSchema = z.object({
  phone: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().optional(),
  city: z.string().min(1, "Оберіть місто"),
  shippingType: z.enum(["warehouse", "postomat"], {
    required_error: "Оберіть тип доставки",
  }),
  warehouse: z.string().min(1, "Оберіть відділення"),
  paymentMethod: z.enum(["card", "cash on delivery"], {
    required_error: "Оберіть тип оплати",
  }),
  comment: z.string().optional(),
  totalPrice: z.number(),
  orderProducts: z.any(),
});

export default function FormOrder() {
  const router = useRouter();

  const { items, cartTotal, emptyCart } = useCart();

  // Define a form and its default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      warehouse: "",
      shippingType: "warehouse",
      paymentMethod: "cash on delivery",
      comment: "",
      totalPrice: cartTotal,
      orderProducts: items,
    },
  });

  const [city, setCity] = useState("");
  const [warehouse, setWarehouse] = useState("");

  const watchShippingType = form.watch("shippingType");

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
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
      const paymentMethod =
        data.paymentMethod === "card"
          ? "Оплата картою за реквізитами"
          : "Накладений платіж";

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
      });

      const telegramText = `Ім'я: ${
        data.firstName + " " + data.lastName
      }\n\nНомер телефону: ${
        data.phone
      }\n\nСпосіб оплати: ${paymentMethod}\n\nПошта: ${data.email}\n\nМісто: ${
        data.city
      }\n\nЗагальна ціна за все замовлення: ${
        data.totalPrice
      }\n\nВідділення / Поштомат: ${data.warehouse}\n\nКоментар: ${
        data.comment
      }\n\nТовари: \n\n${formattedOrderProducts.join("")}`;

      axios
        .post(`${TELEGRAM_API_URL}${TELEGRAM_API_KEY}/sendMessage`, {
          chat_id: TELEGRAM_CHAT_ID,
          parse_mode: "html",
          text: telegramText,
        })
        .then((response: any) => {})
        .catch((err: any) =>
          toast.error(
            "Сталась якась помилка, перезавантажте сторінку та спробуйте ще раз",
          ),
        );
      router.push(`/order_success/${parsedRes.id}`);
      toast.success("Замовлення успішне!");
    } catch (err) {
      console.error("Failed to create an order");
    }
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-5 lg:flex-row"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-col gap-5 pb-5">
          <FormSection header="Контактні дані">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваш номер телефону</FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 shadow-none"
                      placeholder="+380"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ваше ім{"'"}я</FormLabel>
                    <FormControl>
                      <Input className="h-10 shadow-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Ваше прізвище</FormLabel>
                    <FormControl>
                      <Input className="h-10 shadow-none" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваша пошта *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      className="h-10 shadow-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection header="Доставка">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <CitySelect setCity={setCity} field={field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingType"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel>
                    Спосіб доставки (безкоштовно від 500 грн)
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center justify-between space-y-0 rounded px-2 hover:bg-slate-50">
                        <div className="flex w-full items-center gap-2">
                          <div className="w-5">
                            <img
                              className="rounded-full"
                              src={"/novaposhta.png"}
                              alt="Nova poshta image"
                            />
                          </div>
                          <FormLabel className="w-full rounded py-3 font-normal">
                            Нова пошта Поштомат{" "}
                            <span className="text-neutral-500">- 55 грн</span>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <RadioGroupItem value="postomat" />
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center justify-between space-y-0 rounded px-2 hover:bg-slate-50">
                        <div className="flex w-full items-center gap-2">
                          <div className="w-5">
                            <img
                              className="rounded-full"
                              src={"/novaposhta.png"}
                              alt="Nova poshta image"
                            />
                          </div>

                          <FormLabel className="w-full rounded py-3 font-normal">
                            Нова пошта Відділення{" "}
                            <span className="text-neutral-500">- 60 грн</span>
                          </FormLabel>
                        </div>
                        <FormControl>
                          <RadioGroupItem value="warehouse" />
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {city && watchShippingType && (
              <FormField
                control={form.control}
                name="warehouse"
                render={({ field }) => (
                  <FormItem>
                    <WarehouseSelect
                      field={field}
                      shippingType={watchShippingType}
                      cityInput={city}
                      warehouseInput={warehouse}
                      setWarehouseInput={setWarehouse}
                    />
                  </FormItem>
                )}
              />
            )}
          </FormSection>

          <FormSection header="Спосіб оплати">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center justify-between space-y-0 rounded px-2 hover:bg-slate-50">
                        <FormLabel className="w-full rounded py-3 font-normal">
                          Оплата карткою за реквізитами
                        </FormLabel>
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                      </FormItem>
                      <FormItem className="flex items-center justify-between space-y-0 rounded px-2 hover:bg-slate-50">
                        <FormLabel className="w-full rounded py-3 font-normal">
                          Готівкою або карткою: при отриманні
                        </FormLabel>
                        <FormControl>
                          <RadioGroupItem value="cash on delivery" />
                        </FormControl>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormSection>

          <FormSection header="Коментар">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className="shadow-none" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </FormSection>
        </div>

        <div
          style={{ maxWidth: "30rem" }}
          className="mx-auto flex w-full flex-col gap-5"
        >
          <OrderProducts />
          <OrderPrice watchShippingType={watchShippingType} />

          <div className="mx-auto mb-5 w-fit">
            {!form.formState.isSubmitting ? (
              <Button
                type="submit"
                size="lg"
                className="bg-yellow-300 text-base text-slate-950 hover:bg-white"
              >
                Підтвердити замовлення
              </Button>
            ) : (
              <span className="loading loading-ring loading-lg"></span>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
}
