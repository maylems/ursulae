'use client';

import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { proxyKeyKeys, proxyKeysQueryOptions } from '../api/queries';
import { revokeProxyKey } from '../api/service';
import { anthropicProxySnippet, openaiProxySnippet } from '../lib/snippets';
import { CreateProxyKeyDialog } from './create-proxy-key-dialog';

export function ProxyKeysTab() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { data: keys } = useSuspenseQuery(proxyKeysQueryOptions(getToken));

  const revokeMutation = useMutation({
    mutationFn: async (id: string) => revokeProxyKey(await getToken(), id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: proxyKeyKeys.all });
      toast.success('Proxy key revoked');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to revoke key');
    }
  });

  return (
    <div className='flex flex-col gap-4'>
      <Card>
        <CardHeader className='flex flex-row items-start justify-between'>
          <div>
            <CardTitle>Proxy keys</CardTitle>
            <CardDescription>
              Send OpenAI and Anthropic traffic through the proxy to track every request live and
              enforce budgets
            </CardDescription>
          </div>
          <CreateProxyKeyDialog />
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
          {keys.map((key) => (
            <div key={key.id} className='flex items-center justify-between rounded-lg border p-3'>
              <div className='flex items-center gap-3'>
                <div className='bg-muted flex size-9 items-center justify-center rounded-md'>
                  <Icons.lock className='text-muted-foreground size-4' />
                </div>
                <div>
                  <div className='font-medium'>{key.label}</div>
                  <div className='text-muted-foreground text-xs'>
                    <span className='font-mono'>{key.keyPrefix}...</span> · last used{' '}
                    {key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleString() : 'never'}
                  </div>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Badge
                  variant='outline'
                  className={
                    key.status === 'active'
                      ? 'border-emerald-500/20 bg-emerald-500/15 text-emerald-500'
                      : 'bg-destructive/15 text-destructive border-destructive/20'
                  }
                >
                  {key.status}
                </Badge>
                {key.status === 'active' && (
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() => revokeMutation.mutate(key.id)}
                    disabled={revokeMutation.isPending}
                  >
                    Revoke
                  </Button>
                )}
              </div>
            </div>
          ))}
          {keys.length === 0 && (
            <p className='text-muted-foreground py-6 text-center text-sm'>
              No proxy keys yet. Create one to start sending traffic through the proxy.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connect your app</CardTitle>
          <CardDescription>
            Point your SDK at the proxy and add your proxy key. You keep using your own provider
            key; we forward it and never store it. The optional feature tag groups requests in the
            dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div>
            <p className='mb-1.5 text-sm font-medium'>OpenAI</p>
            <pre className='bg-muted overflow-x-auto rounded-lg p-3 text-xs'>
              {openaiProxySnippet}
            </pre>
          </div>
          <div>
            <p className='mb-1.5 text-sm font-medium'>Anthropic</p>
            <pre className='bg-muted overflow-x-auto rounded-lg p-3 text-xs'>
              {anthropicProxySnippet}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
