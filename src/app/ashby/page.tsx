'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft, Mail } from 'lucide-react';
import { trackDownloadClick, trackExternalLink } from '@/lib/analytics';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import react-pdf to avoid SSR issues
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), {
  ssr: false,
});
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), {
  ssr: false,
});

export default function AshbyCoverLetterPage() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set up PDF.js worker on client side
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.mjs',
        import.meta.url
      ).toString();
    });
  }, []);
  const handleDownloadPDF = () => {
    trackDownloadClick('ashby-cover-letter.pdf');
    // Create download link and trigger download
    const link = document.createElement('a');
    link.href = '/ashby-cover-letter.pdf';
    link.download = 'Alex_Hardman_Ashby_Cover_Letter.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReachOut = () => {
    trackExternalLink('Email Contact');
    window.open(
      'mailto:alex@alexhardman.dev?subject=Ashby Engineering Leadership Opportunity',
      '_blank'
    );
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
    setIsLoading(false);
    console.error('PDF load error:', error);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                The Kind of Engineering Culture Worth Building
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">
                Real ownership. Clarity over process. Engineers empowered to
                build and own.
              </p>
              <p className="text-lg text-muted-foreground">
                That&apos;s the kind of team I build — and the kind I want to
                help grow at Ashby.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  🧠 Engineering Leader
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  🚀 Startup Speed × 🏢 Enterprise Scale
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  🤓 Optimization Nerd
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  🏆 Hackathon Winner x2
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              {/* PDF Controls */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Cover Letter — Alex Hardman for Ashby
                </h3>
                {numPages && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                      disabled={pageNumber <= 1}
                    >
                      Previous
                    </Button>
                    <span>
                      Page {pageNumber} of {numPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setPageNumber(Math.min(numPages, pageNumber + 1))
                      }
                      disabled={pageNumber >= numPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>

              {/* PDF Document */}
              <div className="flex justify-center">
                <div className="border border-border rounded-lg overflow-hidden shadow-lg">
                  {isLoading && (
                    <div className="w-[600px] h-[800px] flex items-center justify-center bg-muted">
                      <div className="text-center space-y-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="text-sm text-muted-foreground">
                          Loading PDF...
                        </p>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="w-[600px] h-[800px] flex items-center justify-center bg-muted">
                      <div className="text-center space-y-4">
                        <p className="text-red-500">{error}</p>
                        <Button onClick={handleDownloadPDF} className="gap-2">
                          <Download className="w-4 h-4" />
                          Download Instead
                        </Button>
                      </div>
                    </div>
                  )}

                  <Document
                    file="/ashby-cover-letter.pdf"
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    className="hidden md:block"
                  >
                    <Page
                      pageNumber={pageNumber}
                      width={900}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>

                  {/* Mobile Fallback */}
                  <div className="md:hidden p-6 text-center space-y-4">
                    <p className="text-muted-foreground">
                      For the best reading experience on mobile, please download
                      the cover letter.
                    </p>
                    <Button
                      onClick={handleDownloadPDF}
                      size="lg"
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download Cover Letter
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-4"
        >
          <Card>
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-4">
                Thanks for taking a look. I&apos;d love to connect.
              </h3>
              <p className="text-muted-foreground mb-6">
                If the culture you&apos;re building at Ashby resonates with how
                I lead, I&apos;d be excited to chat more about what we could
                build together.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button onClick={handleDownloadPDF} size="lg" className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Cover Letter
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReachOut}
                  size="lg"
                  className="gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Reach Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
