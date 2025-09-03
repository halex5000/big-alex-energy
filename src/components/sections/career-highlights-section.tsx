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

        {/* Responsive Layout: Grid on mobile, horizontal scroll on desktop */}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {/* Mobile: Grid layout */}
          {careerHighlights.map((highlight, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(index)}
              className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary/50 min-h-[65vh]"
            >
              <CardContent className="p-4 h-full flex flex-col">
                <div className="space-y-3 flex-1">
                  {/* Logo + Title row */}
                  <div className="flex items-center space-x-3">
                    <Image
                      src={highlight.logo}
                      alt={`${highlight.company} logo`}
                      width={32}
                      height={32}
                      className="w-6 h-6 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <h3 className="text-base font-bold text-foreground leading-tight">
                      {highlight.title}
                    </h3>
                  </div>
                  
                  {/* Company + Tagline */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      @ {highlight.company}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {highlight.tagline}
                    </p>
                  </div>

                  {/* Description Bullets */}
                  <div className="space-y-2">
                    {highlight.descriptionBullets.map((bullet, bulletIndex) => {
                      const IconComponent = getIconForCard(highlight.title, bulletIndex);
                      return (
                        <div key={bulletIndex} className="group relative">
                          <div className="flex items-start space-x-2 p-1 rounded-lg hover:bg-muted/50 transition-all duration-200">
                            <IconComponent className="inline w-3 h-3 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                            <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                              {bullet}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Links Section */}
                <div className="mt-auto pt-4 border-t border-border min-h-[60px] flex flex-col justify-center">
                  {highlight.links && highlight.links.length > 0 ? (
                    <div className="flex gap-2 justify-center items-center w-full">
                      {highlight.links.map((link, linkIndex) => (
                        <div
                          key={linkIndex}
                          className="flex-1 h-10 p-2 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 flex items-center justify-center"
                        >
                          <ExternalLink
                            href={link.url}
                            className="text-xs flex items-center justify-center w-full h-full"
                          >
                            {getLinkIcon(link.icon)}
                            <span className="ml-1 text-center font-medium">{link.label}</span>
                          </ExternalLink>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-full">
                      <div className="text-xs text-muted-foreground/50 italic">No additional resources</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop: Horizontal scrolling carousel */}
        <div className="hidden md:flex overflow-x-auto scrollbar-hide gap-6 pb-4 items-stretch">
          {careerHighlights.map((highlight, index) => (
            <div key={index} className="flex-shrink-0 w-96 lg:w-[28rem] xl:w-[32rem]">
              <Card
                className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 min-h-[70vh] lg:min-h-[65vh] xl:min-h-[60vh] h-full"
            >
                <CardContent className="p-6 lg:p-8 h-full flex flex-col">
                  <div className="space-y-4 lg:space-y-6 flex-1">
                    {/* Logo + Title row */}
                    <div className="flex items-center space-x-4">
                      <Image
                        src={highlight.logo}
                        alt={`${highlight.company} logo`}
                        width={32}
                        height={32}
                        className="w-8 h-8 lg:w-[1.2em] lg:h-[1.2em] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                      <h3 className="text-lg lg:text-2xl xl:text-3xl font-bold text-foreground leading-tight">
                        {highlight.title}
                      </h3>
                    </div>
                    
                    {/* Company + Tagline */}
                    <div className="space-y-2">
                      <p className="text-base lg:text-lg font-medium text-muted-foreground">
                        @ {highlight.company}
                      </p>
                      <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                        {highlight.tagline}
                      </p>
                    </div>

                    {/* Description Bullets */}
                    <div className="space-y-3 lg:space-y-4">
                      {highlight.descriptionBullets.map((bullet, bulletIndex) => {
                        const IconComponent = getIconForCard(highlight.title, bulletIndex);
                        return (
                          <div key={bulletIndex} className="group relative">
                            <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
                              <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                                {bullet}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Links Section */}
                  <div className="mt-auto pt-6 border-t border-border min-h-[80px] flex flex-col justify-center">
                    {highlight.links && highlight.links.length > 0 ? (
                      <div className="flex gap-3 lg:gap-4 justify-center items-center w-full">
                        {highlight.links.map((link, linkIndex) => (
                          <div
                            key={linkIndex}
                            className="flex-1 h-12 lg:h-14 p-3 lg:p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 flex items-center justify-center"
                          >
                            <ExternalLink
                              href={link.url}
                              className="text-sm lg:text-base flex items-center justify-center w-full h-full"
                            >
                              {getLinkIcon(link.icon)}
                              <span className="ml-2 lg:ml-3 text-center font-medium">{link.label}</span>
                            </ExternalLink>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex justify-center items-center h-full">
                        <div className="text-sm text-muted-foreground/50 italic">No additional resources</div>
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