"use client";

import { LegoAvatar } from "@/components/ui/lego-avatar";
import { type Avatar } from "@/data/avatars";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AvatarModalProps {
  avatar: Avatar;
  isOpen: boolean;
  onClose: () => void;
}

export function AvatarModal({ avatar, isOpen, onClose }: AvatarModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-primary text-center">
            {avatar.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center">
          <div className="mb-8">
            <LegoAvatar
              src={avatar.src}
              alt={avatar.alt}
              size="2xl"
              className="mx-auto mb-6"
            />
          </div>
          
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line mb-8">
            {avatar.tagline}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
