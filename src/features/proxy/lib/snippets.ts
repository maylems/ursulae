// Shared by the Settings > Proxy tab and the marketing landing page, so the
// integration example shown to prospects never drifts from what a real
// connected user sees.
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export const openaiProxySnippet = `import OpenAI from 'openai';

const client = new OpenAI({
  // your own OpenAI key, as usual
  baseURL: '${API_URL}/proxy/openai/v1',
  defaultHeaders: {
    'x-afc-key': 'afc_...',           // your proxy key
    'x-afc-feature': 'support-agent'  // optional tag
  }
});`;

export const anthropicProxySnippet = `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  // your own Anthropic key, as usual
  baseURL: '${API_URL}/proxy/anthropic',
  defaultHeaders: {
    'x-afc-key': 'afc_...',           // your proxy key
    'x-afc-feature': 'support-agent'  // optional tag
  }
});`;
