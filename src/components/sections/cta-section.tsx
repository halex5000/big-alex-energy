import { ExternalLink } from '@/components/ui/external-link';

export function CtaSection() {
  return (
    <section className="px-4 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <ExternalLink
            href="/projects"
            className="inline-flex items-center gap-2 hover:text-foreground transition-colors duration-200"
          >
            ✧ View More Projects →
          </ExternalLink>
          <span className="hidden sm:inline text-muted-foreground/50">|</span>
          <ExternalLink
            href="/talks"
            className="inline-flex items-center gap-2 hover:text-foreground transition-colors duration-200"
          >
            Watch My Talks →
          </ExternalLink>
          <span className="hidden sm:inline text-muted-foreground/50">|</span>
          <ExternalLink
            href="/resume"
            className="inline-flex items-center gap-2 hover:text-foreground transition-colors duration-200"
          >
            Download My Resume →
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
