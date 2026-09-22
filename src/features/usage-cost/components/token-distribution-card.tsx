'use client';

import { useAuth } from '@/hooks/use-auth';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usageByModelQueryOptions } from '../api/queries';
import { formatTokens } from '../utils/format';

const VISIBLE_MODELS = 6;

export function TokenDistributionCard() {
  const { getToken } = useAuth();
  const { data } = useSuspenseQuery(usageByModelQueryOptions(getToken));

  const totalInput = data.models.reduce((sum, m) => sum + m.inputTokens, 0);
  const totalOutput = data.models.reduce((sum, m) => sum + m.outputTokens, 0);
  const grandTotal = totalInput + totalOutput;
  const inputPercent = grandTotal > 0 ? Math.round((totalInput / grandTotal) * 100) : 0;
  const outputPercent = grandTotal > 0 ? Math.round((totalOutput / grandTotal) * 100) : 0;

  const visible = data.models.slice(0, VISIBLE_MODELS);
  const remaining = data.models.length - visible.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Distribution by Model</CardTitle>
        <CardDescription>Input vs Output tokens per model</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-5'>
        {data.models.length === 0 ? (
          // Empty until a connected API key has synced usage.
          <div className='text-muted-foreground flex h-[180px] flex-col items-center justify-center gap-1 text-sm'>
            <p>No usage synced yet.</p>
            <p>Connect an API key in Settings to start tracking costs.</p>
          </div>
        ) : (
          <>
            <div className='text-muted-foreground flex items-center gap-4 text-sm'>
              <span className='flex items-center gap-1.5'>
                <span className='bg-chart-1 size-2.5 rounded-full' />
                Input ({inputPercent}%)
              </span>
              <span className='flex items-center gap-1.5'>
                <span className='bg-chart-2 size-2.5 rounded-full' />
                Output ({outputPercent}%)
              </span>
            </div>

            <div className='flex flex-col gap-4'>
              {visible.map((row) => {
                const total = row.inputTokens + row.outputTokens;
                const inputWidth = total > 0 ? (row.inputTokens / total) * 100 : 0;
                const outputWidth = total > 0 ? (row.outputTokens / total) * 100 : 0;
                return (
                  <div key={row.model} className='flex flex-col gap-1.5'>
                    <div className='flex items-baseline justify-between text-sm'>
                      <span className='flex items-baseline gap-2 font-medium'>
                        {row.model}
                        <span className='text-muted-foreground text-xs font-normal'>
                          {row.percent}%
                        </span>
                      </span>
                      <span className='text-muted-foreground text-xs'>
                        {formatTokens(row.inputTokens)} / {formatTokens(row.outputTokens)}
                      </span>
                    </div>
                    <div className='bg-muted flex h-3.5 w-full overflow-hidden rounded-full'>
                      <div className='bg-chart-1 h-full' style={{ width: `${inputWidth}%` }} />
                      <div className='bg-chart-2 h-full' style={{ width: `${outputWidth}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {remaining > 0 && (
              <p className='text-muted-foreground text-xs'>+{remaining} more models</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
