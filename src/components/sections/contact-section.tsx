import { Button } from "@/components/ui/button";
import { Mail, Linkedin } from "lucide-react";

export function ContactSection() {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Let's Connect
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="mailto:alex@halex9000.dev" className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>alex@halex9000.dev</span>
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <a href="https://linkedin.com/in/halex9000" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
              <Linkedin className="h-5 w-5" />
              <span>LinkedIn</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
