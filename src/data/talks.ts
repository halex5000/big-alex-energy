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
    title:
      'Security Incident Monitoring, Mitigation & Metrics Using Feature Flags\nAWS re:Invent 2022 – PRT326',
    company: 'AWS re:Invent, 2022 — Las Vegas, NV',
    location: 'Las Vegas, NV',
    duration: '2022',
    description:
      'Modern cloud systems face evolving threats — but real-time feature management gives you new tools to fight back. In this talk, LaunchDarkly and Datadog share how to detect, mitigate, and recover from incidents faster using feature flags to isolate blast radius, test remediations live, and avoid rolling the dice on a full redeploy.',
    achievements: [
      'Security-driven feature flag patterns',
      'Threat detection with observability trade-offs',
      'Real-world examples from LaunchDarkly + Datadog',
    ],
    tags: [
      'Security',
      'Incident Response',
      'Feature Flags',
      'Observability',
      'AWS re:Invent',
    ],
    year: 2022,
    link: '/talks/aws-22',
  },
  {
    id: 'qcon-london-2023',
    title:
      'Raising the Bar on Resilience: Designing Systems for Resilience at Scale\nQCon London 2023',
    company: 'QCon London, March 2023 · London, UK',
    location: 'London, UK',
    duration: '2023',
    description:
      "Failure is predictable. Resilience is intentional. This talk walks through how to isolate failure modes, contain blast radius, and adapt under pressure using feature flags as a core resilience tool. Whether you're scaling fast or navigating a security incident, you'll leave with practical ways to strengthen legacy, brownfield, and greenfield systems alike.",
    achievements: [
      'Real-world resilience design tactics',
      'Containing failure without slowing velocity',
      'Feature flags for graceful degradation',
    ],
    tags: [
      'Resilience',
      'Failure Isolation',
      'Feature Flags',
      'Legacy Systems',
      'Scale',
    ],
    year: 2023,
    link: '/talks/qcon-london-23',
  },
  {
    id: 'launchdarkly-galaxy-2023',
    title:
      'Talking Migration with LaunchDarkly\nHow to Ship Platforms as Features',
    company: 'LaunchDarkly',
    location: 'Online',
    duration: '2023',
    description:
      'You already ship new features with LaunchDarkly. But what if the feature is your infrastructure? This hands-on session walks through platform migration as a product feature, from switching databases to rolling out a new API, using feature flags to tame complexity, control blast radius, and ship infrastructure with confidence.',
    achievements: [
      'Real-world examples of database & API migrations',
      'Live implementation with flags as safety rails',
      "Deep dive into LaunchDarkly's new contexts feature",
    ],
    tags: [
      'Platform Migration',
      'Feature Flags',
      'Contexts',
      'Infrastructure as Product',
      'Live Coding',
    ],
    year: 2023,
    link: '/talks/migration-webinar',
  },
];
