"use client";

import { useState } from "react";
import { collectibleAvatars } from "@/data/avatars";
import { AvatarCard } from "@/components/ui/avatar-card";
import { AvatarModal } from "@/components/ui/avatar-modal";

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
          <AvatarCard
            key={index}
            avatar={avatar}
            index={index}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {/* Expanded Card Modal */}
      {expandedCard !== null && (
        <AvatarModal
          avatar={collectibleAvatars[expandedCard]}
          isOpen={true}
          onClose={closeExpandedCard}
        />
      )}
    </>
  );
}
