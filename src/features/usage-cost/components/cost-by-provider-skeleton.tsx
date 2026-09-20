import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CostByProviderSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className='h-5 w-32' />
        <Skeleton className='h-4 w-56' />
      </CardHeader>
      <CardContent>
        <Skeleton className='h-[280px] w-full' />
      </CardContent>
    </Card>
  );
}
