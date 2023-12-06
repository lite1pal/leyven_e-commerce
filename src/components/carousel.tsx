"use client";

import { Box } from "@mui/joy";
import { Carousel } from "flowbite-react";

export default function CarouselComponent() {
  return (
    <Box className="h-56 sm:h-64 xl:h-[35rem]">
      <Carousel>
        <img
          src="https://brovapharma.ua/image/cachewebp/catalog/slider/deksmedison-ua-1480x580.webp"
          alt="..."
        />
        <img
          src="https://brovapharma.ua/image/cachewebp/catalog/slider/nivomit-ua-1480x580.webp"
          alt="..."
        />
        <img
          src="https://brovapharma.ua/image/cachewebp/catalog/slider/galmolakt-ua_2023-1480x580.webp"
          alt="..."
        />
      </Carousel>
    </Box>
  );
}
