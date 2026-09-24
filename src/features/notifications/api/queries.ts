import { queryOptions } from '@tanstack/react-query';
import { getNotifications } from './service';

export const notificationKeys = {
  all: ['notifications'] as const,
  list: () => [...notificationKeys.all, 'list'] as const
};

// `getToken` matches both the server `getServerAuth()` and client `useAuth()` —
// same factory works for server prefetch and client useSuspenseQuery.
// refetchInterval keeps the bell badge live without waiting for a full reload.
export function notificationsQueryOptions(getToken: () => Promise<string | null>) {
  return queryOptions({
    queryKey: notificationKeys.list(),
    queryFn: async () => getNotifications(await getToken()),
    refetchInterval: 30_000
  });
}
