export interface CareerHighlight {
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

export const careerHighlights: CareerHighlight[] = [
  {
    logo: '/images/logos/klaviyo-logo.jpeg',
    title: '🏆 Klaviyo AI Hackathon Winner (2025)',
    company: 'Klaviyo',
    tagline: 'Viyo: AI Onboarding That Ships Code by Day 4. Built in 72 Hours.',
    descriptionBullets: [
      'Built and led the top-ranked AI project out of 55 teams, architected for speed, clarity, and impact',
      'Delivered Viyo, an onboarding assistant that gets engineers from day zero to first PR in 4 days, slashing ramp time by 85%',
      'Automated manager prep, ticket assignment, and personalized onboarding using GPT-4o, Slack, and n8n workflow automation',
      "Shipped AI-powered Q&A with live integration to Klaviyo's internal troubleshooting bot just hours before judging",
      'Projected $1M+ annual impact through earlier contributions, faster product delivery, and reduced manager lift',
    ],
    links: [
      {
        label: 'Read the full story',
        url: '/hackathons/viyo',
        icon: 'external',
      },
    ],
  },
  {
    logo: '/images/logos/klaviyo-logo.jpeg',
    title: '🗺️ Head of Experimentation & Optimization',
    company: 'Klaviyo',
    tagline: 'Built to Scale. Architected to Last.',
    descriptionBullets: [
      "Directed strategy and architecture for Klaviyo's experimentation platform, enabling 50B+ user experiences annually across email, SMS, push, WhatsApp, and onsite.",
      'Led design and delivery of self-optimizing features using Bayesian optimization and personalization, driving measurable conversion gains at scale.',
      'Replaced Python bottlenecks with a blazing-fast Go prototype (40× faster), assigning hundreds of millions of recipients in under a second with 80% less memory and single-digit nanosecond latency per assignment.',
      'Unlocked five-figure infrastructure savings annually by migrating from self-hosted Redis to ElastiCache Serverless and creating a drop-in adoption playbook.',
    ],
    links: [
      {
        label: 'Klaviyo optimization performance guide',
        url: 'https://www.klaviyo.com/customer-resources/optimize-performance',
        icon: 'external',
      },
    ],
  },
  {
    logo: '/images/logos/launchdarkly-logo.jpeg',
    title: '🎤 Conference Speaker',
    company: 'LaunchDarkly',
    tagline: 'Live Demos. Real Code. Global Reach.',
    descriptionBullets: [
      'Took the stage at AWS re:Invent, QCon London, and LaunchDarkly Galaxy to demo real-world use cases with live code, storytelling, and dark-launch drama.',
      'Reached audiences globally and Fortune 100 leaders, inspiring confidence in feature management and enabling safer, faster delivery at scale.',
      'Served as a technical storyteller and educator, breaking down complex systems through live talks, webinars, blogs, and YouTube demos that made capabilities click.',
      'Created high-impact enablement content and redesigned the architecture page to help technical buyers evaluate LaunchDarkly with clarity and speed.',
    ],
    links: [
      {
        label: 'LaunchDarkly blog posts',
        url: '/blogs/launchdarkly',
        icon: 'blog',
      },
      {
        label: 'AWS re:Invent 2022',
        url: '/talks/reinvent-22',
        icon: 'youtube',
      },
      {
        label: 'Migration Talk',
        url: '/talks/migration-webinar',
        icon: 'youtube',
      },
    ],
  },
  {
    logo: '/images/logos/capitalone-logo.jpeg',
    title: '🧠 Inventor on U.S. Patent 11,562,416',
    company: 'Capital One',
    tagline: 'Innovation at Scale. Fulfillment at Speed.',
    descriptionBullets: [
      'Inventor on a patented system that automates digital gift card issuance and redemption across high-volume enterprise rewards platforms',
      'Re-architected fulfillment flow for speed and reliability, enabling real-time delivery across thousands of vendors and millions of users',
      "Boosted transaction velocity, reduced third-party errors, and improved the end-to-end customer experience across Capital One's largest-scale rewards programs",
    ],
    links: [
      {
        label: 'View patent details',
        url: '/patents/realtime-gift-card',
        icon: 'patent',
      },
    ],
  },
  {
    logo: '/images/logos/capitalone-logo.jpeg',
    title: '🗺️ Senior Engineering Manager',
    company: 'Capital One',
    tagline: 'Patented Performance at Scale.',
    descriptionBullets: [
      "Led the team behind Capital One Shopping's real-time price comparison engine, powering 50M+ daily lookups and billions of transactions.",
      'Architected and scaled systems using Docker, Node.js, PostgreSQL, Redis, and Cassandra to serve millions of active users.',
      'Launched a real-time geospatial hotel search engine with Docker, Redis, React, and PostGIS. Cut load times by 320× (8 hours → 90 seconds), eliminated weekly downtime, and ended stale data for good.',
      'Named inventor on U.S. Patent 11,562,416 for automating gift card acquisition and redemption to enable real-time fulfillment and improve customer experience.',
    ],
  },
  {
    logo: '/images/logos/libertymutual-logo.jpeg',
    title: '🗺️ Platform & Cloud Architect (Director Level)',
    company: 'Liberty Mutual',
    tagline: 'Architecting Scale. Accelerating Delivery.',
    descriptionBullets: [
      "Architected a serverless, event-driven backbone for Liberty's specialty insurance platform using API Gateway, DynamoDB, Lambda, EventBridge, SNS, and SQS, enabling faster, loosely coupled integrations across underwriting, policy engines, and systems of record.",
      'Shaped data and integration strategy across DynamoDB, MongoDB Atlas, and RDS, aligning engineering and product priorities across squads at enterprise scale.',
      'Delivered a unified data platform that reduced integration time from weeks to hours, enabling rapid product experimentation and faster time-to-market for new insurance products.',
    ],
  },
  {
    logo: '/images/logos/libertymutual-logo.jpeg',
    title: '🏆 Winner - Liberty Mutual Hackathon (2013)',
    company: 'Liberty Mutual',
    tagline: 'Before ChatGPT. Before LLMs. Still Shipping Smarter Systems.',
    descriptionBullets: [
      'Created a crash-detection Android app using voice + sensors to auto-trigger FNOL claims.',
      'Won top prize for tech innovation and real-world customer impact.',
    ],
    links: [
      {
        label: 'Watch the demo video',
        url: '/hackathons/liberty-mutual',
        icon: 'youtube',
      },
    ],
  },
];
