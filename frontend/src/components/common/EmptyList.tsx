"use client";

import { motion } from "framer-motion";
import { FolderOpen } from "lucide-react";

type Props = {
  type: string;
};

export default function EmptyList({ type }: Props) {
  return (
    <section className="relative flex flex-col items-center justify-center gap-4 text-center border-2 border-neutral-200 p-10 rounded-xl h-[calc(100vh-400px)]">
      <motion.header
        className="flex flex-col gap-4 justify-center items-center z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <FolderOpen size={40} className="text-primary animate-pulse" />
        <h2 className="text-2xl font-bold z-10">No {type} found.</h2>
      </motion.header>
      <motion.div
        className="text-sm text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <p className="text-sm text-neutral-500">
          No items have been added yet.
        </p>
      </motion.div>
    </section>
  );
}
