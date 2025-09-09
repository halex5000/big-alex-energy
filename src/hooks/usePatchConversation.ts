'use client';

import { useState, useEffect } from 'react';
import { ChatMessage } from '@/components/PatchOverlay';
import { isPatchConversationMemoryEnabled } from '@/lib/statsig';

const CONVERSATION_KEY = 'patch-conversation';

export function usePatchConversation() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load conversation from sessionStorage on mount (clears on refresh)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(CONVERSATION_KEY);
        console.log(
          'Loading conversation from sessionStorage:',
          saved ? 'found' : 'not found'
        );

        if (saved) {
          const parsedMessages: ChatMessage[] = JSON.parse(saved);
          console.log('Loaded messages:', parsedMessages.length);

          // Check if this is just the welcome message (no user interaction)
          const hasUserMessages = parsedMessages.some(
            (msg: ChatMessage) => msg.sender === 'user'
          );
          if (hasUserMessages) {
            console.log('Found conversation with user messages, loading it');
            setMessages(parsedMessages);
          } else {
            console.log(
              'Found only welcome message, clearing and starting fresh'
            );
            sessionStorage.removeItem(CONVERSATION_KEY);
            setMessages([
              {
                sender: 'patch',
                text: `sup i'm Patch, alex's intern but like… with wifi for a brain
wanna explore this site? i can jump to pages, give a tour, or spill tea on alex's resume.

just say "show me around" or "resume plz"`,
                avatar: '(o_~)',
              },
            ]);
          }
        } else {
          console.log(
            'No saved conversation, initializing with welcome message'
          );
          // Initialize with welcome message
          setMessages([
            {
              sender: 'patch',
              text: `sup i'm Patch, alex's intern but like… with wifi for a brain
wanna explore this site? i can jump to pages, give a tour, or spill tea on alex's resume.

just say "show me around" or "resume plz"`,
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
            text: `Hey, I'm Patch - Alex's digital apprentice.

I can walk you through the site, jump to sections, or answer questions.

Try: "Give me the grand tour" or "Where's the resume?"

Let's explore.`,
            avatar: '(o_~)',
          },
        ]);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save conversation to sessionStorage whenever it changes (persists during navigation)
  // Only save if there are actual user messages (not just the welcome message)
  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      const saveConversation = async () => {
        try {
          // Check if conversation memory is enabled
          const memoryEnabled = await isPatchConversationMemoryEnabled();
          if (!memoryEnabled) {
            console.log('Conversation memory disabled by feature flag');
            return;
          }

          const hasUserMessages = messages.some(msg => msg.sender === 'user');
          console.log(
            'Messages:',
            messages.map(m => ({
              sender: m.sender,
              text: m.text.substring(0, 50) + '...',
            }))
          );
          console.log('Has user messages:', hasUserMessages);

          if (hasUserMessages) {
            console.log(
              'Saving conversation to sessionStorage:',
              messages.length,
              'messages'
            );
            sessionStorage.setItem(CONVERSATION_KEY, JSON.stringify(messages));
          } else {
            console.log('No user messages yet, not saving to sessionStorage');
            // Also clear any existing conversation if it's just the welcome message
            sessionStorage.removeItem(CONVERSATION_KEY);
          }
        } catch (error) {
          console.error('Failed to save Patch conversation:', error);
        }
      };

      saveConversation();
    }
  }, [messages, isLoaded]);

  const addMessage = (message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const clearConversation = () => {
    // Clear from sessionStorage first
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(CONVERSATION_KEY);
      console.log('Manually cleared conversation from sessionStorage');
    }

    setMessages([
      {
        sender: 'patch',
        text: 'sup i\'m Patch, alex\'s intern but like… with wifi for a brain\nwanna explore this site? i can jump to pages, give a tour, or spill tea on alex\'s resume.\n\njust say "show me around" or "resume plz"',
        avatar: '(o_~)',
      },
    ]);
  };

  // Add a global clear function for debugging
  if (typeof window !== 'undefined') {
    (
      window as Window & { clearPatchConversation?: () => void }
    ).clearPatchConversation = () => {
      sessionStorage.removeItem(CONVERSATION_KEY);
      console.log('Force cleared Patch conversation');
      window.location.reload();
    };
  }

  return {
    messages,
    addMessage,
    clearConversation,
    isLoaded,
  };
}
