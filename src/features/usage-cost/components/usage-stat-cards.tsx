import { Card, CardContent } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { usageStats } from '../constants/mock-data';

export function UsageStatCards() {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {usageStats.map((stat) => {
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
