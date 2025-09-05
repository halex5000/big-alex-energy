'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/data/blogs';

export default function BlogsPage() {
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
          My Blog Posts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 text-lg text-muted-foreground"
        >
          Technical insights and real-world experiences
        </motion.p>
      </section>

      {/* Blog Posts Grid */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="h-full flex flex-col overflow-hidden group">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <Badge className="bg-primary/80 text-primary-foreground">
                      {post.date}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  {post.company && (
                    <p className="text-muted-foreground text-sm mb-4 font-medium">
                      {post.company}
                    </p>
                  )}

                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Link
                    href={post.href}
                    className="text-primary hover:underline inline-flex items-center text-sm"
                    target={post.external ? '_blank' : undefined}
                    rel={post.external ? 'noopener noreferrer' : undefined}
                  >
                    Read Post →
                  </Link>
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
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
}
