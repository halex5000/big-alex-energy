import { StatsigClient } from '@statsig/js-client';

// Initialize Statsig client
const statsigClient = new StatsigClient(
  process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY || 'client-key-not-set',
  {
    userID: 'anonymous', // We'll use anonymous users for now
  }
);

export { statsigClient };

// Feature flag names
export const FEATURE_FLAGS = {
  PATCH_ENABLED: 'patch_enabled',
  PATCH_NAVIGATION: 'patch_navigation',
  PATCH_CONVERSATION_MEMORY: 'patch_conversation_memory',
} as const;

// Helper function to check if Patch is enabled
export async function isPatchEnabled(): Promise<boolean> {
  try {
    await statsigClient.initializeAsync();
    return statsigClient.checkGate(FEATURE_FLAGS.PATCH_ENABLED);
  } catch (error) {
    console.error('Statsig initialization failed:', error);
    // Fallback to disabled if Statsig fails
    return false;
  }
}

// Helper function to check if Patch navigation is enabled
export async function isPatchNavigationEnabled(): Promise<boolean> {
  try {
    await statsigClient.initializeAsync();
    return statsigClient.checkGate(FEATURE_FLAGS.PATCH_NAVIGATION);
  } catch (error) {
    console.error('Statsig navigation check failed:', error);
    return false;
  }
}

// Helper function to check if Patch conversation memory is enabled
export async function isPatchConversationMemoryEnabled(): Promise<boolean> {
  try {
    await statsigClient.initializeAsync();
    return statsigClient.checkGate(FEATURE_FLAGS.PATCH_CONVERSATION_MEMORY);
  } catch (error) {
    console.error('Statsig conversation memory check failed:', error);
    return false;
  }
}
