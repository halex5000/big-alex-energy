import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function QuoteSection() {
  const quote = "I don't just set a high bar for resilience, low-latency delivery, and debuggability at scale, I blaze the trail alongside the team. Great engineering isn't just about uptime and performance. It's about how systems respond when things go wrong.";
  
  return (
    <section className="px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-start space-x-4">
              <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <blockquote className="text-lg md:text-xl italic leading-relaxed">
                {quote}
              </blockquote>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
