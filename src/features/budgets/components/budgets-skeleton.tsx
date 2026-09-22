import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function BudgetsSkeleton() {
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div className='flex justify-end'>
        <Skeleton className='h-9 w-32' />
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className='h-5 w-32' />
              <Skeleton className='h-4 w-24' />
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-2 w-full' />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
