export type NotificationType = 'budget_warning' | 'budget_exceeded' | 'policy' | 'system';

// The backend stores useful context (budget id, usage %, action link) in the
// `data` jsonb column. The action fields are populated by the backend so the
// client never hardcodes routing to a business rule.
export type NotificationData = {
  budgetId?: string;
  kind?: NotificationType;
  percentUsed?: number;
  spentUsd?: number;
  limitUsd?: number;
  period?: 'daily' | 'monthly';
  actionLabel?: string;
  actionHref?: string;
};

// Matches ai-financial-control-backend's `notifications` table.
export type AppNotification = {
  id: string;
  organizationId: string;
  type: NotificationType;
  title: string;
  body: string;
  data: NotificationData | null;
  read: boolean;
  createdAt: string;
};
