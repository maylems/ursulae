'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

export function OrganizationTab() {
  const { data: organization } = authClient.useActiveOrganization();
  const { data: session } = authClient.useSession();
  const [name, setName] = useState(organization?.name ?? '');
  const [saving, setSaving] = useState(false);

  async function handleSaveName() {
    if (!organization || !name.trim() || name.trim() === organization.name || saving) return;
    setSaving(true);
    const { error } = await authClient.organization.update({
      organizationId: organization.id,
      data: { name: name.trim() }
    });
    setSaving(false);
    if (error) {
      toast.error(error.message ?? 'Failed to update organization name');
      return;
    }
    toast.success('Organization name updated');
  }

  if (!organization) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>Manage your workspace name and members</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col items-start gap-3'>
          <p className='text-muted-foreground text-sm'>
            No active organization. Create or switch to one to manage workspace settings.
          </p>
          <Button render={<Link href='/dashboard/workspaces' aria-label='Manage organizations' />}>
            Manage organizations
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Organization</CardTitle>
        <CardDescription>Manage your workspace name and members</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-4'>
        <div className='flex max-w-sm flex-col gap-1.5'>
          <Label htmlFor='org-name'>Organization name</Label>
          <div className='flex gap-2'>
            <Input
              id='org-name'
              value={name}
              onChange={(event) => setName(event.target.value)}
              className='max-w-sm'
            />
            <Button
              onClick={handleSaveName}
              disabled={saving || !name.trim() || name.trim() === organization.name}
            >
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between'>
            <Label>Members</Label>
            <Button
              variant='ghost'
              size='sm'
              className='text-muted-foreground'
              render={<Link href='/dashboard/workspaces/team' aria-label='Manage team' />}
            >
              Manage team
            </Button>
          </div>
          {organization.members.map((member) => {
            const isYou = member.userId === session?.user?.id;
            return (
              <div
                key={member.id}
                className='flex items-center justify-between rounded-lg border p-3'
              >
                <div className='flex items-center gap-3'>
                  <Avatar className='size-8'>
                    <AvatarFallback>
                      {(member.user.name || member.user.email || '?').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <span className='text-sm font-medium'>
                      {member.user.name}
                      {isYou && <span className='text-muted-foreground ml-1 text-xs'>(you)</span>}
                    </span>
                    <span className='text-muted-foreground text-xs'>{member.user.email}</span>
                  </div>
                </div>
                <Badge variant='outline'>{member.role}</Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
