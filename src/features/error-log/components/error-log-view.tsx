import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { Icons } from '@/components/icons';
import { actionStyles, errorLog, errorStats } from '../constants/mock-data';

export function ErrorLogView() {
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardContent className='flex flex-col gap-3'>
            <div className='bg-muted flex size-9 items-center justify-center rounded-md'>
              <Icons.warning className='text-muted-foreground size-4' />
            </div>
            <div className='text-2xl font-semibold tabular-nums'>{errorStats.totalErrors24h}</div>
            <p className='text-muted-foreground text-sm'>Errors (24h)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='flex flex-col gap-3'>
            <div className='bg-muted flex size-9 items-center justify-center rounded-md'>
              <Icons.activity className='text-muted-foreground size-4' />
            </div>
            <div className='text-2xl font-semibold tabular-nums'>
              {errorStats.errorRatePercent}%
            </div>
            <p className='text-muted-foreground text-sm'>Error Rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='flex flex-col gap-3'>
            <div className='bg-muted flex size-9 items-center justify-center rounded-md'>
              <Icons.lock className='text-muted-foreground size-4' />
            </div>
            <div className='text-2xl font-semibold tabular-nums'>{errorStats.blockedRequests}</div>
            <p className='text-muted-foreground text-sm'>Blocked by Policy Engine</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className='flex flex-col gap-3'>
            <div className='bg-muted flex size-9 items-center justify-center rounded-md'>
              <Icons.code className='text-muted-foreground size-4' />
            </div>
            <div className='text-2xl font-semibold tabular-nums'>{errorStats.mostCommon}</div>
            <p className='text-muted-foreground text-sm'>Most Common Error</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Errors & Policy Actions</CardTitle>
          <CardDescription>
            Failed requests, rate limits, and automatic actions from the policy engine (Warn →
            Throttle → Switch → Block)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Model</TableHead>
                  <TableHead>Feature</TableHead>
                  <TableHead>Error</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {errorLog.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className='text-muted-foreground whitespace-nowrap'>
                      {entry.timestamp}
                    </TableCell>
                    <TableCell>
                      <div className='font-medium'>{entry.model}</div>
                      <div className='text-muted-foreground text-xs'>{entry.provider}</div>
                    </TableCell>
                    <TableCell className='text-muted-foreground'>{entry.feature}</TableCell>
                    <TableCell className='max-w-[360px]'>
                      <div className='font-medium'>{entry.errorType}</div>
                      <div className='text-muted-foreground text-xs'>{entry.message}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant='outline' className={actionStyles[entry.action]}>
                        {entry.action}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
