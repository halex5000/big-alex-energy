"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/external-link";
import Image from "next/image";
import { getIconForCard, getLinkIcon } from "@/lib/career-icons";
import { type CareerHighlight } from "@/data/career-highlights";

interface CareerHighlightCardDesktopProps {
  highlight: CareerHighlight;
  index: number;
  onCardClick?: (index: number) => void;
}

export function CareerHighlightCardDesktop({ 
  highlight, 
  index, 
  onCardClick 
}: CareerHighlightCardDesktopProps) {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(index);
    }
  };

  return (
    <Card 
      onClick={handleClick}
      className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 flex-1"
    >
      <CardContent className="p-8 h-full flex flex-col">
        <div className="space-y-6 flex-1">
          {/* Logo + Title row */}
          <div className="flex items-center space-x-4">
            <Image
              src={highlight.logo}
              alt={`${highlight.company} logo`}
              width={48}
              height={48}
              className="w-[1.2em] h-[1.2em] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
            <h3 className="text-2xl lg:text-3xl font-bold">
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

          {/* Description blocks - ALL bullets */}
          <div className="space-y-4 flex-1">
            {highlight.descriptionBullets.map((bullet, bulletIndex) => {
              const IconComponent = getIconForCard(highlight.title, bulletIndex);
              
              return (
                <div key={bulletIndex} className="group relative">
                  <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
                    <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                    <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                      {bullet}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Links Section - Always show HR, content if links exist */}
        <div className="mt-auto pt-6 border-t border-border h-[80px] flex flex-col justify-center">
          {highlight.links && highlight.links.length > 0 ? (
            <div className="flex gap-4 justify-center items-center w-full">
              {highlight.links.map((link, linkIndex) => (
                <div
                  key={linkIndex}
                  className="flex-1 h-14 p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 flex items-center justify-center"
                >
                  <ExternalLink
                    href={link.url}
                    className="text-base flex items-center justify-center w-full h-full"
                  >
                    {getLinkIcon(link.icon)}
                    <span className="ml-3 text-center font-medium">{link.label}</span>
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
  );
}
