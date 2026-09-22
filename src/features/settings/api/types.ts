export type ApiKeyProvider = 'openai' | 'anthropic' | 'meta' | 'deepseek';
export type ApiKeyStatus = 'active' | 'invalid' | 'revoked';

// Matches ai-financial-control-backend's GET/POST /api-keys response shape
// (never includes the raw/encrypted key).
export type ApiKey = {
  id: string;
  provider: ApiKeyProvider;
  label: string;
  lastFour: string;
  status: ApiKeyStatus;
  lastSyncedAt: string | null;
  createdAt: string;
};

export type ConnectApiKeyPayload = {
  provider: ApiKeyProvider;
  label: string;
  key: string;
};

export const providerLabelMap: Record<ApiKeyProvider, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  meta: 'Meta',
  deepseek: 'Deepseek'
};
