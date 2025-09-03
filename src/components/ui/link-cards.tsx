"use client";

import { ExternalLink } from "@/components/ui/external-link";
import { getLinkIcon } from "@/lib/career-icons";

interface Link {
  label: string;
  url: string;
  icon: 'linkedin' | 'youtube' | 'patent' | 'external' | 'blog';
}

interface LinkCardsProps {
  links: Link[];
  variant?: 'mobile' | 'desktop' | 'modal';
}

export function LinkCards({ links, variant = 'desktop' }: LinkCardsProps) {
  if (!links || links.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className={`text-muted-foreground/50 italic ${
          variant === 'mobile' ? 'text-xs' : 'text-sm'
        }`}>
          No additional resources
        </div>
      </div>
    );
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'mobile':
        return {
          container: 'gap-3',
          card: 'flex-1 h-12 p-3',
          text: 'text-sm',
          icon: 'ml-2'
        };
      case 'modal':
        return {
          container: 'gap-4',
          card: 'flex-1 h-14 p-4',
          text: 'text-base font-medium',
          icon: 'ml-3'
        };
      default: // desktop
        return {
          container: 'gap-4',
          card: 'flex-1 h-14 p-4',
          text: 'text-base font-medium',
          icon: 'ml-3'
        };
    }
  };

  const classes = getVariantClasses();

  return (
    <div className={`flex ${classes.container} justify-center items-center w-full`}>
      {links.map((link, linkIndex) => (
        <div
          key={linkIndex}
          className={`${classes.card} border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 flex items-center justify-center`}
        >
          <ExternalLink
            href={link.url}
            className={`${classes.text} flex items-center justify-center w-full h-full`}
          >
            {getLinkIcon(link.icon)}
            <span className={`${classes.icon} text-center`}>{link.label}</span>
          </ExternalLink>
        </div>
      ))}
    </div>
  );
}
