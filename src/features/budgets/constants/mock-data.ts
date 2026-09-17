// Static placeholder data for the Budgets & Alerts view.
// Frontend-only — will be backed by the `budgets` table once the DB is wired up.

export type BudgetScope = 'organization' | 'api_key';
export type BudgetPeriod = 'daily' | 'monthly';

export type Budget = {
  id: string;
  label: string;
  scope: BudgetScope;
  period: BudgetPeriod;
  limit: number;
  spent: number;
  alertThresholdPercent: number;
};

export const budgets: Budget[] = [
  {
    id: '1',
    label: 'Organization — Monthly',
    scope: 'organization',
    period: 'monthly',
    limit: 2000,
    spent: 1340,
    alertThresholdPercent: 80
  },
  {
    id: '2',
    label: 'research-agent key',
    scope: 'api_key',
    period: 'daily',
    limit: 50,
    spent: 46.5,
    alertThresholdPercent: 80
  },
  {
    id: '3',
    label: 'support-agent key',
    scope: 'api_key',
    period: 'monthly',
    limit: 400,
    spent: 158,
    alertThresholdPercent: 75
  }
];

export function budgetStatus(budget: Budget): 'ok' | 'warning' | 'exceeded' {
  const pct = (budget.spent / budget.limit) * 100;
  if (pct >= 100) return 'exceeded';
  if (pct >= budget.alertThresholdPercent) return 'warning';
  return 'ok';
}

export const budgetStatusStyles: Record<ReturnType<typeof budgetStatus>, string> = {
  ok: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/20',
  warning: 'bg-amber-500/15 text-amber-500 border-amber-500/20',
  exceeded: 'bg-destructive/15 text-destructive border-destructive/20'
};
