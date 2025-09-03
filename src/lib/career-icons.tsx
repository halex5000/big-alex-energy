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

export const getIconForCard = (title: string, bulletIndex: number) => {
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

export const getLinkIcon = (iconType: string) => {
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
