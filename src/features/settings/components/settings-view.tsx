'use client';

import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Icons } from '@/components/icons';
import { apiKeyKeys, apiKeysQueryOptions } from '../api/queries';
import { revokeApiKey } from '../api/service';
import { providerLabelMap } from '../api/types';
import { ProxyKeysTab } from '@/features/proxy/components/proxy-keys-tab';
import { ConnectApiKeyDialog } from './connect-api-key-dialog';

export function SettingsView() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { data: apiKeys } = useSuspenseQuery(apiKeysQueryOptions(getToken));

  const revokeMutation = useMutation({
    mutationFn: async (id: string) => revokeApiKey(await getToken(), id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.all });
      toast.success('API key revoked');
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to revoke key');
    }
  });

  return (
    <Tabs defaultValue='api-keys'>
      <TabsList>
        <TabsTrigger value='api-keys'>API Keys</TabsTrigger>
        <TabsTrigger value='proxy'>Proxy</TabsTrigger>
        <TabsTrigger value='organization'>Organization</TabsTrigger>
        <TabsTrigger value='notifications'>Notifications</TabsTrigger>
        <TabsTrigger value='billing'>Billing</TabsTrigger>
      </TabsList>

      <TabsContent value='api-keys' className='mt-4'>
        <Card>
          <CardHeader className='flex flex-row items-start justify-between'>
            <div>
              <CardTitle>Connected API Keys</CardTitle>
              <CardDescription>
                Read-only keys used to import usage and billing history
              </CardDescription>
            </div>
            <ConnectApiKeyDialog />
          </CardHeader>
          <CardContent className='flex flex-col gap-3'>
            {apiKeys.map((key) => (
              <div key={key.id} className='flex items-center justify-between rounded-lg border p-3'>
                <div className='flex items-center gap-3'>
                  <div className='bg-muted flex size-9 items-center justify-center rounded-md'>
                    <Icons.lock className='text-muted-foreground size-4' />
                  </div>
                  <div>
                    <div className='font-medium'>{key.label}</div>
                    <div className='text-muted-foreground text-xs'>
                      {providerLabelMap[key.provider]} · sk-••••{key.lastFour} · synced{' '}
                      {key.lastSyncedAt ? new Date(key.lastSyncedAt).toLocaleString() : 'never'}
                    </div>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <Badge
                    variant='outline'
                    className={
                      key.status === 'active'
                        ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/20'
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
            {apiKeys.length === 0 && (
              <p className='text-muted-foreground py-6 text-center text-sm'>
                No API keys connected yet.
              </p>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='proxy' className='mt-4'>
        <ProxyKeysTab />
      </TabsContent>

      <TabsContent value='organization' className='mt-4'>
        <Card>
          <CardHeader>
            <CardTitle>Organization</CardTitle>
            <CardDescription>Manage your workspace name and members</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='org-name'>Organization name</Label>
              <Input id='org-name' defaultValue='Acme Inc.' className='max-w-sm' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label>Members</Label>
              {[
                { name: 'You', role: 'Admin' },
                { name: 'Finance Lead', role: 'Finance' },
                { name: 'Backend Engineer', role: 'Dev' }
              ].map((member) => (
                <div
                  key={member.name}
                  className='flex items-center justify-between rounded-lg border p-3'
                >
                  <div className='flex items-center gap-3'>
                    <Avatar className='size-8'>
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className='text-sm font-medium'>{member.name}</span>
                  </div>
                  <Badge variant='outline'>{member.role}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='notifications' className='mt-4'>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose how you want to be alerted about spend</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='slack-webhook'>Slack webhook URL</Label>
              <Input
                id='slack-webhook'
                placeholder='https://hooks.slack.com/services/...'
                className='max-w-md'
              />
            </div>
            <div className='flex max-w-md items-center justify-between'>
              <div>
                <Label htmlFor='anomaly-alerts'>Anomaly detection alerts</Label>
                <p className='text-muted-foreground text-xs'>
                  Notify when hourly spend spikes abnormally
                </p>
              </div>
              <Switch id='anomaly-alerts' defaultChecked />
            </div>
            <div className='flex max-w-md items-center justify-between'>
              <div>
                <Label htmlFor='weekly-summary'>Weekly summary email</Label>
                <p className='text-muted-foreground text-xs'>
                  A recap of spend, top features, and trends
                </p>
              </div>
              <Switch id='weekly-summary' defaultChecked />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value='billing' className='mt-4'>
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>Your AI Financial Control plan</CardDescription>
          </CardHeader>
          <CardContent className='flex items-center justify-between rounded-lg border p-4'>
            <div>
              <div className='font-medium'>MVP Plan</div>
              <div className='text-muted-foreground text-sm'>Free during private beta</div>
            </div>
            <Button variant='outline'>Manage plan</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
