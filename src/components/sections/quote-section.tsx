import { quotes } from "@/data/quotes";
import { QuoteCard } from "@/components/ui/quote-card";

export function QuoteSection() {
  return (
    <section className="px-6">
      <div className="max-w-4xl mx-auto">
        <QuoteCard quote={quotes[0]} />
      </div>
    </section>
  );
}
