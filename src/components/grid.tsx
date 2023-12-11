"use client";

import { Grid } from "@mui/joy";
import Card from "./card";
import { useEffect, useState } from "react";
import { API_URL } from "@/config/api";
import Meta from "./meta";
import { getWarehouses } from "@/services/novaposhta";

export default function GridComponent({ data, session }: any) {
  const [cart, setCart] = useState({ cartProducts: [] });

  const [openModal, setOpenModal] = useState(false);

  const getCart = async () => {
    const res = await fetch("https://api.novaposhta.ua/v2.0/json", {
      method: "POST",
      body: JSON.stringify({
        apiKey: "e6cdb1e9e29b8014778e8ad687ac414d",
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: { CityName: "київ", Limit: "50", Page: "2" },
      }),
    });
    const data = await res.json();
    console.log(data);
    if (session) {
      const res = await fetch(`${API_URL}/cart?email=${session.user.email}`);
      const data = await res.json();
      setCart(data);
    }
  };

  useEffect(() => {
    // if (openModal) {
    getCart();
    // }
  }, [openModal]);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ flexGrow: 1 }}
      marginBottom={"2.5rem"}
      marginX={"0.5rem"}
      padding={"0"}
    >
      {data?.map((product: any, i: number) => {
        return (
          <Grid key={i} xs={4} sm={4} md={4} lg={4}>
            <Card
              data={product}
              session={session}
              cart={cart}
              getCart={getCart}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
