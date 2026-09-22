import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function SettingsSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton className='h-9 w-72' />
      <Card>
        <CardHeader>
          <Skeleton className='h-5 w-40' />
          <Skeleton className='h-4 w-64' />
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
          <Skeleton className='h-14 w-full' />
          <Skeleton className='h-14 w-full' />
        </CardContent>
      </Card>
    </div>
  );
}
