"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/external-link";
import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Server,
  Gauge,
  Sparkles,
  Rocket,
  Zap,
  Bot,
  BrainCircuit,
  PiggyBank,
  TrendingDown,
  Trophy,
  Users,
  CircuitBoard
} from "lucide-react";

interface CareerHighlight {
  logo: string;
  title: string;
  company: string;
  tagline: string;
  descriptionBullets: string[];
  links?: Array<{
    label: string;
    url: string;
    icon: 'linkedin' | 'youtube' | 'patent' | 'external' | 'blog';
  }>;
}

const highlights: CareerHighlight[] = [
  {
    logo: "/images/logos/klaviyo-logo.jpeg",
    title: "🏆 Klaviyo AI Hackathon Winner (2025)",
    company: "Klaviyo",
    tagline: "Viyo: AI Onboarding That Ships Code by Day 4. Built in 72 Hours.",
    descriptionBullets: [
      "Built and led the top-ranked AI project out of 55 teams, architected for speed, clarity, and impact",
      "Delivered Viyo, an onboarding assistant that gets engineers from day zero to first PR in 4 days, slashing ramp time by 85%",
      "Automated manager prep, ticket assignment, and personalized onboarding using GPT-4o, Slack, and n8n workflow automation",
      "Shipped AI-powered Q&A with live integration to Klaviyo's internal troubleshooting bot just hours before judging",
      "Projected $1M+ annual impact through earlier contributions, faster product delivery, and reduced manager lift"
    ],
    links: [
      {
        label: "Read the full story on LinkedIn",
        url: "https://www.linkedin.com/posts/blakeschuller_winning-the-klaviyo-ai-hackathon-was-not-activity-7366538099549548546-QxwG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAKjousBsyMCThwNnWkiEYv7OYIcBJU2x7Q",
        icon: "linkedin"
      }
    ]
  },
  {
    logo: "/images/logos/klaviyo-logo.jpeg",
    title: "🗺️ Head of Experimentation & Optimization",
    company: "Klaviyo",
    tagline: "Built to Scale. Architected to Last.",
    descriptionBullets: [
      "Directed strategy and architecture for Klaviyo's experimentation platform, enabling 50B+ user experiences annually across email, SMS, push, WhatsApp, and onsite.",
      "Led design and delivery of self-optimizing features using Bayesian optimization and personalization, driving measurable conversion gains at scale.",
      "Replaced Python bottlenecks with a blazing-fast Go prototype (40× faster), assigning hundreds of millions of recipients in under a second with 80% less memory and single-digit nanosecond latency per assignment.",
      "Unlocked five-figure infrastructure savings annually by migrating from self-hosted Redis to ElastiCache Serverless and creating a drop-in adoption playbook."
    ],
    links: [
      {
        label: "Klaviyo optimization performance guide",
        url: "https://www.klaviyo.com/customer-resources/optimize-performance",
        icon: "external"
      }
    ]
  },
  {
    logo: "/images/logos/launchdarkly-logo.jpeg",
    title: "🎤 Conference Speaker",
    company: "LaunchDarkly",
    tagline: "Live Demos. Real Code. Global Reach.",
    descriptionBullets: [
      "Took the stage at AWS re:Invent, QCon London, and LaunchDarkly Galaxy to demo real-world use cases with live code, storytelling, and dark-launch drama.",
      "Reached audiences globally and Fortune 100 leaders, inspiring confidence in feature management and enabling safer, faster delivery at scale.",
      "Served as a technical storyteller and educator, breaking down complex systems through live talks, webinars, blogs, and YouTube demos that made capabilities click.",
      "Created high-impact enablement content and redesigned the architecture page to help technical buyers evaluate LaunchDarkly with clarity and speed."
    ],
    links: [
      {
        label: "LaunchDarkly blog posts",
        url: "https://launchdarkly.com/blog/author/alex-hardman-hehim-is-an-inventor-technologist/",
        icon: "blog"
      },
      {
        label: "AWS re:Invent 2022",
        url: "https://youtu.be/6vZiq6HJA9s",
        icon: "youtube"
      },
      {
        label: "Migration Talk",
        url: "https://www.youtube.com/watch?v=pVM6gdGKcNc",
        icon: "youtube"
      }
    ]
  },
  {
    logo: "/images/logos/capitalone-logo.jpeg",
    title: "🧠 Inventor on U.S. Patent 11,562,416",
    company: "Capital One",
    tagline: "Innovation at Scale. Fulfillment at Speed.",
    descriptionBullets: [
      "Inventor on a patented system that automates digital gift card issuance and redemption across high-volume enterprise rewards platforms",
      "Re-architected fulfillment flow for speed and reliability, enabling real-time delivery across thousands of vendors and millions of users",
      "Boosted transaction velocity, reduced third-party errors, and improved the end-to-end customer experience across Capital One's largest-scale rewards programs"
    ],
    links: [
      {
        label: "View patent details",
        url: "https://patents.google.com/patent/US11562416B1/en",
        icon: "patent"
      }
    ]
  },
  {
    logo: "/images/logos/capitalone-logo.jpeg",
    title: "🗺️ Senior Engineering Manager",
    company: "Capital One",
    tagline: "Patented Performance at Scale.",
    descriptionBullets: [
      "Led the team behind Capital One Shopping's real-time price comparison engine, powering 50M+ daily lookups and billions of transactions.",
      "Architected and scaled systems using Docker, Node.js, PostgreSQL, Redis, and Cassandra to serve millions of active users.",
      "Launched a real-time geospatial hotel search engine with Docker, Redis, React, and PostGIS. Cut load times by 320× (8 hours → 90 seconds), eliminated weekly downtime, and ended stale data for good.",
      "Named inventor on U.S. Patent 11,562,416 for automating gift card acquisition and redemption to enable real-time fulfillment and improve customer experience."
    ]
  },
  {
    logo: "/images/logos/libertymutual-logo.jpeg",
    title: "🗺️ Platform & Cloud Architect (Director Level)",
    company: "Liberty Mutual",
    tagline: "Architecting Scale. Accelerating Delivery.",
    descriptionBullets: [
      "Architected a serverless, event-driven backbone for Liberty's specialty insurance platform using API Gateway, DynamoDB, Lambda, EventBridge, SNS, and SQS, enabling faster, loosely coupled integrations across underwriting, policy engines, and systems of record.",
      "Shaped data and integration strategy across DynamoDB, MongoDB Atlas, and RDS, aligning engineering and product priorities across squads at enterprise scale.",
      "Delivered a unified data platform that reduced integration time from weeks to hours, enabling rapid product experimentation and faster time-to-market for new insurance products."
    ]
  },
  {
    logo: "/images/logos/libertymutual-logo.jpeg",
    title: "🏆 Winner - Liberty Mutual Hackathon (2013)",
    company: "Liberty Mutual",
    tagline: "Before ChatGPT. Before LLMs. Still Shipping Smarter Systems.",
    descriptionBullets: [
      "Created a crash-detection Android app using voice + sensors to auto-trigger FNOL claims.",
      "Won top prize for tech innovation and real-world customer impact."
    ],
    links: [
      {
        label: "Watch the demo video",
        url: "https://www.youtube.com/watch?v=hJ1IKW4-0Fw",
        icon: "youtube"
      }
    ]
  }
];

