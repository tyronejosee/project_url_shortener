"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

type Props = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <section className="absolute inset-0 flex flex-col items-center justify-center min-h-screen">
      <motion.header
        className="max-w-screen-md flex flex-col justify-center items-center gap-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h1 className="text-7xl font-bold text-primary mb-4">500</h1>
        <p>{error.message}</p>
        <Button onPress={() => reset()} size="lg" color="primary">
          Retry
        </Button>
      </motion.header>
    </section>
  );
}
