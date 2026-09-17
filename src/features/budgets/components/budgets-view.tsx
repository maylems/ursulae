'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Icons } from '@/components/icons';

import {
  budgets as initialBudgets,
  budgetStatus,
  budgetStatusStyles
} from '../constants/mock-data';

import type { Budget } from '../constants/mock-data';
import { NewBudgetDialog } from './new-budget-dialog';

import { getBudgets } from '@/lib/budgets';

export function BudgetsView() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [slackEnabled, setSlackEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = await getToken();
      if (!token) return;

      try {
        const budgets = await getBudgets(token);
        setBudgets(budgets);
      } catch (error) {
        console.error('Failed to fetch budgets:', error);
      }
    };

    fetchBudgets();
  }, [getToken]);

  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div className='flex justify-end'>
        <NewBudgetDialog onCreate={(budget) => setBudgets((prev) => [budget, ...prev])} />
      </div>

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
        {budgets.map((budget) => {
          const status = budgetStatus(budget);
          const percent = Math.min((budget.spent / budget.limit) * 100, 100);

          return (
            <Card key={budget.id}>
              <CardHeader>
                <div className='flex items-start justify-between gap-2'>
                  <div>
                    <CardTitle className='text-base'>{budget.label}</CardTitle>

                    <CardDescription>
                      {budget.scope === 'organization' ? 'Organization' : 'API Key'} ·{' '}
                      {budget.period}
                    </CardDescription>
                  </div>

                  <Badge variant='outline' className={budgetStatusStyles[status]}>
                    {status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className='flex flex-col gap-2'>
                <div className='flex items-baseline justify-between text-sm'>
                  <span className='font-medium'>
                    ${budget.spent.toFixed(2)}{' '}
                    <span className='text-muted-foreground font-normal'>
                      / ${budget.limit.toFixed(2)}
                    </span>
                  </span>

                  <span className='text-muted-foreground text-xs'>
                    Alert at {budget.alertThresholdPercent}%
                  </span>
                </div>

                <Progress value={percent} />
              </CardContent>
            </Card>
          );
        })}
      </div>

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
