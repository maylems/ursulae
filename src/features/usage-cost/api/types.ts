import type { Provider } from '../constants/mock-data';

// Matches GET /usage/summary. totalCost is the reconciled provider total:
// proxiedCost (through Fivv, attributable) + externalCost (reported by the
// provider but not seen by the proxy).
export type UsageSummary = {
  since: string;
  byProvider: {
    provider: Provider;
    totalCost: number;
    proxiedCost: number;
    externalCost: number;
    totalTokens: number;
  }[];
};

// Matches GET /usage/stats
export type UsageStats = {
  since: string;
  avgCostPerRequest: number;
  totalTokens: number;
  outputInputRatio: number;
  costPer1kTokens: number;
  modelCount: number;
  providerCount: number;
};

// Matches GET /usage/by-model
export type ModelUsage = {
  model: string;
  provider: Provider;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  percent: number;
};

export type UsageByModel = {
  since: string;
  models: ModelUsage[];
};

export type UsageEventStatus = 'success' | 'error' | 'throttled';

// Matches GET /usage/events
export type UsageEvent = {
  id: string;
  occurredAt: string;
  // 'external' rows are provider-reported usage that did not go through the proxy.
  source: 'proxy' | 'external';
  provider: Provider;
  model: string;
  feature: string | null;
  promptTokens: number;
  completionTokens: number;
  costUsd: string;
  latencyMs: number | null;
  status: UsageEventStatus;
};

export type UsageEvents = {
  since: string;
  events: UsageEvent[];
};
