import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { modelTokenDistribution, tokenLegend } from '../constants/mock-data';

export function TokenDistributionCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Distribution by Model</CardTitle>
        <CardDescription>Input vs Output tokens per model</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-5'>
        <div className='text-muted-foreground flex items-center gap-4 text-sm'>
          <span className='flex items-center gap-1.5'>
            <span className='bg-chart-1 size-2.5 rounded-full' />
            Input ({tokenLegend.inputPercent}%)
          </span>
          <span className='flex items-center gap-1.5'>
            <span className='bg-chart-2 size-2.5 rounded-full' />
            Output ({tokenLegend.outputPercent}%)
          </span>
        </div>

        <div className='flex flex-col gap-4'>
          {modelTokenDistribution.map((row) => {
            const total = row.inputTokens + row.outputTokens;
            const inputWidth = (row.inputTokens / total) * 100;
            const outputWidth = (row.outputTokens / total) * 100;
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
                    {(row.inputTokens / 1000).toFixed(1)}k / {(row.outputTokens / 1000).toFixed(1)}k
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

        <p className='text-muted-foreground text-xs'>+10 more models</p>
      </CardContent>
    </Card>
  );
}
