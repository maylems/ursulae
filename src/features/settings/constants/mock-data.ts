// Static placeholder data for the Settings view.
// Frontend-only — API keys will be encrypted and persisted once the DB is wired up.

export type ApiKeyProvider = 'openai' | 'anthropic' | 'google' | 'mistral';

export type ConnectedApiKey = {
  id: string;
  provider: ApiKeyProvider;
  label: string;
  lastFour: string;
  status: 'active' | 'invalid';
  lastSynced: string;
};

export const connectedApiKeys: ConnectedApiKey[] = [
  {
    id: '1',
    provider: 'openai',
    label: 'Production',
    lastFour: '3f9a',
    status: 'active',
    lastSynced: '5 min ago'
  },
  {
    id: '2',
    provider: 'anthropic',
    label: 'research-agent',
    lastFour: 'b21c',
    status: 'active',
    lastSynced: '12 min ago'
  }
];

export const providerLabelMap: Record<ApiKeyProvider, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google',
  mistral: 'Mistral'
};
