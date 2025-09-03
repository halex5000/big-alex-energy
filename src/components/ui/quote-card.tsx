import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { type Quote as QuoteType } from "@/data/quotes";

interface QuoteCardProps {
  quote: QuoteType;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card className="border-2">
      <CardContent className="p-8 md:p-12">
        <div className="flex items-start space-x-4">
          <Quote className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
          <blockquote className="text-lg md:text-xl italic leading-relaxed">
            {quote.text}
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
}
