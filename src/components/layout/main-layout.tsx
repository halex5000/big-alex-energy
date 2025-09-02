import { ThemeToggle } from "@/components/ui/theme-toggle";
import { HeroSection } from "@/components/sections/hero-section";
import { SummarySection } from "@/components/sections/summary-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { CareerHighlightsSection } from "@/components/sections/career-highlights-section";
import { FooterSection } from "@/components/sections/footer-section";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <HeroSection />
      <SummarySection />
      <QuoteSection />
      <CareerHighlightsSection />
      <FooterSection />
    </div>
  );
}
