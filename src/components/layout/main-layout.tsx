import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Navigation } from '@/components/ui/navigation';
import { HeroSection } from '@/components/sections/hero-section';
import { SummarySection } from '@/components/sections/summary-section';
import { QuoteSection } from '@/components/sections/quote-section';
import { CareerHighlightsSection } from '@/components/sections/career-highlights-section';
import { FooterSection } from '@/components/sections/footer-section';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <Navigation />

      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
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
    </div>
  );
}
