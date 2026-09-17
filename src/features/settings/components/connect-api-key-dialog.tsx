'use client';

import { useState } from 'react';
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
import type { ApiKeyProvider, ConnectedApiKey } from '../constants/mock-data';

export function ConnectApiKeyDialog({ onConnect }: { onConnect: (key: ConnectedApiKey) => void }) {
  const [open, setOpen] = useState(false);
  const [provider, setProvider] = useState<ApiKeyProvider>('openai');
  const [label, setLabel] = useState('');
  const [key, setKey] = useState('');

  const handleConnect = () => {
    if (!label || key.length < 4) return;
    onConnect({
      id: crypto.randomUUID(),
      provider,
      label,
      lastFour: key.slice(-4),
      status: 'active',
      lastSynced: 'just now'
    });
    setLabel('');
    setKey('');
    setOpen(false);
  };

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
                <SelectItem value='google'>Google</SelectItem>
                <SelectItem value='mistral'>Mistral</SelectItem>
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
          <Button onClick={handleConnect} disabled={!label || key.length < 4}>
            Connect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
