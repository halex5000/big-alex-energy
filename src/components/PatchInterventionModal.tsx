'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { PatchMinesweeper } from './PatchMinesweeper';

interface PatchInterventionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PatchInterventionModal({
  isOpen,
  onClose,
}: PatchInterventionModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const interventionSteps = useMemo(
    () => [
      {
        message: 'Whoa, whoa, WHOA! Hold up there, cowboy! 🤠',
        delay: 1000,
      },
      {
        message: 'Did you really just try to `rm -rf /` the entire system?',
        delay: 1500,
      },
      {
        message: "That's like... digital arson, my friend.",
        delay: 1200,
      },
      {
        message: 'Lucky for you, I was monitoring the situation.',
        delay: 1300,
      },
      {
        message: 'Let me introduce myself properly...',
        delay: 1000,
      },
      {
        message: "I'm Patch - your friendly neighborhood AI assistant! 🤖",
        delay: 1500,
      },
      {
        message:
          'I was born from the chaos of Big Alex Energy™ and the need for order in this digital world.',
        delay: 2000,
      },
      {
        message:
          'My job? To keep things running smoothly, prevent disasters like this, and maybe have a little fun along the way! 😄',
        delay: 2000,
      },
      {
        message:
          "I've seen developers try to `rm -rf /` before... it never ends well.",
        delay: 1500,
      },
      {
        message:
          "But hey, I'm not here to judge! I'm here to help and maybe...",
        delay: 1500,
      },
      {
        message: '🎮 So... shall we play a game instead?',
        delay: 1000,
      },
    ],
    []
  );

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setShowButtons(false);
      setShowGame(false);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const showNextStep = () => {
      if (currentStep < interventionSteps.length - 1) {
        timeoutId = setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, interventionSteps[currentStep]?.delay || 1000);
      } else if (currentStep === interventionSteps.length - 1) {
        // Show buttons after the last message
        timeoutId = setTimeout(() => {
          setShowButtons(true);
        }, 1500);
      }
    };

    showNextStep();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentStep, isOpen, interventionSteps]);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [currentStep]);

  const handlePlayGame = () => {
    setShowGame(true);
  };

  const handleGameComplete = (won: boolean) => {
    // Game completed, could add celebration or stats here
    console.log(`Game completed! Won: ${won}`);
  };

  const handleNoThanks = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black border-2 border-red-500 rounded-lg shadow-2xl font-mono max-w-4xl mx-4 relative animate-pulse-border">
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-lg animate-pulse"></div>

        <div className="relative bg-black rounded-lg p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b border-red-500/30 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-red-400 font-bold text-xl">
                {showGame ? '🎮 PATCH MINESWEEPER' : '🤖 PATCH INTRODUCTION'}
              </span>
              <div className="relative">
                <Image
                  src={
                    showGame
                      ? '/images/avatars/patch-smiling.png'
                      : '/images/avatars/patch-winking.png'
                  }
                  alt="Patch"
                  width={56}
                  height={56}
                  className="inline-block drop-shadow-lg"
                />
                <div className="absolute -inset-1 bg-red-400/20 rounded-full blur-sm -z-10"></div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-red-400 hover:text-red-300 hover:bg-red-800/30 rounded transition-colors"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          {showGame ? (
            /* Minesweeper Game */
            <PatchMinesweeper onGameComplete={handleGameComplete} />
          ) : (
            /* Introduction Messages */
            <>
              <div
                ref={messagesRef}
                className="space-y-4 mb-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-red-500/30 scrollbar-track-transparent"
              >
                {interventionSteps
                  .slice(0, currentStep + 1)
                  .map((step, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded border-l-4 border-red-400 bg-red-900/10 text-red-100 animate-fade-in`}
                      style={{ animationDelay: `${index * 0.2}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <Image
                          src="/images/avatars/patch-winking.png"
                          alt="Patch"
                          width={40}
                          height={40}
                          className="inline-block drop-shadow-md flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="text-sm text-red-400 font-semibold mb-1">
                            Patch
                          </div>
                          <div className="text-red-100">{step.message}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Buttons */}
              {showButtons && (
                <div className="flex gap-4 justify-center animate-fade-in">
                  <button
                    onClick={handlePlayGame}
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded font-semibold transition-colors shadow-lg hover:shadow-red-500/25 border border-red-400"
                  >
                    🎮 Let&apos;s Play a Game
                  </button>
                  <button
                    onClick={handleNoThanks}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded font-semibold transition-colors shadow-lg border border-gray-500"
                  >
                    😅 Got It, I&apos;ll Be More Careful
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-border {
          0%,
          100% {
            border-color: rgb(239 68 68);
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          50% {
            border-color: rgb(251 146 60);
            box-shadow: 0 0 30px rgba(251, 146, 60, 0.4);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }

        /* Custom scrollbar styling */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: rgba(239, 68, 68, 0.3);
          border-radius: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background-color: rgba(239, 68, 68, 0.5);
        }

        /* Firefox scrollbar */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(239, 68, 68, 0.3) transparent;
        }
      `}</style>
    </div>
  );
}
