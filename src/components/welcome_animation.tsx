"use client";

import { motion } from "framer-motion";

export default function WaterPulse() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-cyan-400"
          style={{
            width: 40,
            height: 40,
          }}
          initial={{
            scale: 1,
            opacity: 0.8,
          }}
          animate={{
            scale: 4,
            opacity: 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
