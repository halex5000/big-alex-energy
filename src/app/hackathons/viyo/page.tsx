'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from '@/components/ui/external-link';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { projects } from '@/data/projects';
import { trackViyoCardClick, trackExternalLink } from '@/lib/analytics';

const viyoProject = projects.find(p => p.id === 'viyo')!;
import {
  ArrowLeft,
  Bot,
  Users,
  Trophy,
  Clock,
  DollarSign,
  Code,
  MessageSquare,
  Calendar,
  Target,
} from 'lucide-react';

export default function ViyoPage() {
  // Track Viyo page view
  React.useEffect(() => {
    trackViyoCardClick();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Back Navigation */}
      <div className="fixed top-6 left-6 z-50">
        <motion.a
          href="/hackathons"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Hackathons
        </motion.a>
      </div>

      {/* Hero Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot className="w-8 h-8 text-primary" />
              <Badge variant="secondary" className="text-sm">
                {viyoProject.company}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              {viyoProject.fullTitle}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              {viyoProject.subtitle}
            </p>
            {viyoProject.isInternal && viyoProject.internalNote && (
              <p className="text-sm text-muted-foreground/70">
                {viyoProject.internalNote}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Trophy className="w-4 h-4 mr-2" />
              {viyoProject.achievement}
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <Clock className="w-4 h-4 mr-2" />
              {viyoProject.duration}
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              <DollarSign className="w-4 h-4 mr-2" />
              {viyoProject.savings}
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* My Role Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                My Leadership & Role
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Vision & Direction
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {viyoProject.roleDescription}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Technical Execution
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {viyoProject.impact}
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Context Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                What We Were Solving
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <Card className="border-2">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6 bg-primary/5 p-4 rounded-r-lg">
                    <blockquote className="text-lg md:text-xl font-medium italic leading-relaxed">
                      &ldquo;In the US, on average, it takes new engineers up to
                      30 days to complete their first PR. Now&mdash;with
                      Viyo&mdash;they can PR by Day 4. And managers? No heavy
                      lifting required.&rdquo;
                    </blockquote>
                    <div className="mt-4 text-sm text-muted-foreground">
                      — Blake Schuller, Employee Experience and AI Fluency @
                      Klaviyo
                    </div>
                    <div className="mt-2">
                      <ExternalLink
                        href="https://www.linkedin.com/posts/blakeschuller_winning-the-klaviyo-ai-hackathon-was-not-activity-7366538099549548546-QxwG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAKjousBsyMCThwNnWkiEYv7OYIcBJU2x7Q"
                        className="text-xs text-primary hover:text-primary/80 transition-colors"
                        onClick={() =>
                          trackExternalLink(
                            'https://www.linkedin.com/posts/blakeschuller_winning-the-klaviyo-ai-hackathon-was-not-activity-7366538099549548546-QxwG',
                            'Blake LinkedIn Post'
                          )
                        }
                      >
                        Read the full post on LinkedIn →
                      </ExternalLink>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-lg md:text-xl font-medium">
                      So how do you turn Day 4 PRing into a repeatable, scalable
                      reality?
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Meet Viyo Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Meet Viyo</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
              <p className="text-lg text-muted-foreground">
                Our AI-accelerated onboarding assistant with personality
              </p>
            </div>

            <Card className="border-2">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <p className="text-lg md:text-xl leading-relaxed text-center text-muted-foreground">
                    We built Viyo to handle the hardest parts of onboarding, so
                    engineers could focus on shipping, not guessing.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">
                            Slack-native AI-accelerated onboarding assistant
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">
                            Automatically fetches a Jira ticket before Day 1
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Code className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">
                            Builds a customized onboarding plan tailored to the
                            onboarding task
                          </h4>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">
                            Adapts based on front-end vs back-end role
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">
                            Real-time Q&A powered by AI
                          </h4>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">
                            Manager notified when progress begins, no extra
                            check-ins needed
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card className="border-2 overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src={viyoProject.images.happy || viyoProject.images.hero}
                    alt="Happy Viyo"
                    width={300}
                    height={300}
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>

              <Card className="border-2 overflow-hidden">
                <CardContent className="p-0">
                  <Image
                    src="/images/hackathons/viyo/winking-viyo.jpeg"
                    alt="Winking Viyo"
                    width={300}
                    height={300}
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Screenshot Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                See Viyo in Action
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <Card className="border-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src="/images/hackathons/viyo/demo-screenshot.png"
                    alt="Viyo AI Assistant Demo Screenshot"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-lg text-muted-foreground">
              Viyo routes a Jira ticket, builds a curriculum, and checks in with
              the manager, all before the new hire starts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">The Results</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center border-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Day 4 PRing</h3>
                  <p className="text-muted-foreground">Achieved</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">$974K/year</h3>
                  <p className="text-muted-foreground">Projected savings</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">1st Place</h3>
                  <p className="text-muted-foreground">Hackathon Winner</p>
                </CardContent>
              </Card>

              <Card className="text-center border-2">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">55 Teams</h3>
                  <p className="text-muted-foreground">Competed</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why It Matters Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Why It Matters</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <Card className="border-2">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    Viyo wasn&apos;t just a cool hackathon project. It
                    reimagined how companies can scale onboarding with clarity,
                    confidence, and speed.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    It&apos;s what happens when AI meets real workflows, built
                    by a team that understands both.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">The Team</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-6 h-6 text-primary" />
                    Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="font-semibold">Alex Hardman</li>
                    <li>Aidan Petti</li>
                    <li>Cody Patnaude</li>
                    <li>Ari Amiri</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-6 h-6 text-primary" />
                    People / Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Blake Schuller</li>
                    <li>Erin Henry</li>
                    <li>Alec Harrises</li>
                    <li>Nick Cilia</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Feedback Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                What the Team Said
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
              <p className="text-lg text-muted-foreground">
                Feedback from our amazing team members
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-2 bg-primary/5">
                <CardContent className="p-8">
                  <blockquote className="text-base md:text-lg font-medium italic leading-relaxed">
                    &ldquo;From our time working together on the hackathon,
                    there are so many things I could give Alex kudos for, but
                    I&apos;d like to specifically mention the fact that, on the
                    morning of the last day, before driving into the office,
                    Alex got on his cricut so that we could customize our team
                    shirts. I mean, above and beyond ha! From our short time
                    working together on team New Guys, I get the sense that this
                    probably isn&apos;t super atypical for those who get to work
                    with you regularly, Alex. Thanks for the vibes you
                    brought!&rdquo;
                  </blockquote>
                  <div className="mt-4 text-sm text-muted-foreground">
                    — Erin Henry, People Team
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-primary/5">
                <CardContent className="p-8">
                  <blockquote className="text-base md:text-lg font-medium italic leading-relaxed">
                    &ldquo;You are truly an inspiration in how you operate in
                    this world! You are detail oriented, positive, thoughtful,
                    proactive, and just such a pleasure to work with!! So lucky
                    to have had you on our hackathon team.&rdquo;
                  </blockquote>
                  <div className="mt-4 text-sm text-muted-foreground">
                    — Blake Schuller, Employee Experience & AI Fluency @ Klaviyo
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-primary/5">
                <CardContent className="p-8">
                  <blockquote className="text-base md:text-lg font-medium italic leading-relaxed">
                    &ldquo;One of a kind! So glad we got to team up!&rdquo;
                  </blockquote>
                  <div className="mt-4 text-sm text-muted-foreground">
                    — Nick Cilia, People Strategy
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Viyo Made Me Do It Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Viyo Made Me Do It
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
              <p className="text-lg text-muted-foreground">
                Custom team shirts made on my Cricut the morning of the final
                demo
              </p>
            </div>

            <Card className="border-2 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src="/images/hackathons/viyo/viyo-made-me-do-it.jpeg"
                    alt="Alex Hardman wearing custom Viyo team shirt"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <ExternalLink
                href="https://www.linkedin.com/posts/halex9000_after-two-years-at-the-end-of-august-i-activity-7369723662968569857-0P5r?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAKjousBsyMCThwNnWkiEYv7OYIcBJU2x7Q"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
                onClick={() =>
                  trackExternalLink(
                    'https://www.linkedin.com/posts/halex9000_after-two-years-at-the-end-of-august-i-activity-7369723662968569857-0P5r',
                    'Alex LinkedIn Post'
                  )
                }
              >
                Read my full LinkedIn post about the win →
              </ExternalLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Note Section */}
      <section className="scroll-snap-section min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Final Note</h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            </div>

            <Card className="border-2">
              <CardContent className="p-8">
                <div className="text-center space-y-4">
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    I left Klaviyo the same way I arrived: energized, inspired,
                    and determined to leave a lasting mark.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    Viyo was one of many. I helped shift culture, spark
                    collaboration, and drive innovation by rethinking how we
                    onboard, how we experiment, and how we build.
                  </p>
                  <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                    This wasn&apos;t just a project. It was a reflection of how
                    I lead, and what I&apos;ll bring to what&apos;s next.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Back to Projects */}
      <section className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <ExternalLink
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              ← Back to Projects
            </ExternalLink>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <section className="scroll-snap-section min-h-[50vh] flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-lg text-muted-foreground">
              Let&apos;s connect and create the next breakthrough together.
            </p>
            <div className="flex justify-center gap-4">
              <ExternalLink
                href="/resume"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                View Resume
              </ExternalLink>
              <ExternalLink
                href="mailto:alex@bigalexenergy.com?subject=Let's%20Build%20Something%20Amazing&body=Hi%20Alex,%0A%0AI'd%20love%20to%20connect%20and%20discuss%20opportunities%20to%20work%20together.%0A%0ABest%20regards,"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                Get In Touch
              </ExternalLink>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
