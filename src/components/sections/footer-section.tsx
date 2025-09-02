"use client";

import { Separator } from "@/components/ui/separator";
import { LegoAvatar } from "@/components/ui/lego-avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Mail, Linkedin, ExternalLink } from "lucide-react";
import { useState } from "react";

export function FooterSection() {
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

  const collectibleAvatars = [
    {
      src: "/images/avatars/steak-alex.jpeg",
      alt: "Chef Alex",
      title: "🥩 Chef Alex",
      tagline: "Slow is smooth.\nSmooth is fast."
    },
    {
      src: "/images/avatars/office-alex.jpeg", 
      alt: "Office Alex",
      title: "👨‍💻 Office Alex",
      tagline: "Lead with clarity.\nBuild with care.\nEmpower without ego."
    },
    {
      src: "/images/avatars/bartender-alex.png",
      alt: "Mixologist Alex", 
      title: "🍸 Mixologist Alex",
      tagline: "Shaking cocktails and debugging prod.\n(Not in that order.)"
    }
  ];



  return (
    <footer className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <Separator className="mb-12" />
        
        {/* Let's Go Build Something Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's Go Build Something.
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

        {/* Collectible LEGO Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {collectibleAvatars.map((avatar, index) => (
            <Card
              key={index}
              className="group cursor-pointer border-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:rotate-1"
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <LegoAvatar
                    src={avatar.src}
                    alt={avatar.alt}
                    size="lg"
                    className="mx-auto group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {avatar.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {avatar.tagline}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Alex Hardman. Engineered with Go, brisket, and big main-character energy.
          </p>
        </div>
      </div>
    </footer>
  );
}