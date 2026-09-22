'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { useAuth } from '@/hooks/use-auth';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart';
import { usageSummaryQueryOptions } from '../api/queries';
import { providerColors, providerLabels } from '../constants/mock-data';
import { formatSmallUsd } from '../utils/format';

export function CostByProviderCard() {
  const { getToken } = useAuth();
  const { data } = useSuspenseQuery(usageSummaryQueryOptions(getToken));

  const chartData = data.byProvider.map((row) => ({
    provider: row.provider,
    cost: Number(row.totalCost),
    fill: `var(--color-${row.provider})`
  }));

  const chartConfig = Object.fromEntries(
    data.byProvider.map((row) => [
      row.provider,
      { label: providerLabels[row.provider], color: providerColors[row.provider] }
    ])
  ) satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost by Provider</CardTitle>
        <CardDescription>Spending distribution across AI providers</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className='text-muted-foreground flex h-[280px] flex-col items-center justify-center gap-1 text-sm'>
            <p>No usage synced yet.</p>
            <p>Connect an API key in Settings to start tracking costs.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className='h-[280px] w-full'>
            <BarChart data={chartData} layout='vertical' margin={{ left: 0 }}>
              <YAxis
                dataKey='provider'
                type='category'
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                width={80}
                tickFormatter={(value) => providerLabels[value as keyof typeof providerLabels]}
              />
              <XAxis dataKey='cost' type='number' hide />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value) => formatSmallUsd(Number(value))}
                  />
                }
              />
              <Bar dataKey='cost' radius={5} />
            </BarChart>
          </ChartContainer>
        )}
        {data.byProvider.length > 0 && (
          <div className='text-muted-foreground mt-3 flex flex-col gap-1 text-xs'>
            {data.byProvider.map((row) => (
              <div key={row.provider} className='flex justify-between'>
                <span>{providerLabels[row.provider]}</span>
                <span>
                  {formatSmallUsd(row.proxiedCost)} via Fivv · {formatSmallUsd(row.externalCost)}{' '}
                  outside Fivv
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
