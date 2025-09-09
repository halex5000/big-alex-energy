'use client';

import { useEffect, useState } from 'react';
import { ThemeColors } from '@/contexts/theme-context';

interface BootSequenceProps {
  onComplete: () => void;
  colors: ThemeColors;
}

export function BootSequence({ onComplete, colors }: BootSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const bootSteps = [
    'halex9000 boot sequence initiated…',
    '',
    'Loading core modules: resume, projects, ego, flair…',
    'Loading bigalexenergy…',
    '',
    'CLI ready. Type help for available commands.',
    '',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < bootSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return prev;
        }
      });
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, [onComplete, bootSteps.length]);

  // Separate effect for progress animation
  useEffect(() => {
    if (showProgress) {
      const progressTimer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return prev + 3; // Faster animation
        });
      }, 50);

      return () => {
        clearInterval(progressTimer);
      };
    }
  }, [showProgress]);

  // Start progress when we reach the loading step
  useEffect(() => {
    if (currentStep === 3) {
      // "Loading bigalexenergy…" step
      setShowProgress(true);
    }
  }, [currentStep]);

  return (
    <div className={`${colors.background} ${colors.text} font-mono p-4`}>
      {bootSteps.slice(0, currentStep + 1).map((step, index) => (
        <div key={index} className="mb-1">
          {step === 'Loading bigalexenergy…' && showProgress ? (
            <span>
              {step}{' '}
              {Array.from({ length: 16 }, (_, i) =>
                i < Math.floor(progress / 6.25) ? '█' : '░'
              ).join('')}{' '}
              {progress}%
            </span>
          ) : (
            <span>{step}</span>
          )}
        </div>
      ))}
    </div>
  );
}
