"use client";

import { Grid } from "@mui/joy";
import Card from "./card";
import { useEffect, useState } from "react";
import { API_URL } from "@/config/api";
import Meta from "./meta";
import _ from "lodash";

export default function GridComponent({ data, session }: any) {
  const [cart, setCart] = useState({ cartProducts: [] });

  const [openModal, setOpenModal] = useState(false);

  const getCart = async () => {
    if (session) {
      const res = await fetch(`${API_URL}/cart?email=${session.user.email}`);
      const data = await res.json();
      console.log(data);
      setCart(data);
    }
  };

  useEffect(() => {
    // if (openModal) {

    getCart();
    // fetchWarehouses();
    // }
  }, [openModal]);

  useEffect(() => {
    /*
    Query logic
    */
    console.log("i fire once");
  }, []);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      // columns={{ xs: 4, sm: 8, md: 14, lg: 15 }}
      sx={{ flexGrow: 1 }}
      marginBottom={"2.5rem"}
      marginX={"0.5rem"}
      padding={"0"}
    >
      {data?.map((product: any, i: number) => {
        return (
          <Grid key={i} xs={12} sm={6} md={4} lg={2}>
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
