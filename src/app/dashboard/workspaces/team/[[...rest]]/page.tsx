'use client';

import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { teamInfoContent } from '@/config/infoconfig';
import { authClient } from '@/lib/auth-client';

export default function TeamPage() {
  const { data: organization } = authClient.useActiveOrganization();

  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Manage your workspace team, members and roles.'
      infoContent={teamInfoContent}
    >
      {organization ? (
        <Card className='max-w-xl'>
          <CardHeader>
            <CardTitle>{organization.name}</CardTitle>
            <CardDescription>{organization.members.length} member(s)</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {organization.members.map((member) => (
              <div
                key={member.id}
                className='flex items-center justify-between rounded-lg border p-3'
              >
                <div>
                  <div className='text-sm font-medium'>{member.user.name}</div>
                  <div className='text-muted-foreground text-xs'>{member.user.email}</div>
                </div>
                <Badge variant='outline'>{member.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        <p className='text-muted-foreground text-sm'>
          Select or create an organization to manage its team.
        </p>
      )}
    </PageContainer>
  );
}
