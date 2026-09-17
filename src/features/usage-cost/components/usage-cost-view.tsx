import { UsageCostSummary } from './usage-cost-summary';
import { UsageStatCards } from './usage-stat-cards';
import { TokenDistributionCard } from './token-distribution-card';
import { CostByProviderCard } from './cost-by-provider-card';
import { UsageEventsCard } from './usage-events-card';

export function UsageCostView() {
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <UsageCostSummary />
      <UsageStatCards />
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <TokenDistributionCard />
        <CostByProviderCard />
      </div>
      <UsageEventsCard />
    </div>
  );
}
