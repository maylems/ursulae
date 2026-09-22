'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { workspacesInfoContent } from '@/config/infoconfig';
import { authClient } from '@/lib/auth-client';

function slugify(name: string) {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${base || 'org'}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function WorkspacesPage() {
  const router = useRouter();
  const { data: organizations } = authClient.useListOrganizations();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function onCreate(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const { data, error } = await authClient.organization.create({ name, slug: slugify(name) });
    if (error || !data) {
      setLoading(false);
      toast.error(error?.message ?? 'Failed to create organization');
      return;
    }
    await authClient.organization.setActive({ organizationId: data.id });
    router.push('/dashboard/workspaces/team');
    router.refresh();
  }

  async function onSelect(organizationId: string) {
    await authClient.organization.setActive({ organizationId });
    router.push('/dashboard/workspaces/team');
    router.refresh();
  }

  return (
    <PageContainer
      pageTitle='Workspaces'
      pageDescription='Manage your workspaces and switch between them'
      infoContent={workspacesInfoContent}
    >
      <div className='flex max-w-xl flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Your organizations</CardTitle>
            <CardDescription>Data is scoped to the active organization</CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            {organizations?.map((organization) => (
              <button
                key={organization.id}
                type='button'
                onClick={() => onSelect(organization.id)}
                className='hover:bg-accent rounded-lg border p-3 text-left text-sm font-medium'
              >
                {organization.name}
              </button>
            ))}
            {organizations?.length === 0 && (
              <p className='text-muted-foreground py-2 text-sm'>No organizations yet.</p>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create organization</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onCreate} className='flex items-end gap-2'>
              <div className='flex flex-1 flex-col gap-1.5'>
                <Label htmlFor='org-name'>Name</Label>
                <Input
                  id='org-name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <Button type='submit' disabled={loading}>
                Create
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
