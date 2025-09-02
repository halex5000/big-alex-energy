"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LegoAvatar } from "@/components/ui/lego-avatar";
import { useState } from "react";
import { X } from "lucide-react";

const collectibleAvatars = [
  {
    src: "/images/avatars/steak-alex.jpeg",
    alt: "Chef Alex",
    title: "🥩 Chef Alex",
    tagline: "Slow is smooth.\nSmooth is fast."
  },
  {
    src: "/images/avatars/office-alex.jpeg", 
    alt: "Office Alex",
    title: "👨‍💻 Office Alex",
    tagline: "Lead with clarity.\nBuild with care.\nEmpower without ego."
  },
  {
    src: "/images/avatars/bartender-alex.png",
    alt: "Mixologist Alex", 
    title: "🍸 Mixologist Alex",
    tagline: "Shaking cocktails and debugging prod.\n(Not in that order.)"
  }
];

export function AvatarCardsSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setExpandedCard(index);
  };

  const closeExpandedCard = () => {
    setExpandedCard(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
        {collectibleAvatars.map((avatar, index) => (
          <Card
            key={index}
            onClick={() => handleCardClick(index)}
            className="group cursor-pointer border-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:rotate-1"
          >
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <LegoAvatar
                  src={avatar.src}
                  alt={avatar.alt}
                  size="lg"
                  className="mx-auto group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                {avatar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {avatar.tagline}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Expanded Card Modal */}
      {expandedCard !== null && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeExpandedCard}
        >
          <div 
            className="bg-background border-2 border-primary/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 text-center">
              <button
                onClick={closeExpandedCard}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="mb-8">
                <LegoAvatar
                  src={collectibleAvatars[expandedCard].src}
                  alt={collectibleAvatars[expandedCard].alt}
                  size="xl"
                  className="mx-auto mb-6"
                />
              </div>
              
              <h2 className="text-3xl font-bold mb-6 text-primary">
                {collectibleAvatars[expandedCard].title}
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
                {collectibleAvatars[expandedCard].tagline}
              </p>

              {/* Additional expanded content could go here */}
              <div className="text-sm text-muted-foreground">
                <p>Click anywhere outside to close</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
