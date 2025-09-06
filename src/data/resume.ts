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
  achievements?: string[];
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
          "Directed strategy and architecture for Klaviyo's experimentation platform, enabling 50B+ user experiences annually across email, SMS, push, WhatsApp, and onsite",
          'Led design and delivery of self-optimizing features using Bayesian optimization and personalization, driving measurable conversion gains at scale',
          'Delivered a deterministic Go prototype that replaced Python bottlenecks, enabling assignment of hundreds of millions of recipients in seconds with lower memory footprint',
          'Unlocked tens of thousands in infrastructure savings annually by migrating from self-hosted Redis to ElastiCache Serverless and creating a drop-in adoption playbook',
          'Leveraged Athena and Snowflake for forecasting, anomaly detection, defect identification, and improved data accuracy to support enterprise growth',
          'Supported a hybrid stack (EC2, Istio, Docker, MySQL, DynamoDB, Pulsar) built for extensibility, observability, and resilience',
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
          'Pulsar',
          'Bayesian Optimization',
        ],
        logo: '/images/logos/klaviyo-logo.jpeg',
      },
      {
        title: 'Technical Marketing Engineer',
        company: 'LaunchDarkly',
        location: 'Remote',
        duration: '2022 - 2023',
        achievements: [
          "Served as a technical storyteller and educator, translating LaunchDarkly's platform into real-world use cases engineers could adopt with confidence",
          'Built full-stack demo applications showcasing feature flags, progressive delivery, and developer-first workflows across AWS Serverless, frontend, and backend stacks',
          'Delivered high-signal content through webinars, live conference talks, YouTube videos, and blog posts, all focused on making complex systems accessible and actionable',
          "Spoke at AWS re:Invent, QCon London, and LaunchDarkly's Galaxy roadshow. Presented in 1:1 sessions and live demos, drawing engineers in and making complex capabilities click",
          "Redesigned LaunchDarkly's architecture page and created enablement content that brought clarity and confidence to technical buyers",
          'Brought feature management to life for engineers worldwide, using live demos, code, and storytelling to help hundreds of teams across the globe ship faster and safer',
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
          "Led a high-performing team responsible for Capital One Shopping's real-time price comparison engine, serving 50+ million retail price lookups per day and billions of transactions",
          'Architected and scaled systems using Docker, Node.js, PostgreSQL, Redis, and Cassandra to support millions of active users',
          'Launched a hotel shopping experience powered by a real-time geospatial search engine built with Docker, Redis, Node.js, React, PostgreSQL, and PostGIS. Cut load times for hotel reference data by 320× (8 hours → 90 seconds), eliminating stale data and weekly downtime',
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
        title: 'Platform & Cloud Architect (Director Level)',
        company: 'Liberty Mutual',
        location: 'Boston, MA',
        duration: '2019 - 2021',
        achievements: [
          "Directed the architecture for a serverless event-driven backbone using API Gateway, DynamoDB, Lambda, EventBridge, SNS, and SQS to unify workflows across Liberty's specialty insurance platform. The system connected no-code underwriting platforms, policy engines, and systems of record, enabling teams to integrate faster and with looser coupling",
          'Partnered across squads and business stakeholders to align engineering and product priorities and deliver integrations at enterprise scale',
          'Built internal accelerators with AWS CDK, reusable serverless modules, and CLI plugins that reduced service onboarding from weeks to days and spread serverless adoption across the org',
          'Shaped data architecture strategy across DynamoDB, MongoDB Atlas, and relational databases, and designed secure APIs with API Gateway, Lambda, and S3 that balanced speed, compliance, and reliability',
          'Introduced modern automated testing patterns with Playwright, Node.js, and Jest, shrinking test cycles from days to minutes and helping teams evolve from manual QA to continuous delivery',
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
