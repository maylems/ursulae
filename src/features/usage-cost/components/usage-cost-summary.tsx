import { Icons } from '@/components/icons';
import { usageSummary } from '../constants/mock-data';

export function UsageCostSummary() {
  return (
    <div className='text-muted-foreground flex flex-wrap items-center gap-4 text-sm'>
      <span className='flex items-center gap-1.5'>
        <Icons.layers className='size-4' />
        {usageSummary.modelCount} models
      </span>
      <span className='flex items-center gap-1.5'>
        <Icons.activity className='size-4' />
        {usageSummary.providerCount} providers
      </span>
      <span className='flex items-center gap-1.5'>
        Avg Cost per 1K Tokens:
        <span className='text-foreground font-medium'>
          ${usageSummary.avgCostPer1kTokens.toFixed(4)}
        </span>
        <Icons.info className='size-3.5' />
      </span>
    </div>
  );
}
