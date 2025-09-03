"use client";

import { useState } from "react";
import { careerHighlights } from "@/data/career-highlights";
import { CareerHighlightCard } from "@/components/ui/career-highlight-card";
import { CareerHighlightCardDesktop } from "@/components/ui/career-highlight-card-desktop";
import { CareerHighlightModal } from "@/components/ui/career-highlight-modal";





export function CareerHighlightsSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    // Only expand on mobile (screen width < 768px)
    if (window.innerWidth < 768) {
      setExpandedCard(expandedCard === index ? null : index);
    }
  };

  const closeExpandedCard = () => {
    setExpandedCard(null);
  };

  return (
    <section className="px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
            Career Highlights
          </h2>
        </div>

        {/* Mobile: Horizontal Swipe */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {careerHighlights.map((highlight, index) => (
              <div key={index} className="flex-shrink-0 w-80 snap-center">
                <CareerHighlightCard
                  highlight={highlight}
                  index={index}
                  onCardClick={handleCardClick}
                  isMobile={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Horizontal Scrolling Carousel */}
        <div className="hidden md:block">
          <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4 items-stretch" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {careerHighlights.map((highlight, index) => (
              <div key={index} className="flex-shrink-0 w-full max-w-4xl flex snap-center">
                <CareerHighlightCardDesktop
                  highlight={highlight}
                  index={index}
                  onCardClick={handleCardClick}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Expanded Card Modal */}
      {expandedCard !== null && (
        <CareerHighlightModal
          highlight={careerHighlights[expandedCard]}
          isOpen={true}
          onClose={closeExpandedCard}
        />
      )}
    </section>
  );
}
