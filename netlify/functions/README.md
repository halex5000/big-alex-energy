# Patch AI Netlify Functions

This directory contains the Netlify serverless functions for Patch, the AI assistant.

## Functions

### `patch-ai.ts`

Main function that handles OpenAI API calls for Patch's responses.

**Endpoint:** `/.netlify/functions/patch-ai`

**Method:** POST

**Request Body:**

```json
{
  "message": "string",
  "context": {
    "currentPage": "string (optional)",
    "userAgent": "string (optional)"
  }
}
```

**Response:**

```json
{
  "sender": "patch",
  "text": "string",
  "avatar": "string",
  "action": {
    "type": "scrollTo" | "highlight" | "revealEasterEgg",
    "payload": "string"
  }
}
```

## Environment Variables

Set these in your Netlify dashboard:

- `OPENAI_API_KEY` - Your OpenAI API key

## Local Development

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Start local dev server: `netlify dev`
3. Function will be available at `http://localhost:8888/.netlify/functions/patch-ai`

## Deployment

Functions are automatically deployed when you push to your connected Git repository.

## Testing

Run tests with: `npm test`

## Fallback Behavior

If no OpenAI API key is provided, the function will return mock responses to allow development without API costs.
