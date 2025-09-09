import { ChatMessage } from '@/components/PatchOverlay';

interface PatchApiRequest {
  message: string;
  honeypot?: string;
  isHuman?: boolean;
  context?: {
    currentPage?: string;
    userAgent?: string;
  };
}

interface PatchApiResponse {
  sender: 'patch';
  text: string;
  avatar: string;
  action?: {
    type: 'scrollTo' | 'highlight' | 'revealEasterEgg' | 'navigate';
    payload: string;
  };
}

export async function callPatchAI(
  message: string,
  conversationHistory?: Array<{
    sender: 'user' | 'patch';
    text: string;
    timestamp: number;
  }>
): Promise<ChatMessage> {
  try {
    const response = await fetch('/.netlify/functions/patch-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        honeypot: '', // Always empty for humans
        isHuman: true, // Frontend claims human interaction
        context: {
          currentPage:
            typeof window !== 'undefined'
              ? window.location.pathname
              : undefined,
          userAgent:
            typeof window !== 'undefined' ? navigator.userAgent : undefined,
          conversationHistory: conversationHistory || [],
        },
      } as PatchApiRequest),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: PatchApiResponse = await response.json();

    return {
      sender: data.sender,
      text: data.text,
      avatar: data.avatar,
      action: data.action,
    };
  } catch (error) {
    console.error('Patch API error:', error);

    // Fallback to mock response on error
    return {
      sender: 'patch',
      text: "I'm having trouble connecting to the matrix right now. Try again in a moment.",
      avatar: '(x_x)',
    };
  }
}

// Fallback mock function for development
export function mockPatchResponse(message: string): ChatMessage {
  const lower = message.toLowerCase();

  if (lower.includes('resume')) {
    return {
      sender: 'patch',
      avatar: '(o_~)',
      text: 'Ah, the resume module. Let me light that up for you.',
      action: { type: 'scrollTo', payload: 'resume' },
    };
  }

  if (lower.includes('project')) {
    return {
      sender: 'patch',
      avatar: '(^_^)',
      text: "Projects, eh? The good stuff. Let me show you what's cooking.",
      action: { type: 'scrollTo', payload: 'projects' },
    };
  }

  if (lower.includes('talk')) {
    return {
      sender: 'patch',
      avatar: '(•‿•)',
      text: "Talks and presentations? Now we're talking.",
      action: { type: 'scrollTo', payload: 'talks' },
    };
  }

  if (lower.includes('help')) {
    return {
      sender: 'patch',
      avatar: '(^_^)',
      text: `I can help you navigate this site. Try asking about:
• "resume" - scroll to experience
• "projects" - see the portfolio  
• "talks" - check presentations
• "contact" - find contact info
• "about" - learn about Alex`,
    };
  }

  return {
    sender: 'patch',
    avatar: '(o_~)',
    text: "I'm not fully wired yet, but I've got some good vibes about this place.",
  };
}
