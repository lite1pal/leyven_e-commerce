"use client";

import { Box } from "@mui/joy";
import { Carousel } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";

export default function CarouselComponent() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <Box
          sx={{ maxHeight: "27rem" }}
          className="h-[9rem] sm:h-[15rem] xl:h-[30rem]"
        >
          <Carousel>
            <img
              src="https://www.zoetis.com.ua/uk/_locale-assets/3.simparika_ukr_banner.jpg"
              alt="..."
            />
            <img
              src="https://masterzoo.ua/content/uploads/images/top10-korm-koty-masterzoo-ua.jpg"
              alt="..."
            />
            <img
              src="https://pets.ua/images/slider-upper/small/1bc2e897a14217d01017461231c17b26.jpg"
              alt="..."
            />
            <img
              src="https://luposan.com.ua/content/images/2/1440x432e90nn0/94462668873712.jpg"
              alt="..."
            />
          </Carousel>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}
