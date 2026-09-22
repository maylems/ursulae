import { backendClient } from '@/lib/backend-client';
import type { Budget, CreateBudgetPayload } from './types';

export function getBudgets(token: string | null) {
  return backendClient<Budget[]>('/budgets', token);
}

export function createBudget(token: string | null, payload: CreateBudgetPayload) {
  return backendClient<Budget>('/budgets', token, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function deleteBudget(token: string | null, id: string) {
  return backendClient<void>(`/budgets/${id}`, token, { method: 'DELETE' });
}
