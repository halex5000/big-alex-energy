export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
  year: string;
  company?: string;
  status: 'completed' | 'in-progress' | 'archived';
  // Detailed project data
  fullTitle: string;
  subtitle: string;
  duration: string;
  savings?: string;
  achievement?: string;
  teamSize?: string;
  isInternal?: boolean;
  internalNote?: string;
  role: string;
  roleDescription: string;
  impact: string;
  features: string[];
  images: {
    hero: string;
    happy?: string;
    winking?: string;
    demo?: string;
    team?: string;
  };
  stats: {
    savings?: string;
    achievement?: string;
    duration: string;
    teamSize?: string;
  };
  quote?: {
    text: string;
    context: string;
  };
  finalNote?: {
    title: string;
    description: string;
  };
  links?: Array<{
    label: string;
    url: string;
    icon: 'linkedin' | 'youtube' | 'patent' | 'external' | 'blog' | 'github';
  }>;
}

export const projects: Project[] = [
  {
    id: 'viyo',
    title: 'Viyo - AI-Powered Onboarding',
    tagline: 'AI-accelerated onboarding that ships code by Day 4',
    description:
      "Built a complete AI-powered onboarding system with real-time Slack integration, automated Jira routing, and personalized curriculum building. Won 1st place at Klaviyo's AI hackathon with a fully functional prototype.",
    image: '/images/hackathons/viyo/happy-viyo.jpeg',
    href: '/hackathons/viyo',
    tags: ['AI', 'Hackathon', 'Winner', 'Full-Stack', 'Slack'],
    year: '2025',
    company: 'Klaviyo',
    status: 'completed',

    // Detailed data
    fullTitle: 'Viyo: AI-Accelerated Onboarding Assistant',
    subtitle: 'Built in 72 hours. Shipped Day 4 PRs. Saved $974K/year.',
    duration: '72 hours',
    savings: '$974K/year',
    achievement: '1st Place (55 teams)',
    teamSize: '3 engineers',
    isInternal: true,
    internalNote:
      "This was an internal-only tool built for Klaviyo's 2025 AI Hackathon and is not publicly available.",

    role: 'Technical Lead & Full-Stack Developer',
    roleDescription:
      'The seed of the idea came from our People team, a big and ambitious vision for AI-accelerated onboarding. I helped translate that into a focused, executable plan we could realistically build in 72 hours. I defined the architecture, scoped the work, and led a fast-moving, highly collaborative build cycle.',

    impact:
      'I built the Slackbot using Cursor, the orchestration layer, and the AI-powered Q&A assistant. I stitched together user flows, prompt logic, and thousands of lines of production-grade code to deliver a seamless experience. From the first Slack message to the final PR, I owned the entire user journey.',

    features: [
      'Slack-native AI-accelerated onboarding assistant',
      'Builds a customized onboarding plan tailored to the onboarding task',
      'Automated Jira ticket routing and curriculum building',
      'Manager check-ins and progress tracking',
    ],

    images: {
      hero: '/images/hackathons/viyo/happy-viyo.jpeg',
      happy: '/images/hackathons/viyo/happy-viyo.jpeg',
      winking: '/images/hackathons/viyo/winking-viyo.jpeg',
      demo: '/images/hackathons/viyo/demo-screenshot.png',
      team: '/images/hackathons/viyo/viyo-made-me-do-it.jpeg',
    },

    stats: {
      savings: '$974K/year',
      achievement: '1st Place',
      duration: '72 hours',
      teamSize: '3 engineers',
    },

    quote: {
      text: 'In the US, on average, it takes new engineers up to 30 days to complete their first PR. Now—with Viyo—they can PR by Day 4. And managers? No heavy lifting required.',
      context: 'Project impact on engineering onboarding',
    },

    finalNote: {
      title: 'Viyo Made Me Do It',
      description:
        "Viyo wasn't just a cool hackathon project. It reimagined how companies can scale onboarding with clarity, confidence, and speed. This wasn't just a project. It was a reflection of how I lead, and what I'll bring to what's next.",
    },

    links: [
      {
        label: 'Read the full story',
        url: '/hackathons/viyo',
        icon: 'external',
      },
    ],
  },
  {
    id: 'experimentation-platform',
    title: 'Experimentation Platform',
    tagline: '50B+ user experiences optimized with Bayesian algorithms',
    description:
      "Directed strategy and architecture for Klaviyo's experimentation platform, enabling massive-scale A/B testing across email, SMS, push, WhatsApp, and onsite channels with real-time optimization.",
    image: '/images/logos/klaviyo-logo.jpeg',
    href: '/career-highlights',
    tags: ['Platform', 'AI', 'Scale', 'Optimization', 'Go'],
    year: '2023-2024',
    company: 'Klaviyo',
    status: 'completed',

    fullTitle: 'Self-Optimizing Experimentation Platform',
    subtitle: '50B+ user experiences optimized with Bayesian algorithms',
    duration: '18 months',
    teamSize: '8 engineers',

    role: 'Head of Experimentation & Optimization',
    roleDescription:
      "Directed strategy and architecture for Klaviyo's experimentation platform, enabling 50B+ user experiences annually across email, SMS, push, WhatsApp, and onsite.",

    impact:
      'Led design and delivery of self-optimizing features using Bayesian optimization and personalization, driving measurable conversion gains at scale. Replaced Python bottlenecks with a blazing-fast Go prototype (40× faster), assigning hundreds of millions of recipients in under a second with 80% less memory and single-digit nanosecond latency per assignment.',

    features: [
      'Bayesian optimization and personalization algorithms',
      '40× performance improvement with Go implementation',
      'Single-digit nanosecond latency per assignment',
      '80% memory reduction vs Python implementation',
      'Unlocked five-figure infrastructure savings annually',
    ],

    images: {
      hero: '/images/logos/klaviyo-logo.jpeg',
    },

    stats: {
      duration: '18 months',
      teamSize: '8 engineers',
    },

    links: [
      {
        label: 'Klaviyo optimization guide',
        url: 'https://www.klaviyo.com/customer-resources/optimize-performance',
        icon: 'external',
      },
    ],
  },
  {
    id: 'gift-card-patent',
    title: 'Real-Time Gift Card System',
    tagline: 'U.S. Patent 11,562,416 - Automated fulfillment at scale',
    description:
      'Invented and architected a patented system that automates digital gift card issuance and redemption across high-volume enterprise rewards platforms, enabling real-time delivery across thousands of vendors.',
    image: '/images/logos/capitalone-logo.jpeg',
    href: '/patents/realtime-gift-card',
    tags: ['Patent', 'Architecture', 'Scale', 'Automation', 'Java'],
    year: '2021',
    company: 'Capital One',
    status: 'completed',

    fullTitle: 'Real-Time Digital Gift Card Acquisition and Redemption System',
    subtitle: 'U.S. Patent 11,562,416 - Automated fulfillment at scale',
    duration: '12 months',
    teamSize: '4 engineers',

    role: 'Senior Engineering Manager & Inventor',
    roleDescription:
      'Inventor on a patented system that automates digital gift card issuance and redemption across high-volume enterprise rewards platforms',

    impact:
      "Re-architected fulfillment flow for speed and reliability, enabling real-time delivery across thousands of vendors and millions of users. Boosted transaction velocity, reduced third-party errors, and improved the end-to-end customer experience across Capital One's largest-scale rewards programs.",

    features: [
      'Real-time digital gift card acquisition and redemption',
      'Automated fulfillment across thousands of vendors',
      'Millions of users supported',
      'Reduced third-party errors significantly',
      'Improved end-to-end customer experience',
    ],

    images: {
      hero: '/images/logos/capitalone-logo.jpeg',
    },

    stats: {
      duration: '12 months',
      teamSize: '4 engineers',
    },

    links: [
      {
        label: 'View patent details',
        url: '/patents/realtime-gift-card',
        icon: 'patent',
      },
    ],
  },
  {
    id: 'crash-detection-app',
    title: 'Crash Detection App',
    tagline: 'Android app using voice + sensors for auto FNOL claims',
    description:
      "Created an innovative crash-detection Android app using voice recognition and sensor data to automatically trigger First Notice of Loss (FNOL) claims, winning top prize at Liberty Mutual's hackathon.",
    image: '/images/logos/libertymutual-logo.jpeg',
    href: '/hackathons/liberty-mutual',
    tags: ['Android', 'Hackathon', 'Winner', 'Mobile', 'Sensors'],
    year: '2013',
    company: 'Liberty Mutual',
    status: 'archived',

    fullTitle: 'Crash Detection & Auto FNOL Claims App',
    subtitle: 'Android app using voice + sensors for auto FNOL claims',
    duration: '48 hours',
    teamSize: '3 engineers',
    achievement: '1st Place - Liberty Mutual Hackathon',

    role: 'Mobile Developer & Team Lead',
    roleDescription:
      'Created a crash-detection Android app using voice + sensors to auto-trigger FNOL claims',

    impact:
      'Won top prize for tech innovation and real-world customer impact. Demonstrated early understanding of mobile sensor integration and voice recognition technologies before they became mainstream.',

    features: [
      'Voice recognition for crash detection',
      'Sensor data integration (accelerometer, gyroscope)',
      'Automatic First Notice of Loss (FNOL) claims',
      'Real-time crash detection algorithms',
      'Android native development',
    ],

    images: {
      hero: '/images/logos/libertymutual-logo.jpeg',
    },

    stats: {
      duration: '48 hours',
      teamSize: '3 engineers',
      achievement: '1st Place',
    },

    links: [
      {
        label: 'Watch the demo video',
        url: '/hackathons/liberty-mutual',
        icon: 'youtube',
      },
    ],
  },
];
