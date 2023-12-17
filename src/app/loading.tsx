"use client";

import { Spinner } from "flowbite-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loading() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-3 w-fit mx-auto my-20 pb-96 text-4xl font-bold">
          <Spinner size="lg" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
