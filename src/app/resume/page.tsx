'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from '@/components/ui/external-link';
import { Button } from '@/components/ui/button';
import { Download, Mail, MapPin, Linkedin, Github } from 'lucide-react';
import Image from 'next/image';
import { resumeData } from '@/data/resume';
import { getIconForCard } from '@/lib/career-icons';
import { trackDownloadClick, trackExternalLink } from '@/lib/analytics';

export default function ResumePage() {
  const handleDownloadPDF = () => {
    trackDownloadClick('alex-hardman-resume.pdf');
    // Open PDF in new tab for download
    window.open('/alex-hardman-resume.pdf', '_blank');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with Download Button */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border mr-80">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Resume</h1>
          <Button onClick={handleDownloadPDF} className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div id="resume" className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Personal Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold">{resumeData.personalInfo.name}</h1>
          <p className="text-xl text-muted-foreground">
            {resumeData.personalInfo.title}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              <ExternalLink
                href={`mailto:${resumeData.personalInfo.email}`}
                className="hover:text-indigo-400 transition-colors duration-300"
                onClick={() =>
                  trackExternalLink(
                    `mailto:${resumeData.personalInfo.email}`,
                    'Email'
                  )
                }
              >
                {resumeData.personalInfo.email}
              </ExternalLink>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {resumeData.personalInfo.location}
            </div>
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              <ExternalLink
                href={resumeData.personalInfo.linkedin}
                className="hover:text-indigo-400 transition-colors duration-300"
                onClick={() =>
                  trackExternalLink(
                    resumeData.personalInfo.linkedin,
                    'LinkedIn'
                  )
                }
              >
                LinkedIn
              </ExternalLink>
            </div>
            {resumeData.personalInfo.github && (
              <div className="flex items-center gap-1">
                <Github className="w-4 h-4" />
                <ExternalLink
                  href={resumeData.personalInfo.github}
                  className="hover:text-indigo-400 transition-colors duration-300"
                  onClick={() =>
                    trackExternalLink(resumeData.personalInfo.github!, 'GitHub')
                  }
                >
                  GitHub
                </ExternalLink>
              </div>
            )}
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {resumeData.summary}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            {resumeData.experience.title}
          </h2>
          <div className="space-y-6">
            {resumeData.experience.items.map((job, index) => (
              <Card
                key={index}
                className="hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {job.logo && (
                          <Image
                            src={job.logo}
                            alt={`${job.company} logo`}
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain"
                          />
                        )}
                        <span className="font-semibold text-muted-foreground">
                          {job.company}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {job.location}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {job.duration}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {job.description && (
                    <p className="text-muted-foreground mb-4">
                      {job.description}
                    </p>
                  )}
                  {job.achievements && job.achievements.length > 0 && (
                    <div className="space-y-3">
                      {job.achievements.map((achievement, achievementIndex) => {
                        const IconComponent = getIconForCard(
                          job.title,
                          achievementIndex
                        );
                        return (
                          <div
                            key={achievementIndex}
                            className="group relative"
                          >
                            <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-all duration-200">
                              <IconComponent className="inline w-4 h-4 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                              <span className="text-sm leading-relaxed group-hover:text-foreground transition-colors duration-200">
                                {achievement}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {job.technologies && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-6">Skills & Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <Card
                key={category}
                className="hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer"
              >
                <CardHeader>
                  <CardTitle className="text-lg">{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="text-sm text-muted-foreground"
                      >
                        • {skill}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Awards & Recognition */}
        {resumeData.awards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Awards & Recognition</h2>
            <div className="space-y-4">
              {resumeData.awards.map((award, index) => (
                <Card
                  key={index}
                  className="hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer"
                >
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg">{award.title}</h3>
                    <p className="text-muted-foreground">{award.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {award.location} • {award.duration}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {award.description}
                    </p>
                    {award.achievements && (
                      <div className="mt-3 space-y-2">
                        {award.achievements.map(
                          (achievement, achievementIndex) => {
                            const IconComponent = getIconForCard(
                              award.title,
                              achievementIndex
                            );
                            return (
                              <div
                                key={achievementIndex}
                                className="group relative"
                              >
                                <div className="flex items-start space-x-3 p-1 rounded-lg hover:bg-muted/50 transition-all duration-200">
                                  <IconComponent className="inline w-3 h-3 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                                  <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                                    {achievement}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Patents */}
        {resumeData.patents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Patents</h2>
            <div className="space-y-4">
              {resumeData.patents.map((patent, index) => (
                <Card
                  key={index}
                  className="hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer"
                >
                  <CardContent className="pt-6">
                    <h3 className="font-semibold text-lg">{patent.title}</h3>
                    <p className="text-muted-foreground">{patent.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {patent.location} • {patent.duration}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {patent.description}
                    </p>
                    {patent.achievements && (
                      <div className="mt-3 space-y-2">
                        {patent.achievements.map(
                          (achievement, achievementIndex) => {
                            const IconComponent = getIconForCard(
                              patent.title,
                              achievementIndex
                            );
                            return (
                              <div
                                key={achievementIndex}
                                className="group relative"
                              >
                                <div className="flex items-start space-x-3 p-1 rounded-lg hover:bg-muted/50 transition-all duration-200">
                                  <IconComponent className="inline w-3 h-3 text-muted-foreground mt-1 flex-shrink-0 group-hover:text-foreground transition-all duration-200" />
                                  <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-200">
                                    {achievement}
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-3xl font-bold mb-6">
            {resumeData.education.title}
          </h2>
          <div className="space-y-4">
            {resumeData.education.items.map((edu, index) => (
              <Card
                key={index}
                className="hover:scale-105 hover:shadow-lg transition-transform duration-300 cursor-pointer"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{edu.title}</h3>
                      <p className="text-muted-foreground">{edu.company}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.location} • {edu.duration}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    {edu.description}
                  </p>
                  {edu.achievements && (
                    <ul className="mt-3 space-y-1">
                      {edu.achievements.map((achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span className="text-sm text-muted-foreground">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* CLI CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center pt-8 space-y-4"
        >
          <p className="text-sm text-muted-foreground">View in CLI Mode</p>
          <ExternalLink
            href="/cli"
            className="inline-flex items-center gap-2 px-3 py-1 bg-green-900 text-green-400 border border-green-600 rounded-md hover:bg-green-800 transition-colors duration-200 font-mono text-xs"
          >
            <span>⚡</span>
            <span>halex9000 CLI</span>
          </ExternalLink>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center pt-8"
        >
          <ExternalLink
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-indigo-400 hover:underline transition-colors duration-300"
          >
            ← Back to Home
          </ExternalLink>
        </motion.div>
      </div>
    </div>
  );
}
