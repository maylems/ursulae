'use client';

import { useAuth } from '@clerk/nextjs';
import { useSuspenseQuery } from '@tanstack/react-query';
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
import { usageEventsQueryOptions } from '../api/queries';
import { providerColors, providerLabels, statusStyles } from '../constants/mock-data';
import type { UsageEvent } from '../api/types';

function formatTimestamp(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

export function UsageEventsCard() {
  const { getToken } = useAuth();
  const { data } = useSuspenseQuery(usageEventsQueryOptions(getToken));

  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue='events'>
          <div className='flex items-center justify-between'>
            <TabsList>
              <TabsTrigger value='events'>Usage Events</TabsTrigger>
              <TabsTrigger value='performance'>Model Performance</TabsTrigger>
            </TabsList>
            <span className='text-muted-foreground text-sm'>{data.events.length} events total</span>
          </div>

          <TabsContent value='events' className='mt-4'>
            <EventsTable events={data.events} />
          </TabsContent>
          <TabsContent value='performance' className='mt-4'>
            <ModelPerformanceTable events={data.events} />
          </TabsContent>
        </Tabs>
      </CardHeader>
    </Card>
  );
}

function EventsTable({ events }: { events: UsageEvent[] }) {
  if (events.length === 0) {
    return (
      <p className='text-muted-foreground py-10 text-center text-sm'>
        No usage events yet — connect an API key in Settings to start tracking usage.
      </p>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Tokens</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell className='text-muted-foreground whitespace-nowrap'>
                {formatTimestamp(event.occurredAt)}
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
              <TableCell>
                <div>{event.promptTokens + event.completionTokens}</div>
                <div className='text-muted-foreground text-xs'>
                  {event.promptTokens} in / {event.completionTokens} out
                </div>
              </TableCell>
              <TableCell>${Number(event.costUsd).toFixed(4)}</TableCell>
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

function ModelPerformanceTable({ events }: { events: UsageEvent[] }) {
  const byModel = new Map<
    string,
    { provider: UsageEvent['provider']; events: number; cost: number; tokens: number }
  >();

  for (const event of events) {
    const existing = byModel.get(event.model);
    const tokens = event.promptTokens + event.completionTokens;
    const cost = Number(event.costUsd);
    if (existing) {
      existing.events += 1;
      existing.cost += cost;
      existing.tokens += tokens;
    } else {
      byModel.set(event.model, { provider: event.provider, events: 1, cost, tokens });
    }
  }

  if (byModel.size === 0) {
    return (
      <p className='text-muted-foreground py-10 text-center text-sm'>
        No usage events yet — connect an API key in Settings to start tracking usage.
      </p>
    );
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
