"use client";

import { ExternalLink } from "@/components/ui/external-link";
import Image from "next/image";
import { getIconForCard, getLinkIcon } from "@/lib/career-icons";
import { type CareerHighlight } from "@/data/career-highlights";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CareerHighlightModalProps {
  highlight: CareerHighlight;
  isOpen: boolean;
  onClose: () => void;
}

export function CareerHighlightModal({ 
  highlight, 
  isOpen, 
  onClose 
}: CareerHighlightModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto md:hidden">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Career Highlight</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Logo + Title row */}
          <div className="flex items-center space-x-3">
            <Image
              src={highlight.logo}
              alt={`${highlight.company} logo`}
              width={32}
              height={32}
              className="w-8 h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
            />
            <h3 className="text-xl font-bold text-foreground leading-tight">
              {highlight.title}
            </h3>
          </div>
          
          {/* Company + Tagline */}
          <div className="space-y-2">
            <p className="text-base font-medium text-muted-foreground">
              {highlight.company}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              {highlight.tagline}
            </p>
          </div>

          {/* Description Bullets */}
          <div className="space-y-4">
            {highlight.descriptionBullets.map((bullet, bulletIndex) => {
              const IconComponent = getIconForCard(highlight.title, bulletIndex);
              return (
                <div key={bulletIndex} className="flex items-start space-x-3 p-2 rounded-lg">
                  <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {bullet}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Links Section */}
          <div className="mt-6 pt-6 border-t border-border h-[80px] flex flex-col justify-center">
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
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
