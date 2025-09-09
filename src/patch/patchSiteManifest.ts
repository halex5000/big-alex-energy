export interface PatchSiteSection {
  id: string;
  title: string;
  path: string;
  category?: string;
  description?: string;
  scrollTarget?: string;
  keywords?: string[];
}

// API-friendly version for external consumption
export interface PatchManifestEntry {
  id: string;
  title: string;
  path: string;
  scrollTarget?: string;
  category?: string;
  description?: string;
  keywords?: string[];
}

// API response type
export interface PatchManifestResponse {
  success: boolean;
  data: PatchManifestEntry[];
  count: number;
  error?: string;
}

export const patchSiteManifest: PatchSiteSection[] = [
  // Homepage sections
  {
    id: 'hero',
    title: 'Hero Section',
    path: '/',
    scrollTarget: '#hero',
    description:
      "The main landing area with Alex's introduction and key highlights.",
    keywords: ['home', 'landing', 'intro', 'welcome'],
  },
  {
    id: 'summary',
    title: 'About Alex',
    path: '/',
    scrollTarget: '#summary',
    description:
      "A brief overview of Alex's background and expertise in software engineering.",
    keywords: ['about', 'summary', 'background', 'who'],
  },
  {
    id: 'career-highlights',
    title: 'Career Highlights',
    path: '/',
    scrollTarget: '#career-highlights',
    description:
      'Key professional achievements and career milestones at companies like Capital One, Klaviyo, and LaunchDarkly.',
    keywords: ['career', 'experience', 'highlights', 'achievements', 'work'],
  },
  {
    id: 'quote',
    title: 'Quote Section',
    path: '/',
    scrollTarget: '#quote',
    description:
      "An inspirational quote that reflects Alex's philosophy on technology and innovation.",
    keywords: ['quote', 'philosophy', 'inspiration'],
  },
  {
    id: 'contact',
    title: 'Contact',
    path: '/',
    scrollTarget: '#contact',
    description:
      'Ways to get in touch with Alex for opportunities and collaborations.',
    keywords: ['contact', 'email', 'reach out', 'get in touch', 'collaborate'],
  },

  // Main pages
  {
    id: 'projects',
    title: 'Projects',
    path: '/projects',
    scrollTarget: '#projects',
    category: 'portfolio',
    description:
      "A showcase of Alex's technical projects including Viyo (AI-powered onboarding), and other innovative builds.",
    keywords: ['projects', 'portfolio', 'work', 'builds', 'viyo', 'code'],
  },
  {
    id: 'resume',
    title: 'Resume',
    path: '/resume',
    scrollTarget: '#resume',
    category: 'professional',
    description:
      "Alex's professional resume with detailed experience, skills, and career progression.",
    keywords: [
      'resume',
      'cv',
      'experience',
      'professional',
      'skills',
      'career',
    ],
  },
  {
    id: 'talks',
    title: 'Talks & Presentations',
    path: '/talks',
    scrollTarget: '#talks',
    category: 'talk',
    description:
      'Conference talks and public speaking engagements including AWS re:Invent, QCon, and other tech conferences.',
    keywords: [
      'talks',
      'presentations',
      'speaking',
      'conferences',
      'aws',
      'qcon',
      'public speaking',
    ],
  },

  {
    id: 'viyo-hackathon',
    title: 'Viyo Hackathon',
    path: '/hackathons/viyo',
    category: 'hackathon',
    description:
      "The Viyo AI-powered onboarding hackathon project that won 1st place at Klaviyo's AI hackathon with detailed documentation and demos.",
    keywords: [
      'viyo',
      'onboarding',
      'ai',
      'hackathon',
      'demo',
      'project',
      'klaviyo',
      'winner',
    ],
  },
  {
    id: 'liberty-mutual-hackathon',
    title: 'Liberty Mutual Hackathon',
    path: '/hackathons/liberty-mutual',
    category: 'hackathon',
    description:
      'Liberty Mutual hackathon project showcasing innovative solutions.',
    keywords: ['liberty mutual', 'hackathon', 'insurance', 'project'],
  },
  {
    id: 'klaviyo-ai-hackathon',
    title: 'Klaviyo AI Onboarding',
    path: '/hackathons/klaviyo-ai-onboarding',
    category: 'hackathon',
    description:
      'Klaviyo AI onboarding hackathon project focused on improving user experience.',
    keywords: [
      'klaviyo',
      'ai',
      'onboarding',
      'hackathon',
      'ux',
      'user experience',
    ],
  },

  // Patents
  {
    id: 'patents',
    title: 'Patents',
    path: '/patents',
    category: 'patent',
    description:
      "Alex's patent portfolio including real-time gift card technology and other innovations.",
    keywords: [
      'patents',
      'intellectual property',
      'innovation',
      'gift card',
      'realtime',
    ],
  },
  {
    id: 'realtime-gift-card-patent',
    title: 'Realtime Gift Card Patent',
    path: '/patents/realtime-gift-card',
    category: 'patent',
    description:
      'Patent for real-time gift card technology and implementation.',
    keywords: ['gift card', 'realtime', 'patent', 'technology', 'innovation'],
  },

  // Blogs
  {
    id: 'blogs',
    title: 'Blogs',
    path: '/blogs',
    category: 'blog',
    description:
      'Technical blog posts and articles about software engineering, AI, and technology.',
    keywords: [
      'blog',
      'articles',
      'posts',
      'writing',
      'technical',
      'ai',
      'engineering',
    ],
  },
  {
    id: 'launchdarkly-blog',
    title: 'LaunchDarkly Blog',
    path: '/blogs/launchdarkly',
    category: 'blog',
    description:
      'Blog posts about LaunchDarkly feature flags and developer experience.',
    keywords: [
      'launchdarkly',
      'feature flags',
      'blog',
      'developer experience',
      'devops',
    ],
  },

  // CLI Tool
  {
    id: 'cli',
    title: 'CLI Tool',
    path: '/cli',
    category: 'tool',
    description:
      "Interactive CLI tool for exploring Alex's portfolio and projects in a terminal interface.",
    keywords: [
      'cli',
      'terminal',
      'tool',
      'command line',
      'interactive',
      'portfolio',
    ],
  },
];

// Helper function to find sections by keyword
export function findSectionsByKeyword(keyword: string): PatchSiteSection[] {
  const lowerKeyword = keyword.toLowerCase();
  return patchSiteManifest.filter(
    section =>
      section.keywords?.some(k => k.toLowerCase().includes(lowerKeyword)) ||
      section.title.toLowerCase().includes(lowerKeyword) ||
      section.description?.toLowerCase().includes(lowerKeyword)
  );
}

// Helper function to get section by ID
export function getSectionById(id: string): PatchSiteSection | undefined {
  return patchSiteManifest.find(section => section.id === id);
}
