'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Icons } from '@/components/icons';

export function UsageCostToolbar() {
  return (
    <div className='flex flex-wrap items-center gap-2'>
      <Button variant='outline' size='icon' aria-label='Refresh'>
        <Icons.refresh className='size-4' />
      </Button>
      <Select defaultValue='7d'>
        <SelectTrigger className='w-[150px]'>
          <Icons.calendar className='size-4' />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='24h'>Last 24 hours</SelectItem>
          <SelectItem value='7d'>Last 7 days</SelectItem>
          <SelectItem value='30d'>Last 30 days</SelectItem>
          <SelectItem value='mtd'>Month to date</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue='all'>
        <SelectTrigger className='w-[140px]'>
          <Icons.layers className='size-4' />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='all'>All Models</SelectItem>
          <SelectItem value='openai'>OpenAI</SelectItem>
          <SelectItem value='anthropic'>Anthropic</SelectItem>
          <SelectItem value='google'>Google</SelectItem>
        </SelectContent>
      </Select>
      <Button variant='outline'>
        <Icons.download className='size-4' />
        Export
      </Button>
    </div>
  );
}
