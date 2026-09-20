import { queryOptions } from '@tanstack/react-query';
import { getErrorLog } from './service';

export const errorLogKeys = {
  all: ['error-log'] as const,
  byDays: (days: number, limit: number) => [...errorLogKeys.all, days, limit] as const
};

export function errorLogQueryOptions(getToken: () => Promise<string | null>, days = 7, limit = 50) {
  return queryOptions({
    queryKey: errorLogKeys.byDays(days, limit),
    queryFn: async () => getErrorLog(await getToken(), days, limit)
  });
}
