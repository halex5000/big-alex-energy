"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LegoAvatar } from "@/components/ui/lego-avatar";
import { type Avatar } from "@/data/avatars";

interface AvatarCardProps {
  avatar: Avatar;
  index: number;
  onCardClick: (index: number) => void;
}

export function AvatarCard({ avatar, index, onCardClick }: AvatarCardProps) {
  const handleClick = () => {
    onCardClick(index);
  };

  return (
    <Card
      onClick={handleClick}
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
  );
}
