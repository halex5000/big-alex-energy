"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const badges = [
  "🧠 Engineering Leader",
  "🧱 Infra Architect", 
  "🏆 Hackathon Champ",
  "📝 Patent Holder",
  "📈 Experimentation Powerhouse",
  "🤓 Optimization Nerd",
  "⚡ Startup Speed × 🏢 Enterprise Scale"
];

export function BadgeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % badges.length);
    }, 2500); // Rotate every 2.5 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="flex justify-center items-center min-h-[3rem]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ 
            duration: 0.4,
            ease: "easeInOut"
          }}
          className="text-lg md:text-xl font-medium text-muted-foreground text-center px-4 py-2 rounded-full bg-muted/50 border border-border/50 backdrop-blur-sm"
        >
          {badges[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
