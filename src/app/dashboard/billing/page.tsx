'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Icons } from '@/components/icons';
import { billingInfoContent } from '@/config/infoconfig';

export default function BillingPage() {
  const { data: organization, isPending } = authClient.useActiveOrganization();

  return (
    <PageContainer
      isLoading={isPending}
      access={!!organization}
      accessFallback={
        <div className='flex min-h-[400px] items-center justify-center'>
          <div className='space-y-2 text-center'>
            <h2 className='text-2xl font-semibold'>No Organization Selected</h2>
            <p className='text-muted-foreground'>
              Please select or create an organization to view billing information.
            </p>
          </div>
        </div>
      }
      infoContent={billingInfoContent}
      pageTitle='Billing & Plans'
      pageDescription={`Manage your subscription and usage limits for ${organization?.name}`}
    >
      <div className='space-y-6'>
        {/* Info Alert */}
        <Alert>
          <Icons.info className='h-4 w-4' />
          <AlertDescription>
            Billing is not enabled yet. AI Financial Control is free during the private beta.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>Choose a plan that fits your organization's needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex items-center justify-between rounded-lg border p-4'>
              <div>
                <div className='font-medium'>MVP Plan</div>
                <div className='text-muted-foreground text-sm'>Free during private beta</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
