'use client';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/sections/hero-section';
import { SummarySection } from '@/components/sections/summary-section';
import { QuoteSection } from '@/components/sections/quote-section';
import { CareerHighlightsSection } from '@/components/sections/career-highlights-section';
import { FooterSection } from '@/components/sections/footer-section';
import { AnalyticsDebug } from '@/components/ui/analytics-debug';
import { trackCLIClick } from '@/lib/analytics';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation />

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* CLI Mode Toggle */}
      <div className="fixed bottom-6 left-6 z-50">
        <a
          href="/cli"
          onClick={trackCLIClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-900 text-green-400 border border-green-600 rounded-md hover:bg-green-800 transition-colors duration-200 font-mono text-sm"
        >
          <span>⚡</span>
          <span>halex9000 CLI</span>
        </a>
      </div>

      {/* Main Content with Scroll Snap */}
      <div className="scroll-snap-section">
        <HeroSection />
      </div>

      <div className="scroll-snap-section">
        <SummarySection />
      </div>

      <div className="scroll-snap-section">
        <CareerHighlightsSection />
      </div>

      <div className="scroll-snap-section">
        <QuoteSection />
      </div>

      <div className="scroll-snap-section">
        <FooterSection />
      </div>

      {/* Analytics Debug (dev only) */}
      <AnalyticsDebug />
    </div>
  );
}
