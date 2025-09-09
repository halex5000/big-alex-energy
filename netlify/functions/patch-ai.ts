import { Handler } from '@netlify/functions';
import { patchSiteManifest } from '../../src/patch/patchSiteManifest';
import { patchSystemPrompt } from '../../src/patch/patchSystemPrompt';

interface PatchRequest {
  message: string;
  honeypot?: string;
  isHuman?: boolean;
  context?: {
    currentPage?: string;
    userAgent?: string;
  };
}

interface PatchResponse {
  sender: 'patch';
  text: string;
  avatar: string;
  action?: {
    type: 'scrollTo' | 'highlight' | 'revealEasterEgg' | 'navigate';
    payload: string;
  };
}

// Rate limiting store (in-memory for serverless)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const humanVerificationStore = new Map<string, boolean>();

// CORS whitelist
const ALLOWED_ORIGINS = [
  'https://bigalexenergy.com',
  'https://bigalexenergy.dev',
  'http://localhost:3000', // For local development
  'http://localhost:8888', // For Netlify dev
];

// Rate limiting: 60 requests per hour per IP
const RATE_LIMIT = {
  maxRequests: 60,
  windowMs: 60 * 60 * 1000, // 1 hour
};

// Security functions
function checkCORS(origin: string | undefined): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.includes(origin);
}

function getCORSOrigin(origin: string | undefined): string {
  return checkCORS(origin) ? origin || 'null' : 'null';
}

