import { Suspense } from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getServerAuth } from '@/lib/auth-server';
import PageContainer from '@/components/layout/page-container';
import { getQueryClient } from '@/lib/query-client';
import { errorLogQueryOptions } from '@/features/error-log/api/queries';
import { ErrorLogView } from '@/features/error-log/components/error-log-view';
import { ErrorLogSkeleton } from '@/features/error-log/components/error-log-skeleton';

export default async function ErrorsPage() {
  const { getToken } = await getServerAuth();
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(errorLogQueryOptions(getToken));

  return (
    <PageContainer
      pageTitle='Errors'
      pageDescription='Failed requests, rate limits, and policy actions'
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ErrorLogSkeleton />}>
          <ErrorLogView />
        </Suspense>
      </HydrationBoundary>
    </PageContainer>
  );
}
