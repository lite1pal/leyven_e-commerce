"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Card, CardContent, Divider, Grid } from "@mui/joy";
import CitySelect from "@/domains/shop/order/components/citySelect";
import WarehouseSelect from "@/domains/shop/order/components/warehouseSelect";
import { Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { fetchCities } from "@/services/novaposhta";
import { useCart } from "react-use-cart";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  API_URL,
  TELEGRAM_API_KEY,
  TELEGRAM_API_URL,
  TELEGRAM_CHAT_ID,
} from "@/config/api";
import Button from "@/components/base/Button";
import axios from "axios";

export default function OrderView({ session }: { session: Session | null }) {
  const { items, cartTotal, emptyCart } = useCart();

  const router = useRouter();

  const [cities, setCities] = useState([]);

  // form inputs
  const [cityInput, setCityInput] = useState("");
  const [warehouseInput, setWarehouseInput] = useState("");

  const getCities = async () => {
    const data = await fetchCities();
    setCities(data);
  };

  useEffect(() => {
    getCities();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      if (items.length === 0) {
        toast.error(
          "Додайте хоча б один товар до кошику, щоб зробити замовлення",
        );
        return;
      }

      if (!cityInput) {
        toast.error("Виберіть місто доставки");
        return;
      } else if (!warehouseInput) {
        toast.error("Виберіть відділення Нової пошти");
        return;
      }

      data.city = cityInput;
      data.warehouse = warehouseInput;
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
        return {
          title: product.title,
          price: product.price,
          quantity: product.quantity,
          totalPrice: product.itemTotal,
          img: product.img,
        };
      });

      axios
        .post(`${TELEGRAM_API_URL}${TELEGRAM_API_KEY}/sendMessage`, {
          chat_id: TELEGRAM_CHAT_ID,
          parse_mode: "html",
          text: `Ім'я: ${
            data.firstName + " " + data.lastName
          }\n\nНомер телефону: ${data.phone}\n\nПошта: ${
            data.email
          }\n\nМісто: ${data.city}\n\nВідділення: ${
            data.warehouse
          }\n\nТовари: \n\n${JSON.stringify(formattedOrderProducts).replaceAll(
            "},",
            "\n\n\n",
          )}`,
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container sx={{ flexGrow: 1 }}>
        <Grid xs={11} marginInline="auto" sm={8} md={4} lg={6}>
          <div className=" mt-5 flex w-full flex-col gap-3 ">
            <div className="text-2xl font-semibold">Оформлення замовлення</div>
            <div className="text-lg font-medium">Ваші контактні дані</div>
            <div className="mb-6 flex max-w-2xl flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phone" value="Ваш номер телефону" />
                </div>
                <TextInput
                  id="phone"
                  type="tel"
                  required
                  shadow
                  {...register("phone", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Ваша пошта (необов`язково)" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder={"name@gmail.com"}
                  shadow
                  {...register("email")}
                />
              </div>
              <div className="flex w-full gap-3">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Ваше ім`я" />
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    required
                    shadow
                    {...register("firstName", {
                      required: true,
                    })}
                  />
                </div>
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="last-name" value="Ваша фамілія" />
                  </div>
                  <TextInput
                    id="last-name"
                    type="text"
                    required
                    shadow
                    {...register("lastName", {
                      required: true,
                    })}
                  />
                </div>
              </div>
              <div className="text-lg font-medium">Доставка Нова пошта</div>
              <CitySelect
                {...{ cityInput, setCityInput, setWarehouseInput, cities }}
              />
              <WarehouseSelect
                {...{ cityInput, warehouseInput, setWarehouseInput }}
              />
            </div>
          </div>
        </Grid>
        <Grid sx={{ width: "100%" }} xs={10} md={7} lg={5}>
          <div className="flex flex-col gap-3 p-5">
            <Card
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: "20.6rem",
                overflowY: "scroll",
              }}
            >
              {items.map((cartProduct: any) => {
                return (
                  <Card
                    key={cartProduct.id}
                    orientation="horizontal"
                    variant="outlined"
                    sx={{ width: "100%", backgroundColor: "white" }}
                  >
                    <div className="ml-3 h-28 w-36">
                      <img
                        className={`h-36 w-full rounded-lg object-contain`}
                        src={cartProduct.img}
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <CardContent>
                      <div className="cursor-pointer font-medium">
                        {cartProduct.title}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-medium text-slate-900 dark:text-white max-sm:text-lg">
                          {/* {cartProduct.product.price} */}
                          {cartProduct.itemTotal}.00 UAH
                        </span>
                      </div>
                      <div>{cartProduct.quantity} шт.</div>
                    </CardContent>
                  </Card>
                );
              })}
            </Card>
            <Card>
              <div className="flex justify-between">
                <div>Вартість замовлення</div>
                <strong>{cartTotal}.00 UAH</strong>
              </div>
              <div className="flex justify-between">
                <div>Доставка нової пошти</div>
                <strong>60.00 UAH</strong>
              </div>
              <Divider />
              <div className="flex justify-between">
                <div>Разом</div>
                <strong>{cartTotal + 60}.00 UAH</strong>
              </div>
            </Card>
          </div>
          <div className="mx-auto mb-5 w-fit">
            <Button title="Замовити" type="submit" />
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
