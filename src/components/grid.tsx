"use client";

import { AspectRatio, Box, Card, Grid, Skeleton } from "@mui/joy";
import CardComponent from "./card";
import { useEffect, useState } from "react";
import { API_URL } from "@/config/api";
import Meta from "./meta";
import _ from "lodash";
import { CartProvider } from "react-use-cart";
import { useInView } from "react-intersection-observer";
import { Spinner } from "flowbite-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function GridComponent({ data }: any) {
  const [openModal, setOpenModal] = useState(false);

  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data]);

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 2 }}
      // columns={{ xs: 4, sm: 8, md: 14, lg: 15 }}
      sx={{
        flexGrow: 1,
        height: "fit-content",
      }}
      marginBottom={"2.5rem"}
      marginX={"0.5rem"}
      padding={"0"}
    >
      <AnimatePresence>
        {data?.map((product: any, i: number) => {
          return (
            <Grid key={i} xs={12} sm={6} md={4} lg={2}>
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {loading ? (
                  <Card sx={{ height: "12rem" }}>
                    <AspectRatio variant="plain">
                      <Skeleton loading={loading}>
                        <img
                          src={
                            "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                          }
                          alt=""
                        />
                      </Skeleton>
                    </AspectRatio>
                  </Card>
                ) : (
                  <CardComponent
                    data={product}
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                  />
                )}
              </motion.div>
            </Grid>
          );
        })}
      </AnimatePresence>
    </Grid>
  );
}
