"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CarouselNavigation } from "@/components/ui/carousel-navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  Server, 
  Gauge, 
  Flame, 
  Sparkles, 
  Rocket, 
  Zap, 
  Bot, 
  BrainCircuit, 
  Settings2, 
  PiggyBank, 
  TrendingDown, 
  Trophy, 
  Medal, 
  Star, 
  Mic, 
  Megaphone, 
  Presentation, 
  ShieldCheck, 
  Workflow, 
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
    title: "Head of Experimentation & Optimization",
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
        label: "LaunchDarkly content",
        url: "https://launchdarkly.com/blog/author/alex-hardman-hehim-is-an-inventor-technologist/",
        icon: "blog"
      },
      {
        label: "AWS re:Invent 2022 - Security incident monitoring, mitigation & metrics using feature flags",
        url: "https://youtu.be/6vZiq6HJA9s",
        icon: "youtube"
      },
      {
        label: "Talking Migration with LaunchDarkly How to Ship Platforms as Features",
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
    title: "Senior Engineering Manager",
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
    title: "Platform & Cloud Architect (Director Level)",
    company: "Liberty Mutual",
    tagline: "Architecting Scale. Accelerating Delivery.",
    descriptionBullets: [
      "Architected a serverless, event-driven backbone for Liberty's specialty insurance platform using API Gateway, DynamoDB, Lambda, EventBridge, SNS, and SQS, enabling faster, loosely coupled integrations across underwriting, policy engines, and systems of record.",
      "Shaped data and integration strategy across DynamoDB, MongoDB Atlas, and RDS, aligning engineering and product priorities across squads at enterprise scale.",
      "Built reusable CDK modules, serverless patterns, and CLI tools that reduced onboarding from weeks to days and accelerated serverless adoption org-wide.",
      "Designed secure, high-throughput APIs using Lambda, API Gateway, and S3, balancing performance, compliance, and reliability.",
      "Modernized testing workflows with Playwright and Jest, shrinking test cycles from days to minutes and paving the path to continuous delivery."
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

const getLinkIcon = (iconType: string) => {
  switch (iconType) {
    case 'linkedin':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'patent':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    case 'blog':
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    default:
      return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
  }
};

const getIconForCard = (title: string, bulletIndex: number) => {
  // Klaviyo AI Hackathon Winner (2025)
  if (title.includes("Klaviyo AI Hackathon")) {
    const icons = [Trophy, BrainCircuit, Zap, Settings2, Sparkles];
    return icons[bulletIndex] || Trophy;
  }

  // Head of Experimentation & Optimization
  if (title.includes("Head of Experimentation")) {
    const icons = [Workflow, Sparkles, Rocket, PiggyBank];
    return icons[bulletIndex] || Workflow;
  }
  
  // Conference Speaker
  if (title.includes("Conference Speaker")) {
    const icons = [Mic, Presentation, Users, CircuitBoard];
    return icons[bulletIndex] || Mic;
  }
  
  // Patent
  if (title.includes("Inventor on U.S. Patent")) {
    const icons = [ShieldCheck, TrendingDown, Gauge];
    return icons[bulletIndex] || ShieldCheck;
  }

  // Senior Engineering Manager
  if (title.includes("Senior Engineering Manager")) {
    const icons = [Users, Server, Rocket, ShieldCheck];
    return icons[bulletIndex] || Users;
  }

  // Platform & Cloud Architect
  if (title.includes("Platform & Cloud Architect")) {
    const icons = [CircuitBoard, Workflow, Settings2, ShieldCheck, Zap];
    return icons[bulletIndex] || CircuitBoard;
  }

  // Liberty Mutual Hackathon
  if (title.includes("Liberty Mutual Hackathon")) {
    const icons = [Bot, Trophy];
    return icons[bulletIndex] || Bot;
  }

  // Default fallback
  return Sparkles;
};

export function CareerHighlightsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
    setCurrentIndex(index);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Career Highlights
          </h2>
          
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Card Deck Container */}
        <div className="relative">
          <CarouselNavigation
            currentIndex={currentIndex}
            totalItems={highlights.length}
            onPrevious={() => scrollToCard(Math.max(0, currentIndex - 1))}
            onNext={() => scrollToCard(Math.min(highlights.length - 1, currentIndex + 1))}
          />

          {/* Scrollable Card Deck */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full max-w-4xl snap-center"
              >
                <Card className="border-2 h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                        <h3 className="text-2xl md:text-3xl font-bold">
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

                      {/* Description blocks */}
                      <div className="space-y-4 flex-1">
                        {highlight.descriptionBullets.map((bullet, bulletIndex) => {
                          const IconComponent = getIconForCard(highlight.title, bulletIndex);
                          
                          return (
                            <div key={bulletIndex} className="group relative">
                              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200 hover:scale-[1.02]">
                                <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:scale-110 group-hover:text-foreground transition-all duration-200" />
                                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                                  {bullet}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>


                    </div>

                    {/* Card Footer with Links */}
                    {highlight.links && highlight.links.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-border/50">
                        {highlight.links.length === 1 ? (
                          // Single link - inline style
                          <a
                            href={highlight.links[0].url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors duration-200 group"
                          >
                            {getLinkIcon(highlight.links[0].icon)}
                            <span className="ml-2">{highlight.links[0].label}</span>
                            <svg className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          // Multiple links - grid style
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {highlight.links.map((link, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-muted/30 transition-all duration-200 hover:scale-105"
                              >
                                <div className="flex items-center space-x-2 mb-1">
                                  {getLinkIcon(link.icon)}
                                  <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors duration-200">
                                    {link.icon === 'blog' ? 'Blog Posts' : 
                                     link.icon === 'youtube' ? 'Video' : 
                                     link.icon === 'linkedin' ? 'LinkedIn' : 
                                     link.icon === 'patent' ? 'Patent' : 'External'}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground group-hover:text-primary transition-colors duration-200">
                                  {link.label}
                                </p>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="text-center mt-6 md:hidden">
          <p className="text-sm text-muted-foreground">
            ← Swipe to explore →
          </p>
        </div>
      </div>
    </section>
  );
}