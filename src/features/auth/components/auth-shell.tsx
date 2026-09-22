import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { BrandLogo } from './brand-logo';

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className='relative flex min-h-svh items-center justify-center p-6 sm:p-10'>
      <BrandLogo className='absolute top-3 left-4 sm:top-5 sm:left-8' />
      <div className={cn('flex w-full max-w-md flex-col gap-8')}>{children}</div>
    </main>
  );
}
