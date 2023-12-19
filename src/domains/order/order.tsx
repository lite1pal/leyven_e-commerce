"use client";

import { Session } from "next-auth";
import { FormEvent, useEffect, useState } from "react";
import { Card, CardContent, Divider, FormControl, Grid } from "@mui/joy";
import InputLabel from "@mui/material/InputLabel";
import CitySelect from "@/components/citySelect";
import WarehouseSelect from "@/components/warehouseSelect";
import { Checkbox, Label, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { fetchCities } from "@/services/novaposhta";
import { Formik } from "formik";
import { useCart } from "react-use-cart";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { API_URL } from "@/config/api";
import Button from "@/components/base/Button";

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
          "Додайте хоча б один товар до корзини, щоб зробити замовлення"
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
      data.orderProducts = items;
      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        toast.error(
          "Сталась якась помилка, перезавантажте сторінку та спробуйте ще раз"
        );
        return;
      }

      const parsedRes = await res.json();

      emptyCart();

      router.push(`/order_success/${parsedRes.id}`);
      toast.success("Замовлення успішне!");
    } catch (err) {
      console.error("Failed to create an order");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        <Grid xs={11} marginInline="auto" sm={8} md={4} lg={6}>
          <div className=" flex w-full mt-5 flex-col gap-3">
            <div className="text-2xl font-semibold -ml-1">
              Оформлення замовлення
            </div>
            <div className="text-lg font-medium">Ваші контактні дані</div>
            <div className="flex max-w-2xl flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Ваша пошта" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  placeholder={"name@gmail.com"}
                  required
                  shadow
                  {...register("email", { required: true })}
                />
              </div>
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
              <div className="flex gap-3 w-full">
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
          <div className="flex p-5 flex-col gap-3">
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
                    <div className="h-28 w-36 ml-3">
                      <img
                        className={`w-full h-36 object-contain rounded-lg`}
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
                        <span className="text-2xl max-sm:text-lg font-medium text-gray-900 dark:text-white">
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
          <div className="mx-auto w-fit mb-5">
            <Button title="Замовити" type="submit" />
          </div>
          {/* <Button type="submit" className="mb-5 mx-auto text-xl w-fit">
            Замовити
          </Button> */}
        </Grid>
      </Grid>
    </form>
  );
}
