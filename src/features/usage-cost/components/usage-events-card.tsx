'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from '@/components/ui/table';
import { providerColors, providerLabels, statusStyles, usageEvents } from '../constants/mock-data';

export function UsageEventsCard() {
  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue='events'>
          <div className='flex items-center justify-between'>
            <TabsList>
              <TabsTrigger value='events'>Usage Events</TabsTrigger>
              <TabsTrigger value='performance'>Model Performance</TabsTrigger>
            </TabsList>
            <span className='text-muted-foreground text-sm'>{usageEvents.length} events total</span>
          </div>

          <TabsContent value='events' className='mt-4'>
            <EventsTable />
          </TabsContent>
          <TabsContent value='performance' className='mt-4'>
            <ModelPerformanceTable />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}

function EventsTable() {
  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Feature</TableHead>
            <TableHead>Tokens</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Latency</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usageEvents.map((event) => (
            <TableRow key={event.id}>
              <TableCell className='text-muted-foreground whitespace-nowrap'>
                {event.timestamp}
              </TableCell>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <span
                    className='size-2 shrink-0 rounded-full'
                    style={{ backgroundColor: providerColors[event.provider] }}
                  />
                  <div>
                    <div className='font-medium'>{event.model}</div>
                    <div className='text-muted-foreground text-xs'>
                      {providerLabels[event.provider].toLowerCase()}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className='text-muted-foreground'>{event.feature}</TableCell>
              <TableCell>
                <div>{event.tokensIn + event.tokensOut}</div>
                <div className='text-muted-foreground text-xs'>
                  {event.tokensIn} in / {event.tokensOut} out
                </div>
              </TableCell>
              <TableCell>${event.cost.toFixed(4)}</TableCell>
              <TableCell className='text-muted-foreground'>
                {event.latencyMs ? `${event.latencyMs}ms` : '-'}
              </TableCell>
              <TableCell>
                <Badge variant='outline' className={statusStyles[event.status]}>
                  {event.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ModelPerformanceTable() {
  const byModel = new Map<
    string,
    {
      provider: (typeof usageEvents)[number]['provider'];
      events: number;
      cost: number;
      tokens: number;
    }
  >();

  for (const event of usageEvents) {
    const existing = byModel.get(event.model);
    const tokens = event.tokensIn + event.tokensOut;
    if (existing) {
      existing.events += 1;
      existing.cost += event.cost;
      existing.tokens += tokens;
    } else {
      byModel.set(event.model, { provider: event.provider, events: 1, cost: event.cost, tokens });
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Model</TableHead>
          <TableHead>Requests</TableHead>
          <TableHead>Total Tokens</TableHead>
          <TableHead>Total Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from(byModel.entries()).map(([model, row]) => (
          <TableRow key={model}>
            <TableCell>
              <div className='flex items-center gap-2'>
                <span
                  className='size-2 shrink-0 rounded-full'
                  style={{ backgroundColor: providerColors[row.provider] }}
                />
                <span className='font-medium'>{model}</span>
              </div>
            </TableCell>
            <TableCell>{row.events}</TableCell>
            <TableCell>{row.tokens.toLocaleString()}</TableCell>
            <TableCell>${row.cost.toFixed(4)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
