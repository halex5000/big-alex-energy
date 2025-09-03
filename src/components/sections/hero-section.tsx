"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { AdvancedBadgeCarousel } from "@/components/ui/advanced-badge-carousel";
import { heroData } from "@/data/hero";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {heroData.name}
        </h1>
        <AdvancedBadgeCarousel />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-center space-y-2 text-xl md:text-2xl font-medium text-muted-foreground"
        >
          {heroData.taglines.map((tagline, index) => (
            <p key={index}>{tagline}</p>
          ))}
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center space-y-2 text-muted-foreground"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
