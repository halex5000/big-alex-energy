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

    // Progress bar animation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, [onComplete, bootSteps.length]);

  return (
    <div className={`${colors.background} ${colors.text} font-mono p-4`}>
      {bootSteps.slice(0, currentStep + 1).map((step, index) => (
        <div key={index} className="mb-1">
          {step === 'Loading bigalexenergy…' ? (
            <div>
              <span>{step}</span>
              <div className="mt-2 w-64 bg-gray-800 rounded-full h-2">
                <div
                  className="bg-green-400 h-2 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm text-gray-400">{progress}%</span>
            </div>
          ) : (
            <span>{step}</span>
          )}
        </div>
      ))}
    </div>
  );
}
