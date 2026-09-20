import { backendClient } from '@/lib/backend-client';
import type { UsageByModel, UsageEvents, UsageStats, UsageSummary } from './types';

export function getUsageSummary(token: string | null, days = 7) {
  return backendClient<UsageSummary>(`/usage/summary?days=${days}`, token);
}

export function getUsageStats(token: string | null, days = 7) {
  return backendClient<UsageStats>(`/usage/stats?days=${days}`, token);
}

export function getUsageByModel(token: string | null, days = 7) {
  return backendClient<UsageByModel>(`/usage/by-model?days=${days}`, token);
}

export function getUsageEvents(token: string | null, days = 7, limit = 50) {
  return backendClient<UsageEvents>(`/usage/events?days=${days}&limit=${limit}`, token);
}
