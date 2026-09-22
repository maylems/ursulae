import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { UsageCostSummary } from './usage-cost-summary';
import { UsageStatCards } from './usage-stat-cards';
import { TokenDistributionCard } from './token-distribution-card';
import { CostByProviderCard } from './cost-by-provider-card';
import { CostByProviderSkeleton } from './cost-by-provider-skeleton';
import { UsageEventsCard } from './usage-events-card';

export function UsageCostView() {
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <Suspense fallback={<Skeleton className='h-5 w-80' />}>
        <UsageCostSummary />
      </Suspense>
      <Suspense
        fallback={
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className='h-28 w-full' />
            ))}
          </div>
        }
      >
        <UsageStatCards />
      </Suspense>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <Suspense fallback={<Skeleton className='h-[320px] w-full' />}>
          <TokenDistributionCard />
        </Suspense>
        <Suspense fallback={<CostByProviderSkeleton />}>
          <CostByProviderCard />
        </Suspense>
      </div>
      <Suspense fallback={<Skeleton className='h-64 w-full' />}>
        <UsageEventsCard />
      </Suspense>
    </div>
  );
}
