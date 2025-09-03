"use client";

import { useState } from "react";
import { careerHighlights } from "@/data/career-highlights";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/external-link";
import Image from "next/image";
import { getIconForCard, getLinkIcon } from "@/lib/career-icons";
import { CareerHighlightModal } from "@/components/ui/career-highlight-modal";

export function CareerHighlightsSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
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

        {/* Responsive Card Layout */}
        <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 md:gap-6 pb-4 items-stretch" 
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          {careerHighlights.map((highlight, index) => (
            <div key={index} className="flex-shrink-0 w-80 md:w-full md:max-w-4xl snap-center flex">
              <Card
                onClick={() => window.innerWidth < 768 ? handleCardClick(index) : undefined}
                className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer md:cursor-default hover:border-primary/50 md:hover:border-border min-h-[60vh] md:min-h-[70vh] lg:min-h-[65vh] xl:min-h-[60vh] flex-1"
              >
                <CardContent className="p-4 md:p-6 lg:p-8 h-full flex flex-col">
                  <div className="space-y-3 md:space-y-4 lg:space-y-6 flex-1">
                    {/* Logo + Title row */}
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <Image
                        src={highlight.logo}
                        alt={`${highlight.company} logo`}
                        width={32}
                        height={32}
                        className="w-6 h-6 md:w-8 md:h-8 lg:w-[1.2em] lg:h-[1.2em] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                      <h3 className="text-base md:text-lg lg:text-2xl xl:text-3xl font-bold text-foreground leading-tight">
                        {highlight.title}
                      </h3>
                    </div>
                    
                    {/* Company + Tagline */}
                    <div className="space-y-1 md:space-y-2">
                      <p className="text-sm md:text-base lg:text-lg font-medium text-muted-foreground">
                        @ {highlight.company}
                      </p>
                      <p className="text-sm md:text-base lg:text-lg text-muted-foreground leading-relaxed">
                        {highlight.tagline}
                      </p>
                    </div>

                    {/* Description Bullets - Responsive truncation */}
                    <div className="space-y-2 md:space-y-3 lg:space-y-4">
                      {highlight.descriptionBullets.map((bullet, bulletIndex) => {
                        const IconComponent = getIconForCard(highlight.title, bulletIndex);
                        return (
                          <div key={bulletIndex} className="group relative">
                            <div className="flex items-start space-x-2 md:space-x-3 p-1 md:p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
                              <IconComponent className="inline w-3 h-3 md:w-4 md:h-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                              <p className="text-xs md:text-sm lg:text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                                {bullet}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Links Section - Responsive sizing */}
                  <div className="mt-auto pt-4 md:pt-6 border-t border-border min-h-[60px] md:min-h-[80px] flex flex-col justify-center">
                    {highlight.links && highlight.links.length > 0 ? (
                      <div className="flex gap-2 md:gap-3 lg:gap-4 justify-center items-center w-full">
                        {highlight.links.map((link, linkIndex) => (
                          <div
                            key={linkIndex}
                            className="flex-1 h-10 md:h-12 lg:h-14 p-2 md:p-3 lg:p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 flex items-center justify-center"
                          >
                            <ExternalLink
                              href={link.url}
                              className="text-xs md:text-sm lg:text-base flex items-center justify-center w-full h-full"
                            >
                              {getLinkIcon(link.icon)}
                              <span className="ml-1 md:ml-2 lg:ml-3 text-center font-medium">{link.label}</span>
                            </ExternalLink>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <div className="text-xs md:text-sm text-muted-foreground/50 italic">No additional resources</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
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