"use client";

import { Box } from "@mui/joy";
import { Carousel } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function CarouselComponent() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Box className="max-sm:h-36 h-96 xl:h-[35rem]">
          <Carousel>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Giant_Panda_2004-03-2.jpg/1200px-Giant_Panda_2004-03-2.jpg"
              alt="..."
            />

            <img
              src="https://animals.sandiegozoo.org/sites/default/files/2016-08/hero_zebra_animals.jpg"
              alt="..."
            />
            <img
              src="https://assets3.thrillist.com/v1/image/2543699/792x456/scale;webp=auto;jpeg_quality=60;progressive.jpg"
              alt="..."
            />
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/headshot-of-giraffe-sabi-sands-game-reserve-royalty-free-image-1573571300.jpg?crop=1.00xw:0.334xh;0,0.101xh&resize=1200:*"
              alt="..."
            />
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
            <img
              src="https://brovapharma.ua/image/cachewebp/catalog/slider/kardistym_ua-1480x580.webp"
              alt="..."
            />
          </Carousel>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
