export type BudgetScope = 'organization' | 'api_key';
export type BudgetPeriod = 'daily' | 'monthly';

// Matches ai-financial-control-backend's `budgets` table exactly.
// Postgres `numeric` columns come back as strings over JSON — amountUsd is a string.
export type Budget = {
  id: string;
  organizationId: string;
  apiKeyId: string | null;
  scope: BudgetScope;
  period: BudgetPeriod;
  amountUsd: string;
  alertThresholdPercent: number;
  createdAt: string;
};

export type CreateBudgetPayload = {
  scope: BudgetScope;
  period: BudgetPeriod;
  amountUsd: number;
  apiKeyId?: string;
  alertThresholdPercent?: number;
};
