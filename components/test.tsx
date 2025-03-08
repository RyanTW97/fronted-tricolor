"use client";
import { motion } from "framer-motion";

export default function TestMotion() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-32 h-32 bg-blue-500"
    >
      Motion Test
    </motion.div>
  );
}
