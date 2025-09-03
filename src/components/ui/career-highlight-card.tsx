"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/external-link";
import Image from "next/image";
import { getIconForCard, getLinkIcon } from "@/lib/career-icons";
import { type CareerHighlight } from "@/data/career-highlights";

interface CareerHighlightCardProps {
  highlight: CareerHighlight;
  index: number;
  onCardClick?: (index: number) => void;
  isMobile?: boolean;
}

export function CareerHighlightCard({ 
  highlight, 
  index, 
  onCardClick,
  isMobile = false 
}: CareerHighlightCardProps) {
  const handleClick = () => {
    if (onCardClick) {
      onCardClick(index);
    }
  };

  return (
    <Card
      onClick={handleClick}
      className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary/50 h-[60vh]"
    >
      <CardContent className="p-6 h-full flex flex-col">
        <div className="space-y-4 flex-1">
          {/* Logo + Title row */}
          <div className="flex items-center space-x-3">
            <Image
              src={highlight.logo}
              alt={`${highlight.company} logo`}
              width={32}
              height={32}
              className="w-8 h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
            <h3 className="text-lg font-bold text-foreground leading-tight">
              {highlight.title}
            </h3>
          </div>
          
          {/* Company + Tagline */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              {highlight.company}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {highlight.tagline}
            </p>
          </div>

          {/* Description Bullets - Show first 2 on mobile */}
          <div className="space-y-3">
            {highlight.descriptionBullets.slice(0, isMobile ? 2 : highlight.descriptionBullets.length).map((bullet, bulletIndex) => {
              const IconComponent = getIconForCard(highlight.title, bulletIndex);
              return (
                <div key={bulletIndex} className="group relative">
                  <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
                    <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                    <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                      {bullet}
                    </p>
                  </div>
                </div>
              );
            })}
            {isMobile && highlight.descriptionBullets.length > 2 && (
              <p className="text-xs text-muted-foreground italic">
                +{highlight.descriptionBullets.length - 2} more details
              </p>
            )}
          </div>
        </div>

        {/* Links Section - Always show HR, content if links exist */}
        <div className="mt-auto pt-6 border-t border-border h-[80px] flex flex-col justify-center">
          {highlight.links && highlight.links.length > 0 ? (
            <div className="flex gap-3 justify-center items-center w-full">
              {highlight.links.map((link, linkIndex) => (
                <div
                  key={linkIndex}
                  className="flex-1 h-12 p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 flex items-center justify-center"
                >
                  <ExternalLink
                    href={link.url}
                    className="text-sm flex items-center justify-center w-full h-full"
                  >
                    {getLinkIcon(link.icon)}
                    <span className="ml-2 text-center">{link.label}</span>
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
  );
}
