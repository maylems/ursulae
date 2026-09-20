'use client';

import { useAuth } from '@clerk/nextjs';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import { usageStatsQueryOptions } from '../api/queries';

export function UsageCostSummary() {
  const { getToken } = useAuth();
  const { data } = useSuspenseQuery(usageStatsQueryOptions(getToken));

  return (
    <div className='text-muted-foreground flex flex-wrap items-center gap-4 text-sm'>
      <span className='flex items-center gap-1.5'>
        <Icons.layers className='size-4' />
        {data.modelCount} models
      </span>
      <span className='flex items-center gap-1.5'>
        <Icons.activity className='size-4' />
        {data.providerCount} providers
      </span>
      <span className='flex items-center gap-1.5'>
        Avg Cost per 1K Tokens:
        <span className='text-foreground font-medium'>${data.costPer1kTokens.toFixed(4)}</span>
        <Icons.info className='size-3.5' />
      </span>
    </div>
  );
}
