import { AdvancedBadgeCarousel } from "@/components/ui/advanced-badge-carousel";

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Alex Hardman
        </h1>
        <AdvancedBadgeCarousel />
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Engineering Leader. Systems Thinker. Platform Builder.
        </p>
      </div>
    </section>
  );
}
