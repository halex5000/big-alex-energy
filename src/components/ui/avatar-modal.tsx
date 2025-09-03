"use client";

import { LegoAvatar } from "@/components/ui/lego-avatar";
import { X } from "lucide-react";
import { type Avatar } from "@/data/avatars";

interface AvatarModalProps {
  avatar: Avatar;
  isOpen: boolean;
  onClose: () => void;
}

export function AvatarModal({ avatar, isOpen, onClose }: AvatarModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-background border-2 border-primary/20 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="mb-8">
            <LegoAvatar
              src={avatar.src}
              alt={avatar.alt}
              size="xl"
              className="mx-auto mb-6"
            />
          </div>
          
          <h2 className="text-3xl font-bold mb-6 text-primary">
            {avatar.title}
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
            {avatar.tagline}
          </p>

          {/* Additional expanded content could go here */}
          <div className="text-sm text-muted-foreground">
            <p>Click anywhere outside to close</p>
          </div>
        </div>
      </div>
    </div>
  );
}
