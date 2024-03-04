"use client";

import { Grid } from "@mui/joy";
import CardComponent from "../cards/card";
import { AnimatePresence } from "framer-motion";
import { type Product } from "@/types";

export default function GridComponent({ data }: { data: Product[] }) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      sx={{ flexGrow: 1, height: "fit-content" }}
      marginBottom="2.5rem"
      marginX="0.5rem"
      padding="0"
    >
      <AnimatePresence>
        {data?.map((product) => (
          <Grid key={product.id} xs={6} sm={6} md={4} lg={3} xl={2}>
            <CardComponent data={product} />
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
}
