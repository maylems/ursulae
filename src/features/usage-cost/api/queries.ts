import { queryOptions } from '@tanstack/react-query';
import { getUsageByModel, getUsageEvents, getUsageStats, getUsageSummary } from './service';

export const usageSummaryKeys = {
  all: ['usage-summary'] as const,
  byDays: (days: number) => [...usageSummaryKeys.all, days] as const
};

export function usageSummaryQueryOptions(getToken: () => Promise<string | null>, days = 7) {
  return queryOptions({
    queryKey: usageSummaryKeys.byDays(days),
    queryFn: async () => getUsageSummary(await getToken(), days)
  });
}

export const usageStatsKeys = {
  all: ['usage-stats'] as const,
  byDays: (days: number) => [...usageStatsKeys.all, days] as const
};

export function usageStatsQueryOptions(getToken: () => Promise<string | null>, days = 7) {
  return queryOptions({
    queryKey: usageStatsKeys.byDays(days),
    queryFn: async () => getUsageStats(await getToken(), days)
  });
}

export const usageByModelKeys = {
  all: ['usage-by-model'] as const,
  byDays: (days: number) => [...usageByModelKeys.all, days] as const
};

export function usageByModelQueryOptions(getToken: () => Promise<string | null>, days = 7) {
  return queryOptions({
    queryKey: usageByModelKeys.byDays(days),
    queryFn: async () => getUsageByModel(await getToken(), days)
  });
}

export const usageEventsKeys = {
  all: ['usage-events'] as const,
  byDays: (days: number, limit: number) => [...usageEventsKeys.all, days, limit] as const
};

export function usageEventsQueryOptions(
  getToken: () => Promise<string | null>,
  days = 7,
  limit = 50
) {
  return queryOptions({
    queryKey: usageEventsKeys.byDays(days, limit),
    queryFn: async () => getUsageEvents(await getToken(), days, limit)
  });
}
