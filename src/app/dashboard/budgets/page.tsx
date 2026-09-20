import { Suspense } from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { auth } from '@clerk/nextjs/server';
import PageContainer from '@/components/layout/page-container';
import { getQueryClient } from '@/lib/query-client';
import { budgetsQueryOptions } from '@/features/budgets/api/queries';
import { BudgetsView } from '@/features/budgets/components/budgets-view';
import { BudgetsSkeleton } from '@/features/budgets/components/budgets-skeleton';

export default async function BudgetsPage() {
  const { getToken } = await auth();
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(budgetsQueryOptions(getToken));

  return (
    <PageContainer
      pageTitle='Budgets & Alerts'
      pageDescription='Set spending limits and get notified before they are hit'
    >
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<BudgetsSkeleton />}>
          <BudgetsView />
        </Suspense>
      </HydrationBoundary>
    </PageContainer>
  );
}
