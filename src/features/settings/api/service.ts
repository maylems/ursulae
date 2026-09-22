import { backendClient } from '@/lib/backend-client';
import type { ApiKey, ConnectApiKeyPayload } from './types';

export function getApiKeys(token: string | null) {
  return backendClient<ApiKey[]>('/api-keys', token);
}

export function connectApiKey(token: string | null, payload: ConnectApiKeyPayload) {
  return backendClient<ApiKey>('/api-keys', token, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export function revokeApiKey(token: string | null, id: string) {
  return backendClient<void>(`/api-keys/${id}`, token, { method: 'DELETE' });
}
