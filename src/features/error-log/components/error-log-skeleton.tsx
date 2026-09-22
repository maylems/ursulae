import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ErrorLogSkeleton() {
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className='flex flex-col gap-3'>
              <Skeleton className='size-9 rounded-md' />
              <Skeleton className='h-7 w-16' />
              <Skeleton className='h-4 w-24' />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className='h-5 w-48' />
          <Skeleton className='h-4 w-72' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-40 w-full' />
        </CardContent>
      </Card>
    </div>
  );
}
