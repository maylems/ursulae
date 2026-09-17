// Static placeholder data for the Usage & Cost view.
// Frontend-only for now — will be replaced by real usage_events queries
// once the ingestion job and database are wired up.

export type Provider = 'openai' | 'anthropic' | 'mistral' | 'google' | 'meta' | 'deepseek';

// Fixed, theme-independent colors so each provider stays visually distinct
// regardless of which of the app's color themes is active.
export const providerColors: Record<Provider, string> = {
  openai: '#10a37f',
  anthropic: '#d97757',
  mistral: '#7c5cff',
  google: '#4285f4',
  meta: '#e4405f',
  deepseek: '#64748b'
};

export const providerLabels: Record<Provider, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  mistral: 'Mistral',
  google: 'Google',
  meta: 'Meta',
  deepseek: 'Deepseek'
};

export const usageSummary = {
  modelCount: 14,
  providerCount: 6,
  avgCostPer1kTokens: 0.0064
};

export const usageStats = [
  {
    key: 'avg-cost-request',
    icon: 'calculator' as const,
    value: '$0.0028',
    label: 'Avg Cost / Request'
  },
  {
    key: 'total-tokens',
    icon: 'hash' as const,
    value: '31.4k',
    label: 'Total Tokens'
  },
  {
    key: 'output-input-ratio',
    icon: 'arrowsLeftRight' as const,
    value: '0.38:1',
    label: 'Output/Input Ratio'
  },
  {
    key: 'cost-per-1k',
    icon: 'trendingUp' as const,
    value: '$0.0064',
    label: 'Cost per 1K Tokens'
  }
];

export const modelTokenDistribution = [
  {
    model: 'gpt-4o',
    provider: 'openai' as Provider,
    percent: 71,
    inputTokens: 8600,
    outputTokens: 3400
  },
  {
    model: 'claude-3-5-sonnet',
    provider: 'anthropic' as Provider,
    percent: 11,
    inputTokens: 2100,
    outputTokens: 780
  },
  {
    model: 'gemini-2.5-flash',
    provider: 'google' as Provider,
    percent: 6,
    inputTokens: 1200,
    outputTokens: 560
  },
  {
    model: 'gpt-4o-mini',
    provider: 'openai' as Provider,
    percent: 4,
    inputTokens: 610,
    outputTokens: 260
  }
];

export const tokenLegend = { inputPercent: 46, outputPercent: 21 };

export const costByProvider: { provider: Provider; cost: number }[] = [
  { provider: 'openai', cost: 0.128 },
  { provider: 'anthropic', cost: 0.071 },
  { provider: 'mistral', cost: 0.006 },
  { provider: 'google', cost: 0.004 },
  { provider: 'meta', cost: 0.001 },
  { provider: 'deepseek', cost: 0.0006 }
];

export type UsageStatus = 'success' | 'error' | 'throttled';

export type UsageEvent = {
  id: string;
  timestamp: string;
  model: string;
  provider: Provider;
  feature: string;
  tokensIn: number;
  tokensOut: number;
  cost: number;
  latencyMs: number | null;
  status: UsageStatus;
};

export const usageEvents: UsageEvent[] = [
  {
    id: '1',
    timestamp: 'Jan 7, 03:17 PM',
    model: 'gpt-4o',
    provider: 'openai',
    feature: 'support-agent',
    tokensIn: 200,
    tokensOut: 100,
    cost: 0.0015,
    latencyMs: 600,
    status: 'success'
  },
  {
    id: '2',
    timestamp: 'Jan 7, 03:17 PM',
    model: 'gemini-1.5-flash',
    provider: 'google',
    feature: 'summarizer',
    tokensIn: 120,
    tokensOut: 60,
    cost: 0.0,
    latencyMs: null,
    status: 'success'
  },
  {
    id: '3',
    timestamp: 'Jan 7, 03:16 PM',
    model: 'claude-3-haiku',
    provider: 'anthropic',
    feature: 'support-agent',
    tokensIn: 75,
    tokensOut: 40,
    cost: 0.0001,
    latencyMs: 420,
    status: 'success'
  },
  {
    id: '4',
    timestamp: 'Jan 7, 03:14 PM',
    model: 'gpt-4o-mini',
    provider: 'openai',
    feature: 'data-extraction',
    tokensIn: 340,
    tokensOut: 90,
    cost: 0.0003,
    latencyMs: 380,
    status: 'success'
  },
  {
    id: '5',
    timestamp: 'Jan 7, 03:11 PM',
    model: 'claude-3-5-sonnet',
    provider: 'anthropic',
    feature: 'code-review-agent',
    tokensIn: 1800,
    tokensOut: 650,
    cost: 0.0184,
    latencyMs: 1120,
    status: 'throttled'
  },
  {
    id: '6',
    timestamp: 'Jan 7, 03:09 PM',
    model: 'gpt-4o',
    provider: 'openai',
    feature: 'research-agent',
    tokensIn: 4200,
    tokensOut: 1900,
    cost: 0.0511,
    latencyMs: 2400,
    status: 'error'
  }
];

export const statusStyles: Record<UsageStatus, string> = {
  success: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/20',
  error: 'bg-destructive/15 text-destructive border-destructive/20',
  throttled: 'bg-amber-500/15 text-amber-500 border-amber-500/20'
};
