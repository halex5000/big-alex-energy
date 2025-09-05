export interface Talk {
  id: string;
  title: string;
  company: string;
  location: string;
  duration: string;
  description: string;
  achievements: string[];
  tags: string[];
  year: number;
  link?: string;
  videoUrl?: string;
  slidesUrl?: string;
}

export const talks: Talk[] = [
  {
    id: 'aws-reinvent-2022',
    title: 'Feature Flags in Production: Real-World Use Cases',
    company: 'AWS re:Invent 2022',
    location: 'Las Vegas, NV',
    duration: '2022',
    description:
      'Live demonstration of feature flag implementation in production systems with real code and real results',
    achievements: [
      'Reached 500+ attendees',
      'Live coding demonstration',
      'High audience engagement',
    ],
    tags: ['Feature Flags', 'AWS', 'Production', 'Live Demo'],
    year: 2022,
    link: '/talks/aws-22',
  },
  {
    id: 'qcon-london-2023',
    title: 'Building Resilient Systems with Feature Management',
    company: 'QCon London 2023',
    location: 'London, UK',
    duration: '2023',
    description:
      'Technical deep-dive into building resilient systems using feature flags and progressive delivery',
    achievements: [
      'International audience',
      'Technical deep-dive format',
      'Post-talk Q&A session',
    ],
    tags: ['Feature Management', 'Resilience', 'Progressive Delivery', 'QCon'],
    year: 2023,
    link: '/talks/qcon-london-23',
  },
  {
    id: 'launchdarkly-galaxy-2023',
    title: 'Migration Strategies for Feature Flag Adoption',
    company: 'LaunchDarkly Galaxy',
    location: 'San Francisco, CA',
    duration: '2023',
    description:
      'Practical guidance on migrating existing systems to use feature flags effectively',
    achievements: [
      'Customer-focused content',
      'Practical implementation guidance',
      'Interactive workshop format',
    ],
    tags: ['Migration', 'Feature Flags', 'Workshop', 'Implementation'],
    year: 2023,
    link: '/talks/launchdarkly-galaxy',
  },
];
