export interface ResumeSection {
  title: string;
  items: ResumeItem[];
}

export interface ResumeItem {
  title: string;
  company: string;
  location: string;
  duration: string;
  description?: string;
  achievements?: (string | { main: string; sub: string[] })[];
  technologies?: string[];
  logo?: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    location: string;
    linkedin: string;
    github?: string;
  };
  summary: string;
  experience: ResumeSection;
  education: ResumeSection;
  skills: {
    [key: string]: string[];
  };
  awards: ResumeItem[];
  certifications: ResumeItem[];
  patents: ResumeItem[];
}

export const resumeData: ResumeData = {
  personalInfo: {
    name: 'Alex Hardman',
    title: 'Inventor · Engineer · Leader · Disruptor',
    email: 'alex@bigalexenergy.com',
    location: 'Boston, MA',
    linkedin: 'https://linkedin.com/in/alexhardman',
    github: 'https://github.com/halex5000',
  },

  summary:
    'Engineering Leader and Platform Architect with deep enterprise roots and startup-speed instincts. Known for leading high-performing teams, building experimentation platforms serving 50B+ user experiences annually, and scaling real-time systems to 50M+ daily lookups. Patented inventor, hackathon winner, and global conference speaker (AWS re:Invent, QCon). Energetic, empathetic, and relentlessly curious, I operate at the intersection of technical precision and human connection, turning complexity into capability and helping teams deliver with clarity, speed, and impact.',

  experience: {
    title: 'Experience',
    items: [
      {
        title: 'Head of Experimentation & Optimization',
        company: 'Klaviyo',
        location: 'Boston, MA',
        duration: '2023 - 2025',
        achievements: [
          "Directed strategy and re-architecture of Klaviyo's experimentation platform, powering 50B+ user experiences annually across email, SMS, and onsite",
          'Delivered a Go-based prototype that replaced Python bottlenecks, enabling hundreds of millions of assignments in seconds: a 40x performance improvement',
          'Led design and launch of ML-driven features leveraging Bayesian optimization and personalization, driving measurable conversion gains',
          'Launched GenAI-powered subject line A/B testing, boosting adoption by 50%+, with users selecting AI suggestions in 82% of tests and beating original subject lines in 57% of campaigns',
          'Authored a drop-in Redis→ElastiCache Serverless migration playbook, unlocking five-figure annual savings across the AI & Analytics pillar',
          'Architected anomaly detection and forecasting workflows to improve data quality and enterprise planning, powered by Athena and Snowflake',
          'Drove evolution of platform architecture to support extensibility and resilience, spanning EC2, Istio, Docker, DynamoDB, ElastiCache, and Apache Pulsar',
          'Built and led a high-performing team of engineers and data scientists, mentoring multiple engineers to promotion and leadership roles',
          'Interviewed 50+ candidates across engineering and product roles; contributed directly to dozens of successful hires across the pillar through hands-on technical interviewing, sourcing, and leveling',
        ],
        technologies: [
          'Go',
          'Python',
          'Redis',
          'AWS',
          'ElastiCache',
          'Athena',
          'Snowflake',
          'EC2',
          'Istio',
          'Docker',
          'MySQL',
          'DynamoDB',
          'Apache Pulsar',
          'Bayesian Optimization',
          'GenAI',
          'Machine Learning',
          'A/B Testing',
        ],
        logo: '/images/logos/klaviyo-logo.jpeg',
      },
      {
        title: 'Developer Platform Advocate',
        company: 'LaunchDarkly',
        location: 'Remote',
        duration: '2022 - 2023',
        achievements: [
          'Built full-stack demo applications and architectural reference patterns showcasing feature flags, progressive delivery, and AWS Serverless adoption across modern engineering stacks',
          'Translated complex platform capabilities into accessible, actionable patterns through system diagrams, live coding, and developer-first storytelling',
          {
            main: 'Delivered technical talks on platform resilience, incident response, and modernization strategy to global engineering audiences, reaching thousands through international conferences and online events',
            sub: [
              '"Security Incident Monitoring, Mitigation & Metrics Using Feature Flags" at AWS re:Invent, Las Vegas, 2022 (600+ live attendees)',
              '"Raising the Bar on Resilience: Designing Systems for Resilience at Scale" at QCon, London, 2023',
              '"Mitigating the Madness of Migration in Modernization" at LaunchDarkly Galaxy, Chicago, 2023',
              '"Talking Migration with LaunchDarkly: How to Ship Platforms as Features" live webinar',
            ],
          },
          "Redesigned LaunchDarkly's architecture page and created technical enablement content that brought clarity and confidence to engineering leaders and buyers",
        ],
        technologies: [
          'Feature Flags',
          'Progressive Delivery',
          'AWS Serverless',
          'Frontend',
          'Backend',
          'Webinars',
          'Conference Speaking',
          'Technical Writing',
          'YouTube',
          'Blog Posts',
        ],
        logo: '/images/logos/LaunchDarkly-logo.jpeg',
      },
      {
        title: 'Senior Engineering Manager',
        company: 'Capital One',
        location: 'McLean, VA',
        duration: '2021 - 2022',
        achievements: [
          "Led the team of engineers behind Capital One Shopping's real-time price comparison engine, serving 50M+ lookups daily and billions of transactions",
          'Architected and scaled distributed systems to support millions of daily active users, leveraging Docker, Node.js, PostgreSQL, Redis, and Cassandra',
          'Launched a real-time hotel shopping experience with geospatial search; cut reference data load times by 320x (8 hours → 90 seconds), eliminating stale data and weekly downtime',
          'Inventor on U.S. Patent 11,562,416, automating digital gift card acquisition and redemption to enable real-time fulfillment and improve reliability, speed, and customer experience at enterprise scale',
        ],
        technologies: [
          'Java',
          'Node.js',
          'PostgreSQL',
          'Redis',
          'Cassandra',
          'Docker',
          'React',
          'PostGIS',
        ],
        logo: '/images/logos/capitalone-logo.jpeg',
      },
      {
        title: 'Platform Architect (Director level)',
        company: 'Liberty Mutual Insurance',
        location: 'Boston, MA',
        duration: '2019 - 2021',
        achievements: [
          "Directed the architecture for a serverless, event-driven backbone that unified workflows across Liberty's $6B Specialty insurance platform using API Gateway, DynamoDB, Lambda, EventBridge, SNS, and SQS. This involved connecting legacy systems and cloud-native no-code platforms, enabling teams to integrate with looser coupling",
          'Championed modernization across the organization, bridging policy administration and underwriting with cloud-native, loosely coupled services',
          'Mentored engineers, tech leads, scrum masters, and product owners across multiple squads; helped managers and directors navigate cloud transformation, system integration, and agile delivery at enterprise scale',
          'Partnered with business stakeholders to align engineering and product priorities; influenced org-wide strategy for modernization and integration velocity',
          'Delivered internal accelerators using AWS CDK, reusable serverless modules, and CLI plugins that reduced service onboarding from weeks to days and scaled serverless adoption across the organization',
          'Shaped the data architecture strategy across DynamoDB and relational databases; designed secure APIs with API Gateway, Lambda, and S3 that balanced responsiveness, delivery speed, and reliability',
          'Introduced modern automated testing practices with Playwright, Node.js, and Jest, cutting test cycles from days to minutes',
        ],
        technologies: [
          'AWS',
          'Lambda',
          'DynamoDB',
          'API Gateway',
          'EventBridge',
          'SNS',
          'SQS',
          'MongoDB',
          'RDS',
        ],
        logo: '/images/logos/libertymutual-logo.jpeg',
      },
    ],
  },

  education: {
    title: 'Education',
    items: [
      {
        title: 'B.S., Business Management',
        company: 'Granite State College',
        location: 'Concord, NH',
        duration: '2002 - 2006',
        description:
          'Focused on business management with emphasis on technology and systems thinking. Graduated Summa Cum Laude with highest honors.',
      },
    ],
  },

  skills: {
    'Architecture & Leadership': [
      'Distributed Systems',
      'Event-Driven Architecture',
      'Serverless Design',
      'Experimentation Platforms',
      'Cost Optimization',
    ],
    'Cloud & Infrastructure': [
      'AWS (Lambda, EventBridge, DynamoDB, S3, Athena, ElastiCache)',
      'Docker',
      'Pulsar',
      'Snowflake',
    ],
    'Languages & Frameworks': [
      'Go',
      'Node.js / JavaScript',
      'React',
      'Java',
      'SQL / NoSQL',
    ],
  },

  awards: [
    {
      title: 'Winner - Klaviyo AI Hackathon',
      company: 'Klaviyo',
      location: 'Boston, MA',
      duration: '2025',
      description:
        'Led a team to design and prototype an AI-powered onboarding assistant in 72 hours, selected as the top project out of 55 teams. Accelerated engineer ramp from 30 days to 4 days, enabling faster contributions, earlier product releases, and projected $1M+ in annual savings.',
    },
    {
      title: 'Winner - Liberty Mutual Hackathon',
      company: 'Auto FNOL Build',
      location: 'Boston, MA',
      duration: '2013',
      description:
        'Crash detection Android app using voice + sensors. Auto-trigger First Notice of Loss claims, won top prize for tech innovation with real-world customer impact.',
    },
  ],

  certifications: [
    {
      title: 'AWS Certified Solutions Architect',
      company: 'Amazon Web Services',
      location: 'Remote',
      duration: '2022',
      description:
        'Validated expertise in designing distributed systems on AWS',
      achievements: ['Passed with 90%+ score', 'Renewed annually'],
    },
  ],

  patents: [
    {
      title: 'Real-Time Digital Gift Card Acquisition and Redemption System',
      company: 'U.S. Patent 11,562,416',
      location: 'United States',
      duration: '2021',
      description:
        'Inventor on a patented system that automates digital gift card issuance and redemption across high-volume enterprise rewards platforms',
      achievements: [
        'Enables real-time delivery across thousands of vendors',
        'Supports millions of users with high reliability',
        'Reduces third-party errors and improves customer experience',
      ],
    },
  ],
};
