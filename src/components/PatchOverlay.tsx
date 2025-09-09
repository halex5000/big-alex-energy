'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X, Send, Trash2 } from 'lucide-react';
import { callPatchAI, mockPatchResponse } from '@/lib/patch-api';
import { dispatchPatchAction } from '@/lib/dispatchPatchAction';
import { usePatchConversation } from '@/hooks/usePatchConversation';

export interface ChatMessage {
  sender: 'user' | 'patch';
  text: string;
  avatar?: string;
  action?: {
    type: 'scrollTo' | 'highlight' | 'revealEasterEgg' | 'navigate';
    payload: string;
  };
}

interface PatchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Map ASCII faces to avatar images with fallback to smiling
function getAvatarImage(asciiFace: string): string {
  const faceMap: Record<string, string> = {
    '(o_~)': '/images/avatars/patch-winking.png', // cheeky or clever
    '(^_^)': '/images/avatars/patch-smiling.png', // encouraging
    '(•‿•)': '/images/avatars/patch-smiling.png', // smugly satisfied
    '(•_•)': '/images/avatars/patch-winking.png', // judging (wink for sass)
    '(¬_¬)': '/images/avatars/patch-sus.png', // sus/suspicious
    '(-_-)': '/images/avatars/patch-bored.png', // bored
    '(>_<)': '/images/avatars/patch-frustrated.png', // frustrated
    '(x_x)': '/images/avatars/patch-error.png', // error
    '(O_O)': '/images/avatars/patch-surprised.png', // surprised
    '(o_o)': '/images/avatars/patch-thinking.png', // thinking
    '(★_★)': '/images/avatars/patch-excited.png', // excited
  };

  // Fallback to smiling avatar if specific emotion not found
  return faceMap[asciiFace] || '/images/avatars/patch-smiling.png';
}

export function PatchOverlay({ isOpen, onClose }: PatchOverlayProps) {
  const router = useRouter();
  const { messages, addMessage, clearConversation, isLoaded } =
    usePatchConversation();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !isLoaded) return;

    const userMessage: ChatMessage = {
      sender: 'user',
      text: inputValue.trim(),
    };

    addMessage(userMessage);
    setInputValue('');
    setIsTyping(true);

    // Call Patch AI API
    try {
      const patchResponse = await callPatchAI(userMessage.text);
      addMessage(patchResponse);
      setIsTyping(false);

      // Dispatch action if exists
      if (patchResponse.action) {
        if (patchResponse.action.type === 'navigate') {
          // Handle navigation with router
          router.push(patchResponse.action.payload);
        } else {
          dispatchPatchAction(patchResponse.action);
        }
      }
    } catch (error) {
      console.error('Patch AI error:', error);
      // Fallback to mock response
      const patchResponse = mockPatchResponse(userMessage.text);
      addMessage(patchResponse);
      setIsTyping(false);

      if (patchResponse.action) {
        if (patchResponse.action.type === 'navigate') {
          router.push(patchResponse.action.payload);
        } else {
          dispatchPatchAction(patchResponse.action);
        }
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-black border-2 border-green-400 rounded-lg shadow-2xl font-mono z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-green-400 bg-green-900/20">
        <div className="flex items-center gap-3">
          <span className="text-green-400 font-bold text-lg">Patch</span>
          <div className="relative">
            <Image
              src="/images/avatars/patch-winking.png"
              alt="Patch"
              width={32}
              height={32}
              className="inline-block drop-shadow-lg"
            />
            <div className="absolute -inset-1 bg-green-400/20 rounded-full blur-sm -z-10"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearConversation}
            className="text-green-400 hover:text-green-300 transition-colors"
            title="Clear conversation"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={onClose}
            className="text-green-400 hover:text-green-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {!isLoaded ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-green-400 text-sm">
              Loading conversation...
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  message.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-2 rounded ${
                    message.sender === 'user'
                      ? 'bg-green-900/30 text-green-100'
                      : 'bg-green-800/20 text-green-300'
                  }`}
                >
                  {message.sender === 'patch' && message.avatar && (
                    <div className="flex items-center gap-2 text-sm text-green-400 mb-2">
                      <span className="font-semibold">Patch</span>
                      <div className="relative">
                        <Image
                          src={getAvatarImage(message.avatar)}
                          alt="Patch avatar"
                          width={24}
                          height={24}
                          className="inline-block drop-shadow-md"
                        />
                        <div className="absolute -inset-0.5 bg-green-400/10 rounded-full blur-sm -z-10"></div>
                      </div>
                      <span className="text-green-300">&gt;</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{message.text}</div>
                </div>
              </div>
            ))}
          </>
        )}

        {isTyping && (
          <div className="flex items-start">
            <div className="bg-green-800/20 text-green-300 p-2 rounded max-w-[80%]">
              <div className="flex items-center gap-2 text-sm text-green-400 mb-2">
                <span className="font-semibold">Patch</span>
                <div className="relative">
                  <Image
                    src="/images/avatars/patch-winking.png"
                    alt="Patch thinking"
                    width={24}
                    height={24}
                    className="inline-block drop-shadow-md"
                  />
                  <div className="absolute -inset-0.5 bg-green-400/10 rounded-full blur-sm -z-10"></div>
                </div>
                <span className="text-green-300">&gt;</span>
              </div>
              <div className="flex items-center gap-1">
                <span>thinking</span>
                <div className="flex gap-1">
                  <div
                    className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-green-400 p-3">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Patch anything..."
            className="flex-1 bg-black text-green-400 border border-green-400 rounded px-3 py-2 focus:outline-none focus:border-green-300 placeholder-green-600"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-green-600 hover:bg-green-500 disabled:bg-green-800 disabled:cursor-not-allowed text-black px-3 py-2 rounded transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
