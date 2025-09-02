import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselNavigationProps {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function CarouselNavigation({ 
  currentIndex, 
  totalItems, 
  onPrevious, 
  onNext 
}: CarouselNavigationProps) {
  return (
    <>
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={currentIndex === totalItems - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border/50 hover:bg-background disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </>
  );
}
