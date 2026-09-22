import { queryOptions } from '@tanstack/react-query';
import { getProxyKeys } from './service';

export const proxyKeyKeys = {
  all: ['proxy-keys'] as const,
  list: () => [...proxyKeyKeys.all, 'list'] as const
};

export function proxyKeysQueryOptions(getToken: () => Promise<string | null>) {
  return queryOptions({
    queryKey: proxyKeyKeys.list(),
    queryFn: async () => getProxyKeys(await getToken())
  });
}
