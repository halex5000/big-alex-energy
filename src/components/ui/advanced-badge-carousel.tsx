"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const badges = [
  "🧠 Engineering Leader",
  "🧱 Infra Architect", 
  "🏆 Hackathon Champ",
  "📝 Patent Holder",
  "🤓 Optimization Nerd",
  "⚡ Startup Speed × 🏢 Enterprise Scale"
];

export function AdvancedBadgeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return; // Pause on hover
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % badges.length);
    }, 2200); // Rotate every 2.2 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div 
      className="flex justify-center items-center min-h-[4rem] relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -30, rotateX: -90 }}
            transition={{ 
              duration: 0.6,
              ease: "easeInOut"
            }}
            className="text-lg md:text-xl font-medium text-muted-foreground text-center px-6 py-3 rounded-full bg-gradient-to-r from-muted/30 to-muted/60 border border-border/50 backdrop-blur-sm shadow-lg"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {badges[currentIndex]}
            </motion.span>
          </motion.div>
        </AnimatePresence>
        
        {/* Subtle glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/10 blur-xl"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
