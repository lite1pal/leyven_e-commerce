"use client";

import { AnimatePresence, motion } from "framer-motion";
import Catalog from "../../domains/catalog/catalog";
import CarouselComponent from "@/components/carousel";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathName = usePathname();
  return (
    <main className={`max-w-screen min-h-screen`}>
      <AnimatePresence>
        <motion.div
          key={pathName}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{ duration: 0.75 }}
          variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {
              opacity: 1,
            },
            exitState: {},
          }}
        >
          <CarouselComponent />
          <Catalog />
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