const getIconForCard = (title: string, bulletIndex: number) => {
  // Head of Experimentation & Optimization
  if (title.includes("Head of Experimentation")) {
    const icons = [Gauge, Sparkles, Zap, PiggyBank];
    return icons[bulletIndex % icons.length];
  }
  
  // Senior Engineering Manager
  if (title.includes("Senior Engineering Manager")) {
    const icons = [Server, Users, Trophy];
    return icons[bulletIndex % icons.length];
  }
  
  // Platform & Cloud Architect
  if (title.includes("Platform & Cloud Architect")) {
    const icons = [CircuitBoard, BrainCircuit, Rocket];
    return icons[bulletIndex % icons.length];
  }
  
  // Klaviyo AI Hackathon Winner
  if (title.includes("AI Hackathon Winner")) {
    const icons = [Trophy, Bot, Sparkles, Zap, TrendingDown];
    return icons[bulletIndex % icons.length];
  }
  
  // Liberty Mutual Hackathon Winner
  if (title.includes("Liberty Mutual Hackathon")) {
    const icons = [Trophy, Bot];
    return icons[bulletIndex % icons.length];
  }
  
  // Conference Speaker
  if (title.includes("Conference Speaker")) {
    const icons = [Trophy, Users, Sparkles, Rocket];
    return icons[bulletIndex % icons.length];
  }
  
  // Patent Inventor
  if (title.includes("Inventor on U.S. Patent")) {
    const icons = [Trophy, Bot, Sparkles];
    return icons[bulletIndex % icons.length];
  }
  
  // Default fallback
  return Sparkles;
};

