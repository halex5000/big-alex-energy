import { Card, CardContent } from "@/components/ui/card";

export function SummarySection() {
  return (
    <section className="px-6">
      <div className="max-w-4xl mx-auto">
        <Card className="border-2">
          <CardContent className="p-8 text-center">
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
              I architect systems that power billions of customer interactions, and lead the teams that scale them with clarity, trust, and resilience.
            </p>
            <p className="text-lg font-medium">
              I design for failure. I lead for velocity.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
