"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LegoAvatarProps {
  src: string;
  alt: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24", 
  lg: "w-32 h-32"
};

export function LegoAvatar({ 
  src, 
  alt, 
  className, 
  size = "md",
  animated = false 
}: LegoAvatarProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg bg-muted/20 border border-border/50",
        sizeClasses[size],
        className
      )}
      initial={animated ? { opacity: 0, scale: 0.8 } : undefined}
      animate={animated ? { opacity: 1, scale: 1 } : undefined}
      transition={animated ? { duration: 0.3, ease: "easeOut" } : undefined}
      whileHover={animated ? { scale: 1.05 } : undefined}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
