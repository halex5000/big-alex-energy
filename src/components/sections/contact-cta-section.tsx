"use client";

import { Button } from "@/components/ui/button";
import { Copy, Mail, Linkedin, ExternalLink } from "lucide-react";
import { useState } from "react";

export function ContactCtaSection() {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("alex@halex9000.dev");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Let&apos;s Go Build Something.
      </h2>
      
      {/* Contact CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <Button
          variant="outline"
          size="lg"
          onClick={copyEmail}
          className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
          alex@halex9000.dev
          <Copy className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform duration-200" />
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          asChild
          className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <a href="https://linkedin.com/in/halex9000" target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            LinkedIn
            <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform duration-200" />
          </a>
        </Button>
      </div>
      
      {emailCopied && (
        <p className="text-sm text-green-600 dark:text-green-400 mb-4">
          ✨ Email copied to clipboard!
        </p>
      )}
    </div>
  );
}
