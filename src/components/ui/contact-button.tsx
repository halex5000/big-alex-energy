"use client";

import { Button } from "@/components/ui/button";
import { Copy, Mail, Linkedin, ExternalLink } from "lucide-react";

interface ContactButtonProps {
  email: string;
  onEmailCopied?: () => void;
}

export function ContactButton({ email, onEmailCopied }: ContactButtonProps) {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      onEmailCopied?.();
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={copyEmail}
      className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
    >
      <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
      {email}
      <Copy className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform duration-200" />
    </Button>
  );
}

interface LinkedInButtonProps {
  url: string;
  label: string;
}

export function LinkedInButton({ url, label }: LinkedInButtonProps) {
  return (
    <Button
      variant="outline"
      size="lg"
      asChild
      className="group hover:bg-primary hover:text-primary-foreground transition-all duration-300"
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <Linkedin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
        {label}
        <ExternalLink className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform duration-200" />
      </a>
    </Button>
  );
}
