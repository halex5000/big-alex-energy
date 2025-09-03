"use client";

import { heroBadges } from "@/data/hero-badges";
import { Progress } from "@/components/ui/progress";

interface VerticalBadgeWheelProps {
  currentIndex: number;
}

export function VerticalBadgeWheel({ 
  currentIndex
}: VerticalBadgeWheelProps) {

  const totalItems = heroBadges.length;
  const progress = (currentIndex / (totalItems - 1)) * 100;

  return (
    <div className="flex flex-col items-center ml-3 space-y-1">
      {/* Progress Bar */}
      <div className="w-0.5 h-16">
        <Progress 
          value={progress} 
          className="h-full [&>div]:bg-muted-foreground/40 [&>div]:transition-all [&>div]:duration-300"
        />
      </div>
      
      {/* Current Position Indicator */}
      <div className="text-[10px] text-muted-foreground/40 font-mono">
        {currentIndex + 1}/{totalItems}
      </div>
    </div>
  );
}
