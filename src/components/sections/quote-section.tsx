import { quotes } from "@/data/quotes";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function QuoteSection() {
  return (
    <section className="px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2">
          <CardContent className="p-8 md:p-12">
            <div className="flex items-start space-x-4">
              <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
              <blockquote className="text-lg md:text-xl italic leading-relaxed">
                {quotes[0].text}
              </blockquote>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
