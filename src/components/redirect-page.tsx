'use client';

import { useEffect } from 'react';
import { trackRedirectLink } from '@/lib/analytics';

interface RedirectPageProps {
  title: string;
  href: string;
  label: string;
}

export function RedirectPage({ title, href, label }: RedirectPageProps) {
  useEffect(() => {
    // Fire Plausible analytics event
    trackRedirectLink(label);

    // Redirect after a short delay to ensure analytics fires
    const timer = setTimeout(() => {
      window.location.href = href;
    }, 100);

    return () => clearTimeout(timer);
  }, [href, label]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Redirecting...
          </h1>
          <p className="text-muted-foreground">{title}</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            If you&apos;re not redirected automatically,
          </p>
          <a
            href={href}
            className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Click here to continue
          </a>
        </div>
      </div>
    </div>
  );
}
