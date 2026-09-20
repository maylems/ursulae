'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';
import { createProxyKey } from '../api/service';
import { proxyKeyKeys } from '../api/queries';

export function CreateProxyKeyDialog() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => createProxyKey(await getToken(), label),
    onSuccess: (created) => {
      queryClient.invalidateQueries({ queryKey: proxyKeyKeys.all });
      setCreatedKey(created.key);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to create proxy key');
    }
  });

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setLabel('');
      setCreatedKey(null);
    }
  };

  const copyKey = async () => {
    if (!createdKey) return;
    try {
      await navigator.clipboard.writeText(createdKey);
      toast.success('Key copied');
    } catch {
      toast.error('Could not copy, select the key and copy it manually');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button />}>
        <Icons.add className='size-4' />
        Create proxy key
      </DialogTrigger>
      <DialogContent>
        {createdKey ? (
          <>
            <DialogHeader>
              <DialogTitle>Copy your proxy key</DialogTitle>
              <DialogDescription>
                This is the only time it is shown. Store it somewhere safe; if you lose it, revoke
                it and create a new one.
              </DialogDescription>
            </DialogHeader>
            <div className='flex items-center gap-2'>
              <Input readOnly value={createdKey} className='font-mono text-xs' />
              <Button variant='outline' onClick={copyKey}>
                Copy
              </Button>
            </div>
            <DialogFooter>
              <Button onClick={() => handleOpenChange(false)}>Done</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create proxy key</DialogTitle>
              <DialogDescription>
                One key per app or environment, so you can revoke them independently.
              </DialogDescription>
            </DialogHeader>
            <div className='flex flex-col gap-1.5'>
              <Label htmlFor='proxy-key-label'>Label</Label>
              <Input
                id='proxy-key-label'
                placeholder='e.g. Production backend'
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button onClick={() => mutation.mutate()} disabled={!label || mutation.isPending}>
                {mutation.isPending ? 'Creating...' : 'Create'}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
