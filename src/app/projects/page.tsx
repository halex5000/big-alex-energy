'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from '@/components/ui/external-link';
import Image from 'next/image';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Projects
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              A collection of my work - from hackathon winners to production
              systems
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="border-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary/50 h-full hover:scale-105 transform">
                  <CardContent className="p-0 h-full flex flex-col">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="space-y-3 flex-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title.split(' ').map((word, wordIndex) => {
                            // Check if word is an emoji (simple check for non-alphanumeric characters)
                            const isEmoji =
                              /^[^\w\s]+$/.test(word) && word.length <= 4;
                            return isEmoji ? (
                              <span
                                key={wordIndex}
                                className="animate-pulse inline-block"
                              >
                                {word}
                              </span>
                            ) : (
                              <span key={wordIndex}>{word} </span>
                            );
                          })}
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground">
                          {project.tagline}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>

                        {/* Impact Stats */}
                        <div className="space-y-1 mt-3">
                          {project.id === 'viyo' && (
                            <>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>🧠</span>
                                <span>4x faster onboarding (Day 4 PRs)</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>💰</span>
                                <span>$974K+ projected annual savings</span>
                              </div>
                            </>
                          )}
                          {project.id === 'gift-card-patent' && (
                            <>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>⚡</span>
                                <span>
                                  Real-time delivery across thousands of vendors
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>🏆</span>
                                <span>U.S. Patent 11,562,416 awarded</span>
                              </div>
                            </>
                          )}
                          {project.id === 'crash-detection-app' && (
                            <>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>🏆</span>
                                <span>
                                  1st Place at Liberty Mutual hackathon
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>🚗</span>
                                <span>
                                  Auto FNOL claims with voice + sensors
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* View Project Link */}
                      <div className="mt-6 pt-4 border-t border-border">
                        <ExternalLink
                          href={project.href}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          View Project →
                        </ExternalLink>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLI CTA */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground">
              Prefer the terminal?
            </p>
            <ExternalLink
              href="/cli"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-900 text-green-400 border border-green-600 rounded-md hover:bg-green-800 transition-colors duration-200 font-mono text-sm"
            >
              <span>⚡</span>
              <span>halex9000 CLI</span>
            </ExternalLink>
          </motion.div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ExternalLink
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              ← Back to Home
            </ExternalLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
