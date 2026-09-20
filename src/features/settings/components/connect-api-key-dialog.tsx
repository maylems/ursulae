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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Icons } from '@/components/icons';
import { connectApiKey } from '../api/service';
import { apiKeyKeys } from '../api/queries';
import type { ApiKeyProvider } from '../api/types';

export function ConnectApiKeyDialog() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState<ApiKeyProvider>('openai');
  const [label, setLabel] = useState('');
  const [key, setKey] = useState('');

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return connectApiKey(token, { provider, label, key });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: apiKeyKeys.all });
      toast.success('API key connected');
      setLabel('');
      setKey('');
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Failed to connect key');
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Icons.add className='size-4' />
        Connect API Key
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect API Key</DialogTitle>
          <DialogDescription>
            Read-only import — we only fetch usage and billing data, never make requests on your
            behalf.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1.5'>
            <Label>Provider</Label>
            <Select value={provider} onValueChange={(v) => setProvider(v as ApiKeyProvider)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='openai'>OpenAI</SelectItem>
                <SelectItem value='anthropic'>Anthropic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='key-label'>Label</Label>
            <Input
              id='key-label'
              placeholder='e.g. Production'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='key-value'>API Key</Label>
            <Input
              id='key-value'
              type='password'
              placeholder='sk-...'
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => mutation.mutate()}
            disabled={!label || key.length < 4 || mutation.isPending}
          >
            {mutation.isPending ? 'Connecting...' : 'Connect'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
