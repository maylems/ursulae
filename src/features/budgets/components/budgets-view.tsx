'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Icons } from '@/components/icons';
import { budgetKeys, budgetsQueryOptions } from '../api/queries';
import { deleteBudget } from '../api/service';
import { NewBudgetDialog } from './new-budget-dialog';

const scopeLabel = { organization: 'Organization Budget', api_key: 'API Key Budget' } as const;
const periodLabel = { daily: 'Daily', monthly: 'Monthly' } as const;

export function BudgetsView() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { data: budgets } = useSuspenseQuery(budgetsQueryOptions(getToken));

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteBudget(await getToken(), id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: budgetKeys.all });
      toast.success('Budget deleted');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to delete budget');
    }
  });
  const [slackEnabled, setSlackEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div className='flex justify-end'>
        <NewBudgetDialog />
      </div>

      {budgets.length === 0 ? (
        <Card>
          <CardContent className='text-muted-foreground py-10 text-center text-sm'>
            No budgets yet — create one to start capping spend.
          </CardContent>
        </Card>
      ) : (
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {budgets.map((budget) => (
            <Card key={budget.id}>
              <CardHeader>
                <div className='flex items-start justify-between gap-2'>
                  <div>
                    <CardTitle className='text-base'>{scopeLabel[budget.scope]}</CardTitle>
                    <CardDescription>{periodLabel[budget.period]}</CardDescription>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Badge variant='outline'>${Number(budget.amountUsd).toFixed(2)} limit</Badge>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='size-7'
                      aria-label='Delete budget'
                      onClick={() => deleteMutation.mutate(budget.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Icons.trash className='size-4' />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className='flex flex-col gap-1'>
                <p className='text-muted-foreground text-xs'>
                  Alert at {budget.alertThresholdPercent}% of limit
                </p>
                {/* Spend isn't tracked yet — usage ingestion (backend jobs/ingest-usage.ts)
                    is still a stub, so there's no usage_events data to sum against this budget. */}
                <p className='text-muted-foreground text-xs italic'>No usage tracked yet</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Alert Channels</CardTitle>
          <CardDescription>
            Where to send Warn / Throttle / Block notifications from the policy engine
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='bg-muted flex size-9 items-center justify-center rounded-md'>
                <Icons.chat className='text-muted-foreground size-4' />
              </div>
              <div>
                <Label htmlFor='slack-alerts'>Slack</Label>
                <p className='text-muted-foreground text-xs'>
                  Post budget alerts to a Slack channel
                </p>
              </div>
            </div>
            <Switch id='slack-alerts' checked={slackEnabled} onCheckedChange={setSlackEnabled} />
          </div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='bg-muted flex size-9 items-center justify-center rounded-md'>
                <Icons.send className='text-muted-foreground size-4' />
              </div>
              <div>
                <Label htmlFor='email-alerts'>Email</Label>
                <p className='text-muted-foreground text-xs'>Send budget alerts by email</p>
              </div>
            </div>
            <Switch id='email-alerts' checked={emailEnabled} onCheckedChange={setEmailEnabled} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
