import { queryOptions } from '@tanstack/react-query';
import { getApiKeys } from './service';

export const apiKeyKeys = {
  all: ['api-keys'] as const,
  list: () => [...apiKeyKeys.all, 'list'] as const
};

export function apiKeysQueryOptions(getToken: () => Promise<string | null>) {
  return queryOptions({
    queryKey: apiKeyKeys.list(),
    queryFn: async () => getApiKeys(await getToken())
  });
}