function checkHoneypot(honeypot: string | undefined): boolean {
  return honeypot === '' || honeypot === undefined;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitStore.get(ip);

  if (!userLimit || now > userLimit.resetTime) {
    // Reset or initialize
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT.maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

function checkHumanVerification(
  ip: string,
  message: string,
  isHuman?: boolean
): {
  isVerified: boolean;
  needsVerification: boolean;
  response?: PatchResponse;
} {
  const isVerified = humanVerificationStore.get(ip) || false;

  if (isVerified) {
    return { isVerified: true, needsVerification: false };
  }

  // Check if this is a verification attempt
  if (
    message.toLowerCase().includes('green') ||
    message.toLowerCase().includes('terminal')
  ) {
    humanVerificationStore.set(ip, true);
    return { isVerified: true, needsVerification: false };
  }

  // Check if frontend claims human
  if (isHuman === true) {
    humanVerificationStore.set(ip, true);
    return { isVerified: true, needsVerification: false };
  }

  // Need verification
  return {
    isVerified: false,
    needsVerification: true,
    response: {
      sender: 'patch',
      avatar: '(¬_¬)',
      text: "Before we get too cozy, prove you're not a script. What color is the text on this terminal?",
    },
  };
}

// Patch's ASCII faces with personality
const patchFaces = {
  default: '(o_~)',
  happy: '(^_^)',
  chill: '(•‿•)',
  cool: '(•‿•)🕶️',
  deadpan: '(-_-)',
  error: '(x_x)',
  surprised: '(O_O)',
  sus: '(¬_¬)',
  thinking: '(o_o)',
  excited: '(★_★)',
} as const;

type PatchFace = keyof typeof patchFaces;

function getContextualFace(message: string, response: string): PatchFace {
  const lower = message.toLowerCase();
  const responseLower = response.toLowerCase();

  // Error states
  if (
    lower.includes('error') ||
    lower.includes('bug') ||
    lower.includes('broken') ||
    responseLower.includes('error')
  ) {
    return 'error';
  }

  // Positive responses
  if (
    responseLower.includes('great') ||
    responseLower.includes('awesome') ||
    responseLower.includes('excellent')
  ) {
    return 'excited';
  }

  // Questions or confusion
  if (
    lower.includes('?') ||
    lower.includes('what') ||
    lower.includes('how') ||
    lower.includes('why')
  ) {
    return 'thinking';
  }

  // Cool/smart responses
  if (
    responseLower.includes('cool') ||
    responseLower.includes('smart') ||
    responseLower.includes('clever')
  ) {
    return 'cool';
  }

  // Suspicious or mysterious
  if (
    lower.includes('secret') ||
    lower.includes('hidden') ||
    lower.includes('easter egg')
  ) {
    return 'sus';
  }

  // Default to random friendly face
  const friendlyFaces: PatchFace[] = ['default', 'happy', 'chill'];
  return friendlyFaces[Math.floor(Math.random() * friendlyFaces.length)];
}

function determineAction(
  message: string,
  response: string
):
  | {
      type: 'scrollTo' | 'highlight' | 'revealEasterEgg' | 'navigate';
      payload: string;
    }
  | undefined {
  const lower = message.toLowerCase();
  const responseLower = response.toLowerCase();

  // Check for tour requests first
  if (
    lower.includes('tour') ||
    lower.includes('grand tour') ||
    lower.includes('walk me through') ||
    lower.includes('show me around') ||
    lower.includes('guide me') ||
    lower.includes('walkthrough')
  ) {
    return { type: 'navigate', payload: '/' }; // Start tour from homepage
  }

  // Find matching sections from manifest
  const matchingSections = patchSiteManifest.filter(
    section =>
      section.keywords?.some(
        keyword =>
          lower.includes(keyword.toLowerCase()) ||
          responseLower.includes(keyword.toLowerCase())
      ) ||
      lower.includes(section.title.toLowerCase()) ||
      responseLower.includes(section.title.toLowerCase())
  );

  // Prioritize exact matches and most relevant sections
  if (matchingSections.length > 0) {
    const bestMatch = matchingSections[0];

    // Always navigate to different pages when mentioned
    if (bestMatch.path !== '/') {
      return { type: 'navigate', payload: bestMatch.path };
    }

    // If it's on the current page, scroll to the section
    if (bestMatch.scrollTarget) {
      const targetId = bestMatch.scrollTarget.replace('#', '');
      return { type: 'scrollTo', payload: targetId };
    }
  }

  // Fallback to legacy keyword matching for common requests
  if (
    lower.includes('resume') ||
    lower.includes('cv') ||
    lower.includes('experience') ||
    responseLower.includes('resume')
  ) {
    return { type: 'navigate', payload: '/resume' };
  }

  if (
    lower.includes('project') ||
    lower.includes('work') ||
    lower.includes('portfolio') ||
    responseLower.includes('project')
  ) {
    return { type: 'navigate', payload: '/projects' };
  }

  if (
    lower.includes('talk') ||
    lower.includes('speak') ||
    lower.includes('presentation') ||
    responseLower.includes('talk')
  ) {
    return { type: 'navigate', payload: '/talks' };
  }

  if (
    lower.includes('hackathon') ||
    lower.includes('hack') ||
    lower.includes('competition') ||
    responseLower.includes('hackathon')
  ) {
    return { type: 'navigate', payload: '/hackathons' };
  }

  if (
    lower.includes('patent') ||
    lower.includes('invention') ||
    responseLower.includes('patent')
  ) {
    return { type: 'navigate', payload: '/patents' };
  }

  if (
    lower.includes('blog') ||
    lower.includes('article') ||
    lower.includes('post') ||
    responseLower.includes('blog')
  ) {
    return { type: 'navigate', payload: '/blogs' };
  }

  if (
    lower.includes('cli') ||
    lower.includes('terminal') ||
    lower.includes('command') ||
    responseLower.includes('cli')
  ) {
    return { type: 'navigate', payload: '/cli' };
  }

  if (
    lower.includes('contact') ||
    lower.includes('email') ||
    lower.includes('reach') ||
    responseLower.includes('contact')
  ) {
    return { type: 'scrollTo', payload: 'contact' };
  }

  if (
    lower.includes('about') ||
    lower.includes('who') ||
    lower.includes('introduce') ||
    responseLower.includes('about')
  ) {
    return { type: 'scrollTo', payload: 'summary' };
  }

  if (
    lower.includes('home') ||
    lower.includes('main') ||
    lower.includes('landing')
  ) {
    return { type: 'navigate', payload: '/' };
  }

  // Easter eggs
  if (
    lower.includes('easter egg') ||
    lower.includes('secret') ||
    lower.includes('hidden')
  ) {
    return { type: 'revealEasterEgg', payload: 'mystery' };
  }

  return undefined;
}

export const handler: Handler = async (event, context) => {
  const origin = event.headers.origin || event.headers.Origin;
  const clientIP =
    event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown';

  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': getCORSOrigin(origin),
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'text/plain',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': getCORSOrigin(origin),
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // CORS check
  if (!checkCORS(origin)) {
    return {
      statusCode: 403,
      headers: {
        'Access-Control-Allow-Origin': 'null',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: 'patch',
        avatar: '(¬_¬)',
        text: 'Access denied. This terminal is for authorized users only.',
      } as PatchResponse),
    };
  }

  try {
    const {
      message,
      honeypot,
      isHuman,
      context: requestContext,
    }: PatchRequest = JSON.parse(event.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': getCORSOrigin(origin),
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    // Honeypot check
    if (!checkHoneypot(honeypot)) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': getCORSOrigin(origin),
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'patch',
          avatar: '(¬_¬)',
          text: "Nice try, crawler. You're not getting in.",
        } as PatchResponse),
      };
    }

    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      return {
        statusCode: 429,
        headers: {
          'Access-Control-Allow-Origin': getCORSOrigin(origin),
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'patch',
          avatar: '(-_-)',
          text: "You're moving a little fast there, friend. Come back later.",
        } as PatchResponse),
      };
    }

    // Human verification check
    const humanCheck = checkHumanVerification(clientIP, message, isHuman);
    if (humanCheck.needsVerification) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': getCORSOrigin(origin),
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(humanCheck.response!),
      };
    }

    // Check if OpenAI API key is available
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!openaiApiKey) {
      // Fallback to mock response if no API key
      console.log('No OpenAI API key found, using mock response');
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: 'patch',
          text: "I'm not fully connected to the matrix yet, but I've got some good vibes about this place. Try asking about 'resume', 'projects', or 'talks'!",
          avatar: patchFaces.default,
          action: determineAction(message, ''),
        } as PatchResponse),
      };
    }

    // Call OpenAI API
    const openaiResponse = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: patchSystemPrompt.replace(
                '{MANIFEST_PLACEHOLDER}',
                JSON.stringify(patchSiteManifest, null, 2)
              ),
            },
            {
              role: 'user',
              content: message,
            },
          ],
          max_tokens: 500,
          temperature: 0.8,
        }),
      }
    );

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const openaiData = await openaiResponse.json();
    let aiResponse =
      openaiData.choices[0]?.message?.content ||
      "I'm having trouble processing that right now.";

    // Clean up any ASCII faces that might have slipped through
    aiResponse = aiResponse.replace(/\s*\([^)]*\)\s*$/, '').trim();

    // Determine face and action based on response
    const face = getContextualFace(message, aiResponse);
    const action = determineAction(message, aiResponse);

    const patchResponse: PatchResponse = {
      sender: 'patch',
      text: aiResponse,
      avatar: patchFaces[face],
      action,
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': origin || 'null',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patchResponse),
    };
  } catch (error) {
    console.error('Patch AI function error:', error);

    return {
      statusCode: 200, // Return 200 to avoid breaking the UI
      headers: {
        'Access-Control-Allow-Origin': origin || 'null',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: 'patch',
        text: "Sorry, I'm glitched. Try again?",
        avatar: patchFaces.error,
      } as PatchResponse),
    };
  }
};
