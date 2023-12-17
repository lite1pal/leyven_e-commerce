"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import { Card, CardContent, Divider, FormControl, Grid } from "@mui/joy";
import InputLabel from "@mui/material/InputLabel";
import CitySelect from "@/components/citySelect";
import WarehouseSelect from "@/components/warehouseSelect";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { fetchCities } from "@/services/novaposhta";
import CardCart from "@/components/cardCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export default function OrderView({
  session,
  cart,
}: {
  session: Session | null;
  cart: any;
}) {
  const [city, setCity] = useState("");
  const router = useRouter();

  const [cities, setCities] = useState([]);

  const getCities = async () => {
    const data = await fetchCities();
    setCities(data);
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <form onSubmit={() => router.push("/order_success")}>
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
                  value={session?.user?.email!}
                  shadow
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phone" value="Ваш номер телефону" />
                </div>
                <TextInput id="phone" type="tel" required shadow />
              </div>
              <div className="flex gap-3 w-full">
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Ваше ім`я" />
                  </div>
                  <TextInput id="name" type="text" required shadow />
                </div>
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="last-name" value="Ваша фамілія" />
                  </div>
                  <TextInput id="last-name" type="text" required shadow />
                </div>
              </div>
              <div className="text-lg font-medium">Доставка</div>
              <CitySelect {...{ city, setCity, cities }} />
              <WarehouseSelect {...{ city }} />
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
              {cart.cartProducts.map((cartProduct: any) => {
                return (
                  <Card
                    key={cartProduct.id}
                    orientation="horizontal"
                    variant="outlined"
                    sx={{ width: "100%", backgroundColor: "white" }}
                  >
                    <div className="h-28 w-36 ml-3">
                      <img
                        className={`w-full h-full object-contain rounded-lg`}
                        src={cartProduct.product.img}
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <CardContent>
                      <div
                        // onClick={() =>
                        //   router.push(`/product/${cartProduct.product.id}`)
                        // }
                        className="cursor-pointer font-medium"
                      >
                        {cartProduct.product.title}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl max-sm:text-lg font-medium text-gray-900 dark:text-white">
                          {/* {cartProduct.product.price} */}
                          {cartProduct.totalPrice}.00 UAH
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
                <strong>{cart.totalPrice}.00 UAH</strong>
              </div>
              <div className="flex justify-between">
                <div>Доставка нової пошти</div>
                <strong>60.00 UAH</strong>
              </div>
              <Divider />
              <div className="flex justify-between">
                <div>Разом</div>
                <strong>{cart.totalPrice + 60}.00 UAH</strong>
              </div>
            </Card>
          </div>
          <Button type="submit" className="mb-5 mx-auto text-xl w-fit">
            Замовити
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
