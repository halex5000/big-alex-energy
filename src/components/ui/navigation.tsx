'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackNavigationClick } from '@/lib/analytics';

export function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isCLIPage = pathname === '/cli';
  const [isVisible, setIsVisible] = useState(!isHomePage && !isCLIPage); // Start visible on non-home, non-CLI pages

  useEffect(() => {
    const handleScroll = () => {
      if (isCLIPage) {
        // Never show navigation on CLI page
        setIsVisible(false);
      } else if (isHomePage) {
        // On home page, show navigation after scrolling down 100px on desktop
        if (window.innerWidth >= 768) {
          setIsVisible(window.scrollY > 100);
        } else {
          // Always visible on mobile
          setIsVisible(true);
        }
      } else {
        // On all other pages, always show navigation
        setIsVisible(true);
      }
    };

    // Initial check
    handleScroll();

    if (isHomePage && !isCLIPage) {
      // Only listen to scroll events on home page (not CLI)
      window.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('resize', handleScroll);

    return () => {
      if (isHomePage && !isCLIPage) {
        window.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, [isHomePage, isCLIPage]);

  return (
    <nav
      className={`fixed top-6 right-20 z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
          onClick={() => trackNavigationClick('home')}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
          onClick={() => trackNavigationClick('projects')}
        >
          Projects
        </Link>
        <Link
          href="/talks"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
          onClick={() => trackNavigationClick('talks')}
        >
          Talks
        </Link>
        <Link
          href="/blogs"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
          onClick={() => trackNavigationClick('blogs')}
        >
          Blog
        </Link>
        <Link
          href="/resume"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
          onClick={() => trackNavigationClick('resume')}
        >
          Resume
        </Link>
      </div>
    </nav>
  );
}