const getLinkIcon = (iconType: string) => {
  switch (iconType) {
    case 'linkedin':
      return (
        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'patent':
      return (
        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    case 'blog':
      return (
        <svg className="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      );
    case 'external':
      return (
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      );
  }
};

export function CareerHighlightsSection() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    // Only expand on mobile (screen width < 768px)
    if (window.innerWidth < 768) {
      setExpandedCard(expandedCard === index ? null : index);
    }
  };

  const closeExpandedCard = () => {
    setExpandedCard(null);
  };

  return (
    <section className="px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="pb-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
            Career Highlights
          </h2>
        </div>

        {/* Mobile: Horizontal Swipe, Desktop: Horizontal Scrolling */}
        <div className="md:hidden">
          {/* Mobile Horizontal Swipe */}
          <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {highlights.map((highlight, index) => (
              <div key={index} className="flex-shrink-0 w-80 snap-center">
                <Card
                  onClick={() => handleCardClick(index)}
                  className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary/50 h-[60vh]"
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="space-y-4 flex-1">
                      {/* Logo + Title row */}
                      <div className="flex items-center space-x-3">
                        <Image
                          src={highlight.logo}
                          alt={`${highlight.company} logo`}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                        <h3 className="text-lg font-bold text-foreground leading-tight">
                          {highlight.title}
                        </h3>
                      </div>
                      
                      {/* Company + Tagline */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          {highlight.company}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {highlight.tagline}
                        </p>
                      </div>

                      {/* Description Bullets - Show first 2 on mobile */}
                      <div className="space-y-3">
                        {highlight.descriptionBullets.slice(0, 2).map((bullet, bulletIndex) => {
                          const IconComponent = getIconForCard(highlight.title, bulletIndex);
                          return (
                            <div key={bulletIndex} className="group relative">
                              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
                                <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                                <p className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                                  {bullet}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                        {highlight.descriptionBullets.length > 2 && (
                          <p className="text-xs text-muted-foreground italic">
                            +{highlight.descriptionBullets.length - 2} more details
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Links Section - Always show HR, content if links exist */}
                    <div className="mt-auto pt-6 border-t border-border h-[80px] flex flex-col justify-center">
                      {highlight.links && highlight.links.length > 0 ? (
                        <div className="flex gap-2 justify-center items-center overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          {highlight.links.map((link, linkIndex) => (
                            <div
                              key={linkIndex}
                              className="p-2 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 flex-shrink-0 min-w-0"
                            >
                              <ExternalLink
                                href={link.url}
                                className="text-xs flex items-center whitespace-nowrap"
                              >
                                {getLinkIcon(link.icon)}
                                <span className="ml-1 truncate">{link.label}</span>
                              </ExternalLink>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex justify-center items-center h-full">
                          <div className="text-xs text-muted-foreground/50 italic">No additional resources</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Horizontal Scrolling Carousel */}
        <div className="hidden md:block">
          <div className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4 items-stretch" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {highlights.map((highlight, index) => (
              <div key={index} className="flex-shrink-0 w-full max-w-4xl flex snap-center">
                <Card className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50 flex-1">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="space-y-6 flex-1">
                      {/* Logo + Title row */}
                      <div className="flex items-center space-x-4">
                        <Image
                          src={highlight.logo}
                          alt={`${highlight.company} logo`}
                          width={48}
                          height={48}
                          className="w-[1.2em] h-[1.2em] object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                        <h3 className="text-2xl lg:text-3xl font-bold">
                          {highlight.title}
                        </h3>
                      </div>

                      {/* Company with @ symbol */}
                      <p className="text-lg text-muted-foreground">
                        @ {highlight.company}
                      </p>

                      {/* Tagline */}
                      <p className="text-lg font-medium text-primary">
                        {highlight.tagline}
                      </p>

                      {/* Description blocks - ALL bullets */}
                      <div className="space-y-4 flex-1">
                        {highlight.descriptionBullets.map((bullet, bulletIndex) => {
                          const IconComponent = getIconForCard(highlight.title, bulletIndex);
                          
                          return (
                            <div key={bulletIndex} className="group relative">
                              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
                                <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                                  {bullet}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Links Section - Always show HR, content if links exist */}
                    <div className="mt-auto pt-6 border-t border-border h-[80px] flex flex-col justify-center">
                      {highlight.links && highlight.links.length > 0 ? (
                        <div className="flex gap-3 justify-center items-center overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          {highlight.links.map((link, linkIndex) => (
                            <div
                              key={linkIndex}
                              className="p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 flex-shrink-0 min-w-0"
                            >
                              <ExternalLink
                                href={link.url}
                                className="text-sm flex items-center whitespace-nowrap"
                              >
                                {getLinkIcon(link.icon)}
                                <span className="ml-2 truncate">{link.label}</span>
                              </ExternalLink>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex justify-center items-center h-full">
                          <div className="text-sm text-muted-foreground/50 italic">No additional resources</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Expanded Card Modal */}
      {expandedCard !== null && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm md:hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="text-lg font-semibold">Career Highlight</h3>
              <button
                onClick={closeExpandedCard}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {(() => {
                const highlight = highlights[expandedCard];
                return (
                  <div className="space-y-4">
                    {/* Logo + Title row */}
                    <div className="flex items-center space-x-3">
                      <Image
                        src={highlight.logo}
                        alt={`${highlight.company} logo`}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                      <h3 className="text-xl font-bold text-foreground leading-tight">
                        {highlight.title}
                      </h3>
                    </div>
                    
                    {/* Company + Tagline */}
                    <div className="space-y-2">
                      <p className="text-base font-medium text-muted-foreground">
                        {highlight.company}
                      </p>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {highlight.tagline}
                      </p>
                    </div>

                    {/* Description Bullets */}
                    <div className="space-y-4">
                      {highlight.descriptionBullets.map((bullet, bulletIndex) => {
                        const IconComponent = getIconForCard(highlight.title, bulletIndex);
                        return (
                          <div key={bulletIndex} className="flex items-start space-x-3 p-2 rounded-lg">
                            <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {bullet}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Links Section */}
                    <div className="mt-6 pt-6 border-t border-border h-[80px] flex flex-col justify-center">
                      {highlight.links && highlight.links.length > 0 ? (
                        <div className="flex gap-3 justify-center items-center overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          {highlight.links.map((link, linkIndex) => (
                            <div
                              key={linkIndex}
                              className="p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 flex-shrink-0 min-w-0"
                            >
                              <ExternalLink
                                href={link.url}
                                className="text-sm flex items-center whitespace-nowrap"
                              >
                                {getLinkIcon(link.icon)}
                                <span className="ml-2 truncate">{link.label}</span>
                              </ExternalLink>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex justify-center items-center h-full">
                          <div className="text-sm text-muted-foreground/50 italic">No additional resources</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
