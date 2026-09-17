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
import type { Budget, BudgetPeriod, BudgetScope } from '../constants/mock-data';

export function NewBudgetDialog({ onCreate }: { onCreate: (budget: Budget) => void }) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState('');
  const [scope, setScope] = useState<BudgetScope>('organization');
  const [period, setPeriod] = useState<BudgetPeriod>('monthly');
  const [limit, setLimit] = useState('');

  const handleCreate = () => {
    if (!label || !limit) return;
    onCreate({
      id: crypto.randomUUID(),
      label,
      scope,
      period,
      limit: Number(limit),
      spent: 0,
      alertThresholdPercent: 80
    });
    setLabel('');
    setLimit('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button />}>
        <Icons.add className='size-4' />
        New Budget
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Budget</DialogTitle>
          <DialogDescription>
            Set a spending limit for an organization or a specific API key.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='budget-label'>Label</Label>
            <Input
              id='budget-label'
              placeholder='e.g. research-agent key'
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col gap-1.5'>
              <Label>Scope</Label>
              <Select value={scope} onValueChange={(v) => setScope(v as BudgetScope)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='organization'>Organization</SelectItem>
                  <SelectItem value='api_key'>API Key</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='flex flex-col gap-1.5'>
              <Label>Period</Label>
              <Select value={period} onValueChange={(v) => setPeriod(v as BudgetPeriod)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='daily'>Daily</SelectItem>
                  <SelectItem value='monthly'>Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='budget-limit'>Limit (USD)</Label>
            <Input
              id='budget-limit'
              type='number'
              placeholder='500'
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!label || !limit}>
            Create Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
