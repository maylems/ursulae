import { Card, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function NotificationsSkeleton() {
  return (
    <div className='flex flex-col gap-2'>
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className='flex flex-col gap-2'>
            <Skeleton className='h-5 w-48' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-3 w-20' />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
