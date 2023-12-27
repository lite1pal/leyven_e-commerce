"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Contact() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        key={"key"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className={`${
            isHidden
              ? "opacity-0 hidden transform -translate-y-full"
              : "opacity-100 transform translate-y-0"
          } transition duration-300 ease-in-out`}
        >
          +38091230565
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
