"use client";

import { useState } from "react";
import { contactInfo } from "@/data/contact";
import { ContactButton, LinkedInButton } from "@/components/ui/contact-button";

export function ContactCtaSection() {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailCopied = () => {
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Let&apos;s Go Build.
      </h2>
      
      {/* Contact CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <ContactButton
          email={contactInfo.email}
          onEmailCopied={handleEmailCopied}
        />
        
        <LinkedInButton
          url={contactInfo.linkedinUrl}
          label={contactInfo.linkedinLabel}
        />
      </div>
      
      {emailCopied && (
        <p className="text-sm text-green-600 dark:text-green-400 mb-4">
          ✨ Email copied to clipboard!
        </p>
      )}
    </div>
  );
}
