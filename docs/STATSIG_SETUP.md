# Statsig Feature Flags Setup

This project uses Statsig for feature flag management, specifically for controlling Patch AI functionality.

## Environment Variables

Add these to your `.env.local` file:

```bash
# OpenAI API Key for Patch AI
OPENAI_API_KEY=your_openai_api_key_here

# Statsig Client Key for Feature Flags (Frontend)
NEXT_PUBLIC_STATSIG_CLIENT_KEY=your_statsig_client_key_here

# Statsig Server Secret for Feature Flags (Backend/Netlify Functions)
STATSIG_SERVER_SECRET=your_statsig_server_secret_here
```

## Statsig Setup

1. **Create a Statsig account** at [statsig.com](https://statsig.com)
2. **Create a new project** for this application
3. **Get your keys** from the Statsig dashboard:
   - **Client SDK Key** (for frontend) - add to `NEXT_PUBLIC_STATSIG_CLIENT_KEY`
   - **Server Secret** (for backend) - add to `STATSIG_SERVER_SECRET`
4. **Add both keys** to your `.env.local` file
5. **Add the server secret** to your Netlify environment variables

## Feature Flags

The following feature flags are available:

- `patch_enabled` - Controls whether Patch AI is enabled at all
- `patch_navigation` - Controls Patch's navigation functionality
- `patch_conversation_memory` - Controls Patch's conversation memory

## Usage

The feature flags are automatically checked when the app loads. If Statsig is unavailable, Patch will be disabled by default (fail-safe).

## Development

For local development, you can:

1. Use the Statsig dashboard to toggle flags
2. Set up local overrides in the Statsig dashboard
3. Use the Statsig CLI for local testing

## Production

In production, you can:

1. Toggle flags instantly without code deployment
2. A/B test different Patch behaviors
3. Gradually roll out Patch to different user segments
4. Monitor feature flag performance in the Statsig dashboard
