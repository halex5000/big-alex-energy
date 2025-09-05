export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  href: string;
  external?: boolean;
  company?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'vue-sdk',
    title: 'Introducing the LaunchDarkly Vue SDK',
    description:
      "We're excited to share that now, thanks to the release of our new Vue SDK, it's never been easier to launch darkly with a Vue app.",
    date: 'Oct 13, 2022',
    readTime: '8 min read',
    tags: ['Vue.js', 'SDK', 'Feature Flags', 'JavaScript', 'Frontend'],
    href: 'https://launchdarkly.com/blog/introducing-the-launchdarkly-vue-sdk/',
    external: true,
    company: 'LaunchDarkly',
  },
  {
    id: 'database-migration',
    title: 'How to Migrate a Database',
    description:
      "In this post, you'll gain a high-level view of database migrations, common terminology, motivation for migrating databases, and common pitfalls along with their solutions.",
    date: 'Mar 07, 2023',
    readTime: '12 min read',
    tags: [
      'Database',
      'Migration',
      'Best Practices',
      'DevOps',
      'Risk Management',
    ],
    href: 'https://launchdarkly.com/blog/how-to-migrate-a-database/',
    external: true,
    company: 'LaunchDarkly',
  },
  {
    id: 'aws-reinvent-2022',
    title: 'AWS re:Invent 2022 Recapped',
    description:
      "A comprehensive recap of AWS re:Invent 2022, covering the latest announcements, key sessions, and insights from the world's largest cloud computing conference.",
    date: 'Dec 2022',
    readTime: '10 min read',
    tags: ['AWS', 're:Invent', 'Cloud', 'Conference', 'Recap'],
    href: 'https://launchdarkly.com/blog/aws-reinvent-2022-recapped/',
    external: true,
    company: 'LaunchDarkly',
  },
];
