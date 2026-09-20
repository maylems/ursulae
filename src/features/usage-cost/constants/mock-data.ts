// Static presentation config for the Usage & Cost view — colors and labels
// only. Actual usage numbers come from the backend (see ../api).

export type Provider = 'openai' | 'anthropic' | 'meta' | 'deepseek';

// Fixed, theme-independent colors so each provider stays visually distinct
// regardless of which of the app's color themes is active.
export const providerColors: Record<Provider, string> = {
  openai: '#10a37f',
  anthropic: '#d97757',
  meta: '#e4405f',
  deepseek: '#64748b'
};

export const providerLabels: Record<Provider, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  meta: 'Meta',
  deepseek: 'Deepseek'
};

export type UsageStatus = 'success' | 'error' | 'throttled';

export const statusStyles: Record<UsageStatus, string> = {
  success: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/20',
  error: 'bg-destructive/15 text-destructive border-destructive/20',
  throttled: 'bg-amber-500/15 text-amber-500 border-amber-500/20'
};
