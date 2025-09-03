"use client";

import { useState, useEffect } from "react";
import { heroBadges } from "@/data/hero-badges";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

export function AdvancedBadgeCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || !api) return; // Pause on hover
    
    const interval = setInterval(() => {
      api.scrollNext();
    }, 2200); // Rotate every 2.2 seconds

    return () => clearInterval(interval);
  }, [isHovered, api]);



  return (
    <div 
      className="flex justify-center items-center min-h-[4rem] relative py-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <Carousel
          setApi={setApi}
          className="w-full max-w-md"
          orientation="vertical"
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent className="-mt-1 h-[4rem]">
            {heroBadges.map((badge, index) => (
              <CarouselItem key={index} className="pt-1 basis-full">
                <div className="p-1">
                  <div className="text-lg md:text-xl font-medium text-muted-foreground text-center px-6 py-3 rounded-full bg-gradient-to-r from-muted/30 to-muted/60 border border-border/50 backdrop-blur-sm shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 h-full flex items-center justify-center">
                    {badge}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="size-6 -right-4 opacity-0 hover:opacity-100 transition-opacity duration-200" />
        </Carousel>
      </div>
    </div>
  );
}
