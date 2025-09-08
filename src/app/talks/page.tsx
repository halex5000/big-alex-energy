'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { talks } from '@/data/talks';
import { getIconForTalk } from '@/lib/career-icons';
import { getYouTubeVideoId, getYouTubeThumbnail } from '@/lib/youtube-utils';
import Image from 'next/image';
import { ExternalLink, Play, FileText } from 'lucide-react';
import { CardFan } from '@/components/ui/card-fan';
import { useState } from 'react';

export default function TalksPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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
              <Card
                className="h-full flex flex-col overflow-hidden group hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredCard(talk.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Hero Image Section with Card Fanning */}
                {talk.heroImage && talk.logos && (
                  <CardFan
                    heroImage={talk.heroImage}
                    logos={talk.logos}
                    alt={`${talk.title} hero image`}
                    gradient={talk.heroGradient}
                    isHovered={hoveredCard === talk.id}
                    useObjectContain={talk.id === 'qcon-london-2023'}
                  />
                )}
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-primary/80 text-primary-foreground">
                      {talk.year}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {talk.location}
                    </span>
                  </div>

                  {/* Logos */}
                  {talk.logos && talk.logos.length > 0 && (
                    <div className="flex items-center gap-3 mb-3">
                      {talk.logos.map((logo, logoIndex) => (
                        <div
                          key={logoIndex}
                          className="relative w-10 h-10 rounded-md overflow-hidden bg-muted/50 flex items-center justify-center"
                        >
                          <Image
                            src={logo}
                            alt={`${talk.company} logo`}
                            fill
                            className="object-contain p-1"
                            sizes="40px"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <h2 className="text-xl font-bold mb-2">{talk.title}</h2>
                  <p className="text-muted-foreground text-sm mb-3 font-medium">
                    {talk.company}
                  </p>

                  <p className="text-muted-foreground text-sm mb-4">
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
                    <div className="mt-auto">
                      {talk.hasVideo && talk.videoUrl ? (
                        <div className="space-y-3">
                          {/* YouTube Thumbnail Preview */}
                          <div className="relative group/thumbnail">
                            <Link href={talk.link} className="block">
                              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted/50">
                                {(() => {
                                  const videoId = getYouTubeVideoId(
                                    talk.videoUrl
                                  );
                                  return videoId ? (
                                    <>
                                      <Image
                                        src={getYouTubeThumbnail(videoId)}
                                        alt={`${talk.title} video thumbnail`}
                                        fill
                                        className="object-cover group-hover/thumbnail:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      />
                                      <div className="absolute inset-0 bg-black/20 group-hover/thumbnail:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                        <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center group-hover/thumbnail:scale-110 transition-transform duration-300">
                                          <Play className="w-6 h-6 text-white ml-1" />
                                        </div>
                                      </div>
                                    </>
                                  ) : null;
                                })()}
                              </div>
                            </Link>
                          </div>
                          <Link
                            href={talk.link}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-indigo-400 hover:underline transition-colors duration-300"
                          >
                            <Play className="w-4 h-4" />
                            {talk.ctaText || 'Watch on YouTube'}
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {/* Conference Branding Preview for QCon */}
                          {talk.id === 'qcon-london-2023' ? (
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-green-500/20 via-emerald-500/10 to-teal-500/20 border border-green-500/30">
                              {/* Faded QCon Logo Background */}
                              <div className="absolute inset-0 opacity-10">
                                <Image
                                  src="/images/logos/qcon-logo.svg"
                                  alt="QCon logo background"
                                  fill
                                  className="object-contain p-8"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                              </div>
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                                <div className="text-green-600 text-lg font-bold mb-2">
                                  QCon London 2023
                                </div>
                                <div className="text-green-500/80 text-sm text-center">
                                  March 2023 • London, UK
                                </div>
                                <div className="text-green-400/60 text-xs mt-2 text-center">
                                  Resilience & Systems Design
                                </div>
                              </div>
                            </div>
                          ) : null}
                          <Link
                            href={talk.link}
                            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-indigo-400 hover:underline transition-colors duration-300 group/link"
                          >
                            {talk.ctaText?.includes('abstract') ? (
                              <FileText className="w-4 h-4" />
                            ) : (
                              <ExternalLink className="w-4 h-4" />
                            )}
                            {talk.ctaText || 'View Talk Details'}
                          </Link>
                        </div>
                      )}
                    </div>
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
