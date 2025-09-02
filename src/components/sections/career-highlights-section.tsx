interface CareerHighlight {
  title: string;
  description: string;
}

const highlights: CareerHighlight[] = [
  {
    title: "Director, Experimentation & Optimization – Klaviyo",
    description: "Led replatform to enterprise scale while already powering 60B+ experiment recipients annually."
  },
  {
    title: "Engineering Architect & Leader",
    description: "Mentored EMs, rethought infra foundations, drove cross-org transformation."
  },
  {
    title: "Early Career Roots in Dev + Ops",
    description: "I know what breaks. So I build what doesn't."
  }
];

export function CareerHighlightsSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Career Highlights
        </h2>
        <div className="space-y-12">
          {highlights.map((highlight, index) => (
            <div key={index} className="border-l-4 border-primary pl-6">
              <h3 className="text-xl font-semibold mb-2">
                {highlight.title}
              </h3>
              <p className="text-muted-foreground">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
