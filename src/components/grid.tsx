"use client";

import { Grid } from "@mui/joy";
import Card from "./card";
import { useEffect, useState } from "react";
import { API_URL } from "@/config/api";

export default function GridComponent({ data, session }: any) {
  const [cart, setCart] = useState({ cartProducts: [] });

  const [openModal, setOpenModal] = useState(false);

  const getCart = async () => {
    const res = await fetch(`${API_URL}/cart?email=${session.user.email}`);
    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    getCart();
  }, [openModal]);
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3.5 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ flexGrow: 1 }}
      marginBottom={"2.5rem"}
      marginX={"1rem"}
      padding={"0"}
    >
      {data?.map((product: any, i: number) => {
        return (
          <Grid key={i} xs={4} sm={4} lg={3}>
            <Card
              data={product}
              session={session}
              cart={cart}
              openModal={openModal}
              setOpenModal={setOpenModal}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
