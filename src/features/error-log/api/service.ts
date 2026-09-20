import { backendClient } from '@/lib/backend-client';
import type { ErrorLog } from './types';

export function getErrorLog(token: string | null, days = 7, limit = 50) {
  return backendClient<ErrorLog>(`/errors?days=${days}&limit=${limit}`, token);
}
