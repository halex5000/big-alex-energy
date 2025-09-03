"use client";

import { motion } from "framer-motion";

interface HeroTaglinesProps {
  taglines: string[];
}

export function HeroTaglines({ taglines }: HeroTaglinesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="mt-6 text-center space-y-2 text-xl md:text-2xl font-medium text-muted-foreground"
    >
      {taglines.map((tagline, index) => (
        <p key={index}>{tagline}</p>
      ))}
    </motion.div>
  );
}
