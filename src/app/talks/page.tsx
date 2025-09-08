'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { talks } from '@/data/talks';
import { getIconForTalk } from '@/lib/career-icons';

export default function TalksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="px-4 py-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Speaking & Talks
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          Sharing knowledge and insights at conferences worldwide
        </motion.p>
      </section>

      {/* Talks Grid */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {talks.map((talk, index) => (
            <motion.div
              key={talk.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Card className="h-full flex flex-col overflow-hidden group hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-primary/80 text-primary-foreground">
                      {talk.year}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {talk.location}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-2">{talk.title}</h2>
                  <p className="text-muted-foreground text-sm mb-4 font-medium">
                    {talk.company}
                  </p>

                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {talk.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    {talk.achievements.map((achievement, achievementIndex) => {
                      const IconComponent = getIconForTalk(
                        talk.id,
                        achievementIndex
                      );
                      return (
                        <div key={achievementIndex} className="group relative">
                          <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
                            <IconComponent className="inline w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                            <span className="text-xs text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                              {achievement}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {talk.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {talk.link && (
                    <Link
                      href={talk.link}
                      className="text-primary hover:text-indigo-400 hover:underline inline-flex items-center text-sm transition-colors duration-300"
                    >
                      View Talk Details →
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Back to Home */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-indigo-400 hover:underline transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
