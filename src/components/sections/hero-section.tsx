"use client";

import { AdvancedBadgeCarousel } from "@/components/ui/advanced-badge-carousel";
import { ScrollIndicator } from "@/components/ui/scroll-indicator";
import { HeroTaglines } from "@/components/ui/hero-taglines";
import { heroData } from "@/data/hero";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          {heroData.name}
        </h1>
        <AdvancedBadgeCarousel />
        <HeroTaglines taglines={heroData.taglines} />
      </div>
      <ScrollIndicator />
    </section>
  );
}
