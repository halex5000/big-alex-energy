"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CareerHighlight {
  logo: string;
  title: string;
  company: string;
  tagline: string;
  descriptionBullets: string[];
}

const highlights: CareerHighlight[] = [
  {
    logo: "/images/logos/klaviyo-logo.jpeg",
    title: "Head of Experimentation & Optimization",
    company: "Klaviyo",
    tagline: "Built to Scale. Architected to Last.",
    descriptionBullets: [
      "Architected the cross-channel experimentation platform powering 60B+ personalized experiences annually across email, SMS, push, WhatsApp, and onsite.",
      "Engineered a Go-based recipient assignment engine with 40x faster latency, down to single-digit nanoseconds.",
      "Rearchitected core systems to cut overhead, boost resilience, and accelerate velocity."
    ]
  },
  {
    logo: "/images/logos/capitalone-logo.jpeg",
    title: "Senior Engineering Manager",
    company: "Capital One",
    tagline: "Patented Performance at Scale.",
    descriptionBullets: [
      "Led the team behind a patented real-time pricing system serving 50M+ daily comparisons.",
      "Rebuilt hotel data pipeline for 6M properties, delivering 320x faster refreshes and eliminating weekly downtime."
    ]
  },
  {
    logo: "/images/logos/libertymutual-logo.jpeg",
    title: "Platform & Cloud Architect (Director Level)",
    company: "Liberty Mutual",
    tagline: "The Backbone Behind the Business.",
    descriptionBullets: [
      "Architected a serverless, event-driven core for Liberty's specialty insurance platform, integrating no-code underwriting, policy engines, and systems of record through DynamoDB, Lambda, EventBridge, and more.",
      "Led data and integration strategy across multiple squads and cloud services, aligning engineering and product priorities at enterprise scale.",
      "Accelerated adoption org-wide with reusable CDK modules, CLI tools, and secure APIs, reducing onboarding from weeks to days and modernizing testing across delivery pipelines."
    ]
  }
];

export function CareerHighlightsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Career Highlights
          </h2>
          
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Deck Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scrollToCard(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => scrollToCard(Math.min(highlights.length - 1, currentIndex + 1))}
            disabled={currentIndex === highlights.length - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Card Deck */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full max-w-4xl snap-center"
              >
                <Card className="border-2 h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="space-y-6 flex-1">
                      {/* Logo + Title row */}
                      <div className="flex items-center space-x-4">
                        <img
                          src={highlight.logo}
                          alt={`${highlight.company} logo`}
                          className="w-[1.2em] h-[1.2em] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                        <h3 className="text-2xl md:text-3xl font-bold">
                          {highlight.title}
                        </h3>
                      </div>

                      {/* Company with @ symbol */}
                      <p className="text-lg text-muted-foreground">
                        @ {highlight.company}
                      </p>

                      {/* Tagline */}
                      <p className="text-lg font-medium text-primary">
                        {highlight.tagline}
                      </p>

                      {/* Bullet points */}
                      <ul className="space-y-3 flex-1">
                        {highlight.descriptionBullets.map((bullet, bulletIndex) => (
                          <li key={bulletIndex} className="flex items-start space-x-3">
                            <span className="text-muted-foreground mt-2 flex-shrink-0">•</span>
                            <span className="text-muted-foreground leading-relaxed">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="text-center mt-6 md:hidden">
          <p className="text-sm text-muted-foreground">
            ← Swipe to explore →
          </p>
        </div>
      </div>
    </section>
  );
}