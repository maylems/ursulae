import { Suspense } from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { auth } from '@clerk/nextjs/server';
import PageContainer from '@/components/layout/page-container';
import { getQueryClient } from '@/lib/query-client';
import { apiKeysQueryOptions } from '@/features/settings/api/queries';
import { SettingsView } from '@/features/settings/components/settings-view';
import { SettingsSkeleton } from '@/features/settings/components/settings-skeleton';

export default async function SettingsPage() {
  const { getToken } = await auth();
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(apiKeysQueryOptions(getToken));

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
