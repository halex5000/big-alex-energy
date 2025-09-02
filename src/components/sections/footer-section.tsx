import { Separator } from "@/components/ui/separator";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { AvatarCardsSection } from "@/components/sections/avatar-cards-section";

export function FooterSection() {



  return (
    <footer className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <Separator className="mb-12" />
        
        <ContactCtaSection />
        <AvatarCardsSection />
        
        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Alex Hardman. Engineered with Go, brisket, and Big Alex Energy.
          </p>
        </div>
      </div>
    </footer>
  );
}