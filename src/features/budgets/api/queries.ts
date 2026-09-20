import { queryOptions } from '@tanstack/react-query';
import { getBudgets } from './service';

export const budgetKeys = {
  all: ['budgets'] as const,
  list: () => [...budgetKeys.all, 'list'] as const
};

// `getToken` matches both Clerk's server `auth()` and client `useAuth()` —
// same factory works for server prefetch and client useSuspenseQuery.
export function budgetsQueryOptions(getToken: () => Promise<string | null>) {
  return queryOptions({
    queryKey: budgetKeys.list(),
    queryFn: async () => getBudgets(await getToken())
  });
}
