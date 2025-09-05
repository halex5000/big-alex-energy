'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling down 100px on desktop
      if (window.innerWidth >= 768) {
        setIsVisible(window.scrollY > 100);
      } else {
        // Always visible on mobile
        setIsVisible(true);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-6 right-20 z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/projects"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
        >
          Projects
        </Link>
        <Link
          href="/talks"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
        >
          Talks
        </Link>
        <Link
          href="/blogs"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
        >
          Blog
        </Link>
        <Link
          href="/resume"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
        >
          Resume
        </Link>
      </div>
    </nav>
  );
}
