import { Suspense } from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getServerAuth } from '@/lib/auth-server';
import PageContainer from '@/components/layout/page-container';
import { getQueryClient } from '@/lib/query-client';
import { proxyKeysQueryOptions } from '@/features/proxy/api/queries';
import { apiKeysQueryOptions } from '@/features/settings/api/queries';
import { SettingsView } from '@/features/settings/components/settings-view';
import { SettingsSkeleton } from '@/features/settings/components/settings-skeleton';

export default async function SettingsPage() {
  const { getToken } = await getServerAuth();
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(apiKeysQueryOptions(getToken));
  void queryClient.prefetchQuery(proxyKeysQueryOptions(getToken));

  return (
    <PageContainer pageTitle='Settings' pageDescription='API keys, organization, and notifications'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SettingsSkeleton />}>
          <SettingsView />
        </Suspense>
      </HydrationBoundary>
    </PageContainer>
  );
}
