'use client';

import { useState, useEffect } from 'react';
import { ChatMessage } from '@/components/PatchOverlay';

const CONVERSATION_KEY = 'patch-conversation';

export function usePatchConversation() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load conversation from sessionStorage on mount (clears on refresh)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(CONVERSATION_KEY);
        if (saved) {
          const parsedMessages = JSON.parse(saved);
          setMessages(parsedMessages);
        } else {
          // Initialize with welcome message
          setMessages([
            {
              sender: 'patch',
              text: `Hey, I'm Patch, Alex's digital apprentice and resident Site Tour Guide.
Alex says I "have potential," which is either a compliment or a warning.

I can:
• Walk you through the site
• Jump to key sections
• Answer questions (with... varying accuracy)

Just say things like:
• "Give me the grand tour"
• "Where's the resume?"
• "What's up with Viyo?"

I'll do my best to help - or at least look enthusiastic while failing.
Let's explore this thing together.`,
              avatar: '(o_~)',
            },
          ]);
        }
      } catch (error) {
        console.error('Failed to load Patch conversation:', error);
        // Fallback to welcome message
        setMessages([
          {
            sender: 'patch',
            text: `Hey, I'm Patch, Alex's digital apprentice and resident Site Tour Guide.
Alex says I "have potential," which is either a compliment or a warning.

I can:
• Walk you through the site
• Jump to key sections
• Answer questions (with... varying accuracy)

Just say things like:
• "Give me the grand tour"
• "Where's the resume?"
• "What's up with Viyo?"

I'll do my best to help - or at least look enthusiastic while failing.
Let's explore this thing together.`,
            avatar: '(o_~)',
          },
        ]);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save conversation to sessionStorage whenever it changes (persists during navigation)
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(CONVERSATION_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error('Failed to save Patch conversation:', error);
      }
    }
  }, [messages, isLoaded]);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const clearConversation = () => {
    setMessages([
      {
        sender: 'patch',
        text: 'Conversation cleared. Ready for a fresh start! What can I help you explore?',
        avatar: '(o_~)',
      },
    ]);
  };

  return {
    messages,
    addMessage,
    clearConversation,
    isLoaded,
  };
}
