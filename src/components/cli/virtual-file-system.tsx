import { projects } from '@/data/projects';
import { talks } from '@/data/talks';
import { blogPosts } from '@/data/blogs';
import { resumeData } from '@/data/resume';
import { contactInfo } from '@/data/contact';

export class VirtualFileSystem {
  private structure: Record<
    string,
    | { type: 'directory'; contents: string[] }
    | { type: 'file'; content: string }
  > = {
    '/': {
      type: 'directory',
      contents: ['projects', 'resume', 'talks', 'blogs', 'contact'],
    },
    '/projects': {
      type: 'directory',
      contents: projects.map(p => p.id),
    },
    '/resume': {
      type: 'directory',
      contents: ['overview', 'klaviyo', 'liberty-mutual', 'capital-one'],
    },
    '/talks': {
      type: 'directory',
      contents: talks.map(t => t.id),
    },
    '/blogs': {
      type: 'directory',
      contents: blogPosts.map(b => b.id),
    },
    '/contact': {
      type: 'file',
      content: this.getContactInfo(),
    },
  };

  private getContactInfo() {
    return `Contact Information
====================

Email: ${contactInfo.email}
LinkedIn: ${contactInfo.linkedinUrl}
GitHub: ${resumeData.personalInfo.github || 'Not available'}
Location: ${resumeData.personalInfo.location}

Preferred contact method: Email
Response time: Usually within 24 hours

Note: Use 'cat contact' to view this information
      Use 'cd' to navigate directories only`;
  }

  getPathContents(path: string): string[] | null {
    // Handle root directory
    if (path === '/' || path === '') {
      const rootDir = this.structure['/'];
      return rootDir.type === 'directory' ? rootDir.contents : null;
    }

    const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
    const dir = this.structure[normalizedPath as keyof typeof this.structure];
    return dir?.type === 'directory' ? dir.contents : null;
  }

  getFileContent(path: string): string | null {
    const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;

    // Handle special files
    if (normalizedPath === '/contact') {
      const contactFile = this.structure['/contact'];
      return contactFile.type === 'file' ? contactFile.content : null;
    }

    // Handle project files
    if (normalizedPath.startsWith('/projects/')) {
      const projectId = normalizedPath.split('/')[2];
      const project = projects.find(p => p.id === projectId);
      if (project) {
        return this.formatProject(project);
      }
    }

    // Handle resume files
    if (normalizedPath.startsWith('/resume/')) {
      const resumeSection = normalizedPath.split('/')[2];
      return this.getResumeSection(resumeSection);
    }

    // Handle talk files
    if (normalizedPath.startsWith('/talks/')) {
      const talkId = normalizedPath.split('/')[2];
      const talk = talks.find(t => t.id === talkId);
      if (talk) {
        return this.formatTalk(talk);
      }
    }

    // Handle blog files
    if (normalizedPath.startsWith('/blogs/')) {
      const blogId = normalizedPath.split('/')[2];
      const blog = blogPosts.find(b => b.id === blogId);
      if (blog) {
        return this.formatBlog(blog);
      }
    }

    return null;
  }

  private formatProject(project: {
    title: string;
    description: string;
    tagline: string;
    year: string;
    company?: string;
    status: string;
    tags: string[];
    stats?: Record<string, string>;
    impact?: string;
    features?: string[];
  }): string {
    return `${project.title}
${'='.repeat(project.title.length)}

Description: ${project.description}
Tagline: ${project.tagline}
Year: ${project.year}
Company: ${project.company || 'N/A'}
Status: ${project.status}

Technologies: ${project.tags.join(', ')}

${
  project.stats
    ? `Stats:
${Object.entries(project.stats)
  .map(([key, value]) => `  ${key}: ${value}`)
  .join('\n')}`
    : ''
}

${project.impact ? `Impact: ${project.impact}` : ''}

${
  project.features
    ? `Features:
${project.features.map((feature: string) => `  • ${feature}`).join('\n')}`
    : ''
}`;
  }

  private formatTalk(talk: {
    title: string;
    company: string;
    location: string;
    year: number;
    description: string;
    achievements: string[];
    tags: string[];
  }): string {
    return `${talk.title}
${'='.repeat(talk.title.length)}

Company: ${talk.company}
Location: ${talk.location}
Year: ${talk.year}

Description: ${talk.description}

Achievements:
${talk.achievements.map((achievement: string) => `  • ${achievement}`).join('\n')}

Tags: ${talk.tags.join(', ')}`;
  }

  private formatBlog(blog: {
    title: string;
    date: string;
    readTime: string;
    company?: string;
    description: string;
    tags: string[];
  }): string {
    return `${blog.title}
${'='.repeat(blog.title.length)}

Date: ${blog.date}
Read Time: ${blog.readTime}
${blog.company ? `Company: ${blog.company}` : ''}

Description: ${blog.description}

Tags: ${blog.tags.join(', ')}`;
  }

  private getResumeSection(section: string): string {
    switch (section) {
      case 'overview':
        return `Resume Overview
================

${resumeData.personalInfo.name}
${resumeData.personalInfo.title}

${resumeData.summary}

Contact:
  Email: ${resumeData.personalInfo.email}
  Location: ${resumeData.personalInfo.location}
  LinkedIn: ${resumeData.personalInfo.linkedin}
  ${resumeData.personalInfo.github ? `GitHub: ${resumeData.personalInfo.github}` : ''}`;

      case 'klaviyo':
        const klaviyoJob = resumeData.experience.items.find(job =>
          job.company.toLowerCase().includes('klaviyo')
        );
        return klaviyoJob
          ? this.formatJob(klaviyoJob)
          : 'Klaviyo experience not found';

      case 'liberty-mutual':
        const libertyJob = resumeData.experience.items.find(job =>
          job.company.toLowerCase().includes('liberty')
        );
        return libertyJob
          ? this.formatJob(libertyJob)
          : 'Liberty Mutual experience not found';

      case 'capital-one':
        const capitalJob = resumeData.experience.items.find(job =>
          job.company.toLowerCase().includes('capital')
        );
        return capitalJob
          ? this.formatJob(capitalJob)
          : 'Capital One experience not found';

      default:
        return 'Resume section not found';
    }
  }

  private formatJob(job: {
    title: string;
    company: string;
    duration: string;
    location: string;
    description?: string;
    achievements?: string[];
    technologies?: string[];
  }): string {
    return `${job.title} - ${job.company}
${'='.repeat((job.title + ' - ' + job.company).length)}

Duration: ${job.duration}
Location: ${job.location}

${job.description ? `Description: ${job.description}` : ''}

${
  job.achievements
    ? `Key Achievements:
${job.achievements.map((achievement: string) => `  • ${achievement}`).join('\n')}`
    : ''
}

${job.technologies ? `Technologies: ${job.technologies.join(', ')}` : ''}`;
  }
}
