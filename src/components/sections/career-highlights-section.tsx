'use client';

import { useState } from 'react';
import { careerHighlights } from '@/data/career-highlights';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from '@/components/ui/external-link';
import Image from 'next/image';
import { getIconForCard, getLinkIcon } from '@/lib/career-icons';
import { CareerHighlightModal } from '@/components/ui/career-highlight-modal';
import { trackCareerHighlightClick } from '@/lib/analytics';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function CareerHighlightsSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    const highlight = careerHighlights[index];
    trackCareerHighlightClick(highlight.title);
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
              className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary/50 h-full flex flex-col overflow-hidden"
            >
              {/* Hero Image Section */}
              {highlight.heroImage && (
                <div className="relative h-32 overflow-hidden">
                  {highlight.heroBackgroundColor && (
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: highlight.heroBackgroundColor }}
                    />
                  )}
                  <Image
                    src={highlight.heroImage}
                    alt={`${highlight.title} hero image`}
                    fill
                    className={`object-contain ${highlight.heroPadding || 'p-6'}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <CardContent className="p-4 flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground leading-tight">
                    {highlight.title}
                  </h3>

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
                      const IconComponent = getIconForCard(
                        highlight.title,
                        bulletIndex
                      );
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

                {/* Links Section - OUTSIDE the flex-1 div so it's always at bottom */}
                <div className="pt-4 border-t border-border">
                  {highlight.links && highlight.links.length > 0 ? (
                    <div className="flex gap-2 justify-center">
                      {highlight.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center gap-2"
                        >
                          {getLinkIcon(link.icon)}
                          {link.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      <div className="text-xs text-muted-foreground/50 italic">
                        No additional resources
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Desktop: Horizontal scrolling carousel */}
        <div className="hidden md:block">
          <Carousel
            className="w-full max-w-2xl mx-auto"
            opts={{
              align: 'start',
              loop: false,
            }}
          >
            <CarouselContent className="-ml-6">
              {careerHighlights.map((highlight, index) => (
                <CarouselItem key={index} className="pl-6 basis-full">
                  <Card className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 h-full flex flex-col overflow-hidden">
                    {/* Hero Image Section */}
                    {highlight.heroImage && (
                      <div className="relative h-32 overflow-hidden">
                        {highlight.heroBackgroundColor && (
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundColor: highlight.heroBackgroundColor,
                            }}
                          />
                        )}
                        <Image
                          src={highlight.heroImage}
                          alt={`${highlight.title} hero image`}
                          fill
                          className={`object-contain ${highlight.heroPadding || 'p-6'}`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <CardContent className="p-6 lg:p-8 flex-1 flex flex-col">
                      <div className="space-y-4 lg:space-y-6 flex-1">
                        {/* Title */}
                        <h3 className="text-sm lg:text-lg xl:text-xl font-bold text-foreground leading-tight">
                          {highlight.title}
                        </h3>

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
                          {highlight.descriptionBullets.map(
                            (bullet, bulletIndex) => {
                              const IconComponent = getIconForCard(
                                highlight.title,
                                bulletIndex
                              );
                              return (
                                <div
                                  key={bulletIndex}
                                  className="group relative"
                                >
                                  <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
                                    <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                                      {bullet}
                                    </p>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>

                      {/* Links Section */}
                      <div className="pt-6 border-t border-border">
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
                                  <span className="ml-2 lg:ml-3 text-center font-medium">
                                    {link.label}
                                  </span>
                                </ExternalLink>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex justify-center items-center h-full">
                            <div className="text-sm text-muted-foreground/50 italic">
                              No additional resources
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
