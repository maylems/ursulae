// Static placeholder data for the Errors view.
// Frontend-only — will be replaced by real usage_events filtered on status != success.

export type PolicyAction = 'warn' | 'throttle' | 'switch' | 'block' | 'none';

export type ErrorLogEntry = {
  id: string;
  timestamp: string;
  provider: string;
  model: string;
  feature: string;
  errorType: string;
  message: string;
  action: PolicyAction;
};

export const errorLog: ErrorLogEntry[] = [
  {
    id: '1',
    timestamp: 'Jan 7, 03:09 PM',
    provider: 'openai',
    model: 'gpt-4o',
    feature: 'research-agent',
    errorType: 'rate_limit',
    message: 'Rate limit exceeded (429) after 3 retries',
    action: 'throttle'
  },
  {
    id: '2',
    timestamp: 'Jan 7, 03:11 PM',
    provider: 'anthropic',
    model: 'claude-3-5-sonnet',
    feature: 'code-review-agent',
    errorType: 'budget_threshold',
    message: 'Agent budget at 82% — throttled to reduce burn rate',
    action: 'throttle'
  },
  {
    id: '3',
    timestamp: 'Jan 7, 02:58 PM',
    provider: 'openai',
    model: 'gpt-4o',
    feature: 'research-agent',
    errorType: 'runaway_loop',
    message: 'Detected 14 repeated identical calls in 60s — request blocked',
    action: 'block'
  },
  {
    id: '4',
    timestamp: 'Jan 7, 02:41 PM',
    provider: 'google',
    model: 'gemini-1.5-flash',
    feature: 'summarizer',
    errorType: 'timeout',
    message: 'Upstream provider timeout after 30s',
    action: 'none'
  },
  {
    id: '5',
    timestamp: 'Jan 7, 02:20 PM',
    provider: 'openai',
    model: 'gpt-4o',
    feature: 'support-agent',
    errorType: 'daily_cap',
    message: 'Daily budget cap reached — switched to gpt-4o-mini',
    action: 'switch'
  },
  {
    id: '6',
    timestamp: 'Jan 7, 01:55 PM',
    provider: 'anthropic',
    model: 'claude-3-haiku',
    feature: 'support-agent',
    errorType: 'invalid_key',
    message: 'API key returned 401 — marked invalid',
    action: 'block'
  }
];

export const errorStats = {
  totalErrors24h: errorLog.length,
  errorRatePercent: 2.4,
  blockedRequests: errorLog.filter((e) => e.action === 'block').length,
  mostCommon: 'rate_limit'
};

export const actionStyles: Record<PolicyAction, string> = {
  warn: 'bg-amber-500/15 text-amber-500 border-amber-500/20',
  throttle: 'bg-orange-500/15 text-orange-500 border-orange-500/20',
  switch: 'bg-blue-500/15 text-blue-500 border-blue-500/20',
  block: 'bg-destructive/15 text-destructive border-destructive/20',
  none: 'bg-muted text-muted-foreground border-transparent'
};
