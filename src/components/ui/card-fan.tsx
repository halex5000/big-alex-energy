'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface CardFanProps {
  heroImage: string;
  logos: string[];
  alt: string;
  gradient?: string;
  className?: string;
  isHovered: boolean;
  useObjectContain?: boolean;
}

export function CardFan({
  heroImage,
  logos,
  alt,
  gradient,
  className = '',
  isHovered,
  useObjectContain = false,
}: CardFanProps) {
  return (
    <div className={`relative h-32 overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        {!isHovered ? (
          // Hero Image State
          <motion.div
            key="hero"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={heroImage}
              alt={alt}
              fill
              className={`group-hover:scale-105 transition-transform duration-300 ${useObjectContain ? 'object-contain p-4' : 'object-cover'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {gradient && (
              <div
                className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
              />
            )}
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        ) : (
          // Fanned Logos State
          <motion.div
            key="fanned"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full flex items-center justify-center"
          >
            {logos.map((logo, index) => {
              const totalLogos = logos.length;
              const angle = (index - (totalLogos - 1) / 2) * 50; // MAXIMUM FAN SPREAD! 🃏
              const translateX = (index - (totalLogos - 1) / 2) * 66.125; // Another 15% more horizontal spread! 🎸
              const zIndex = totalLogos - index; // Stacking order

              return (
                <motion.div
                  key={logo}
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: 0,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 0.75,
                    rotate: angle,
                    x: translateX,
                    y: -10,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: 0,
                    x: 0,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                  className="absolute w-full h-full rounded-lg overflow-hidden shadow-lg"
                  style={{ zIndex }}
                >
                  <Image
                    src={logo}
                    alt={`${alt} logo`}
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
