"use client";

import { getIconForCard } from "@/lib/career-icons";

interface DescriptionBulletsProps {
  title: string;
  bullets: string[];
  maxBullets?: number;
  variant?: 'mobile' | 'desktop' | 'modal';
}

export function DescriptionBullets({ 
  title, 
  bullets, 
  maxBullets,
  variant = 'desktop' 
}: DescriptionBulletsProps) {
  const displayBullets = maxBullets ? bullets.slice(0, maxBullets) : bullets;
  const remainingCount = maxBullets && bullets.length > maxBullets ? bullets.length - maxBullets : 0;

  const getVariantClasses = () => {
    switch (variant) {
      case 'mobile':
        return {
          container: 'space-y-3',
          bullet: 'text-xs',
          more: 'text-xs'
        };
      case 'modal':
        return {
          container: 'space-y-4',
          bullet: 'text-sm',
          more: 'text-sm'
        };
      default: // desktop
        return {
          container: 'space-y-4',
          bullet: 'text-sm',
          more: 'text-sm'
        };
    }
  };

  const classes = getVariantClasses();

  return (
    <div className={classes.container}>
      {displayBullets.map((bullet, bulletIndex) => {
        const IconComponent = getIconForCard(title, bulletIndex);
        return (
          <div key={bulletIndex} className="group relative">
            <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
              <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
              <p className={`${classes.bullet} text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200`}>
                {bullet}
              </p>
            </div>
          </div>
        );
      })}
      {remainingCount > 0 && (
        <p className={`${classes.more} text-muted-foreground italic`}>
          +{remainingCount} more details
        </p>
      )}
    </div>
  );
}
