import { ChatMessage } from '@/components/PatchOverlay';

const patchFaces = {
  default: '(o_~)',
  happy: '(^_^)',
  chill: '(•‿•)',
  cool: '(•‿•)🕶️',
  deadpan: '(-_-)',
  error: '(x_x)',
  surprised: '(O_O)',
  sus: '(¬_¬)',
} as const;

type PatchFace = keyof typeof patchFaces;

function getRandomFace(): PatchFace {
  const faces: PatchFace[] = ['default', 'happy', 'chill'];
  return faces[Math.floor(Math.random() * faces.length)];
}

function getContextualFace(message: string): PatchFace {
  const lower = message.toLowerCase();

  if (
    lower.includes('error') ||
    lower.includes('bug') ||
    lower.includes('broken')
  ) {
    return 'error';
  }
  if (
    lower.includes('wow') ||
    lower.includes('amazing') ||
    lower.includes('awesome')
  ) {
    return 'surprised';
  }
  if (
    lower.includes('suspicious') ||
    lower.includes('weird') ||
    lower.includes('strange')
  ) {
    return 'sus';
  }
  if (
    lower.includes('cool') ||
    lower.includes('sick') ||
    lower.includes('rad')
  ) {
    return 'cool';
  }
  if (
    lower.includes('boring') ||
    lower.includes('meh') ||
    lower.includes('whatever')
  ) {
    return 'deadpan';
  }

  return getRandomFace();
}

export function mockPatchResponse(message: string): ChatMessage {
  const lower = message.toLowerCase();
  const face = getContextualFace(message);

  // Resume section
  if (
    lower.includes('resume') ||
    lower.includes('cv') ||
    lower.includes('experience')
  ) {
    return {
      sender: 'patch',
      avatar: patchFaces[face],
      text: "Ah, the resume module. Let me light that up for you. It's got all the juicy career details.",
      action: { type: 'scrollTo', payload: 'resume' },
    };
  }

  // Projects section
  if (
    lower.includes('project') ||
    lower.includes('work') ||
    lower.includes('portfolio')
  ) {
    return {
      sender: 'patch',
      avatar: patchFaces[face],
      text: "Projects, eh? The good stuff. Let me show you what's cooking in the lab.",
      action: { type: 'scrollTo', payload: 'projects' },
    };
  }

  // Talks section
  if (
    lower.includes('talk') ||
    lower.includes('speak') ||
    lower.includes('presentation') ||
    lower.includes('conference')
  ) {
    return {
      sender: 'patch',
      avatar: patchFaces[face],
      text: "Talks and presentations? Now we're talking. Let me scroll you to the knowledge zone.",
      action: { type: 'scrollTo', payload: 'talks' },
    };
  }

  // Hackathons section
  if (
    lower.includes('hackathon') ||
    lower.includes('hack') ||
    lower.includes('competition')
  ) {
    return {
      sender: 'patch',
      avatar: patchFaces[face],
      text: 'Hackathons! The wild west of coding. Let me show you the chaos and creativity.',
      action: { type: 'scrollTo', payload: 'hackathons' },
    };
  }

  // Contact section
  if (
    lower.includes('contact') ||
    lower.includes('email') ||
    lower.includes('reach') ||
    lower.includes('get in touch')
  ) {
    return {
      sender: 'patch',
      avatar: patchFaces[face],
      text: 'Want to connect? Smart move. Let me point you to the contact zone.',
      action: { type: 'scrollTo', payload: 'contact' },
    };
  }

  // About section
  if (
    lower.includes('about') ||
    lower.includes('who') ||
    lower.includes('introduce') ||
    lower.includes('tell me about')
  ) {
    return {
      sender: 'patch',
      avatar: patchFaces[face],
      text: "About Alex? That's a deep dive. Let me show you the summary section first.",
      action: { type: 'scrollTo', payload: 'summary' },
    };
  }

  // Easter eggs
  if (
    lower.includes('easter egg') ||
    lower.includes('secret') ||
    lower.includes('hidden')
  ) {
    return {
      sender: 'patch',
      avatar: patchFaces.sus,
      text: "Easter eggs? I know where they're buried. But I'm not telling. Not yet.",
      action: { type: 'revealEasterEgg', payload: 'mystery' },
    };
  }

  // Help commands
  if (
    lower.includes('help') ||
    lower.includes('commands') ||
    lower.includes('what can you do')
  ) {
    return {
      sender: 'patch',
      avatar: patchFaces.happy,
      text: `I can help you navigate this site. Try asking about:
• "resume" - scroll to experience
• "projects" - see the portfolio
• "talks" - check presentations
• "hackathons" - view competitions
• "contact" - find contact info
• "about" - learn about Alex
• "easter egg" - discover secrets

I'm not fully wired yet, but I've got the basics covered.`,
    };
  }

  // Greetings
  if (
    lower.includes('hello') ||
    lower.includes('hi') ||
    lower.includes('hey') ||
    lower.includes('greetings')
  ) {
    return {
      sender: 'patch',
      avatar: patchFaces.happy,
      text: "Hey there. I'm Patch, your terminal guide. What brings you to this corner of the web?",
    };
  }

  // Compliments
  if (
    lower.includes('cool') ||
    lower.includes('awesome') ||
    lower.includes('nice') ||
    lower.includes('great')
  ) {
    return {
      sender: 'patch',
      avatar: patchFaces.cool,
      text: 'Thanks. I try to keep things interesting around here. What else can I show you?',
    };
  }

  // Default responses
  const defaultResponses = [
    "I'm not fully connected to the matrix yet, but I've got some good vibes about this place.",
    "That's an interesting question. I'm still learning the ropes around here.",
    "Hmm, let me think about that. I'm a work in progress, you know.",
    "I'm picking up what you're putting down, but I need more data to be useful.",
    "The terminal is still booting up, but I'm here to help where I can.",
    "I'm not sure about that one. Maybe try asking about the main sections?",
    "That's beyond my current scope, but I'm getting smarter every day.",
    "I'm still mapping this digital landscape. What section interests you?",
  ];

  return {
    sender: 'patch',
    avatar: patchFaces[face],
    text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
  };
}
