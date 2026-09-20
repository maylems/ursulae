import type { Provider } from '@/features/usage-cost/constants/mock-data';

export type PolicyAction = 'none' | 'warn' | 'throttle' | 'switch' | 'block';

// Matches ai-financial-control-backend's GET /errors response.
export type ErrorLogEntry = {
  id: string;
  occurredAt: string;
  provider: Provider;
  model: string;
  feature: string | null;
  errorType: string | null;
  message: string | null;
  policyAction: PolicyAction;
};

export type ErrorLogStats = {
  totalErrors: number;
  errorRatePercent: number;
  blockedRequests: number;
  mostCommon: string | null;
};

export type ErrorLog = {
  since: string;
  stats: ErrorLogStats;
  events: ErrorLogEntry[];
};
