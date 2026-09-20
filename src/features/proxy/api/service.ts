import { backendClient } from '@/lib/backend-client';
import type { CreatedProxyKey, ProxyKey } from './types';

export function getProxyKeys(token: string | null) {
  return backendClient<ProxyKey[]>('/proxy-keys', token);
}

export function createProxyKey(token: string | null, label: string) {
  return backendClient<CreatedProxyKey>('/proxy-keys', token, {
    method: 'POST',
    body: JSON.stringify({ label })
  });
}

export function revokeProxyKey(token: string | null, id: string) {
  return backendClient<void>(`/proxy-keys/${id}`, token, { method: 'DELETE' });
}
