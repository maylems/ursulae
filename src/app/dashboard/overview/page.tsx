import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getServerAuth } from '@/lib/auth-server';
import PageContainer from '@/components/layout/page-container';
import { getQueryClient } from '@/lib/query-client';
import {
  usageByModelQueryOptions,
  usageEventsQueryOptions,
  usageStatsQueryOptions,
  usageSummaryQueryOptions
} from '@/features/usage-cost/api/queries';
import { UsageCostToolbar } from '@/features/usage-cost/components/usage-cost-toolbar';
import { UsageCostView } from '@/features/usage-cost/components/usage-cost-view';

export default async function OverviewPage() {
  const { getToken } = await getServerAuth();
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(usageSummaryQueryOptions(getToken));
  void queryClient.prefetchQuery(usageStatsQueryOptions(getToken));
  void queryClient.prefetchQuery(usageByModelQueryOptions(getToken));
  void queryClient.prefetchQuery(usageEventsQueryOptions(getToken));

  return (
    <PageContainer
      pageTitle='Usage & Cost'
      pageDescription='Detailed usage analytics'
      pageHeaderAction={<UsageCostToolbar />}
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsageCostView />
      </HydrationBoundary>
    </PageContainer>
  );
}
