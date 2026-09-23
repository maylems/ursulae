import { Suspense } from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getServerAuth } from '@/lib/auth-server';
import { getQueryClient } from '@/lib/query-client';
import { notificationsQueryOptions } from '@/features/notifications/api/queries';
import NotificationsPage from '@/features/notifications/components/notifications-page';
import { NotificationsSkeleton } from '@/features/notifications/components/notifications-skeleton';

export const metadata = {
  title: 'Dashboard: Notifications'
};

export default async function Page() {
  const { getToken } = await getServerAuth();
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(notificationsQueryOptions(getToken));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<NotificationsSkeleton />}>
        <NotificationsPage />
      </Suspense>
    </HydrationBoundary>
  );
}
