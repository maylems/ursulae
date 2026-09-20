'use client';

import { useAuth } from '@clerk/nextjs';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { usageStatsQueryOptions } from '../api/queries';
import { formatRatio, formatTokens } from '../utils/format';

export function UsageStatCards() {
  const { getToken } = useAuth();
  const { data } = useSuspenseQuery(usageStatsQueryOptions(getToken));

  const stats = [
    {
      key: 'avg-cost-request',
      icon: 'calculator' as const,
      value: `$${data.avgCostPerRequest.toFixed(4)}`,
      label: 'Avg Cost / Request'
    },
    {
      key: 'total-tokens',
      icon: 'hash' as const,
      value: formatTokens(data.totalTokens),
      label: 'Total Tokens'
    },
    {
      key: 'output-input-ratio',
      icon: 'arrowsLeftRight' as const,
      value: formatRatio(data.outputInputRatio),
      label: 'Output/Input Ratio'
    },
    {
      key: 'cost-per-1k',
      icon: 'trendingUp' as const,
      value: `$${data.costPer1kTokens.toFixed(4)}`,
      label: 'Cost per 1K Tokens'
    }
  ];

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat) => {
        const StatIcon = Icons[stat.icon];
        return (
          <Card key={stat.key} className='@container/card'>
            <CardContent className='flex flex-col gap-3'>
              <div className='bg-muted flex size-9 items-center justify-center rounded-md'>
                <StatIcon className='text-muted-foreground size-4' />
              </div>
              <div className='text-2xl font-semibold tabular-nums @[220px]/card:text-3xl'>
                {stat.value}
              </div>
              <p className='text-muted-foreground text-sm'>{stat.label}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
