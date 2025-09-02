"use client";

import { AdvancedBadgeCarousel } from "@/components/ui/advanced-badge-carousel";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Alex Hardman
        </h1>
        <AdvancedBadgeCarousel />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-center space-y-2 text-xl md:text-2xl font-medium text-muted-foreground"
        >
          <p>Building with purpose.</p>
          <p>Leading with trust.</p>
          <p>Scaling with intention.</p>
        </motion.div>
      </div>
    </section>
  );
}
