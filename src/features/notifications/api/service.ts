import { backendClient } from '@/lib/backend-client';
import type { AppNotification } from './types';

export function getNotifications(token: string | null) {
  return backendClient<AppNotification[]>('/notifications', token);
}

export function markNotificationsRead(token: string | null, ids?: string[]) {
  return backendClient<undefined>('/notifications/read', token, {
    method: 'PATCH',
    body: JSON.stringify({ ids })
  });
}
