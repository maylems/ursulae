import type { ReactNode } from 'react';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { BrandLogo } from './brand-logo';

const features = [
  {
    icon: Icons.activity,
    title: 'Usage & cost analytics',
    text: 'See spend across every model and provider in real time.'
  },
  {
    icon: Icons.notification,
    title: 'Budget alerts',
    text: 'Get notified before costs drift past your limits.'
  },
  {
    icon: Icons.lock,
    title: 'Controlled access',
    text: 'Scoped API keys and org-wide access controls.'
  }
];

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-svh lg:grid lg:grid-cols-2'>
      <aside className='relative hidden overflow-hidden lg:flex lg:flex-col lg:border-r lg:border-border/60'>
        <div className='absolute inset-0 bg-gradient-to-b from-sidebar via-sidebar to-background' />
        <div
          className='absolute inset-0 opacity-60 [background-image:radial-gradient(var(--color-border)_1.5px,transparent_1.5px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]'
          aria-hidden='true'
        />
        <div
          className='pointer-events-none absolute -top-48 right-0 left-0 h-96 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent_60%)]'
          aria-hidden='true'
        />
        <div className='relative z-10 flex h-full flex-col p-10'>
          <BrandLogo />
          <div className='mt-auto flex flex-col gap-10'>
            <div className='space-y-3'>
              <h2 className='text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl'>
                Spend smarter on AI.
              </h2>
              <p className='max-w-md text-sm leading-relaxed text-muted-foreground'>
                One place to track, budget, and control your organization's AI usage — before the
                bills surprise you.
              </p>
            </div>
            <ul className='flex flex-col gap-4'>
              {features.map((feature) => (
                <li key={feature.title} className='group flex items-start gap-3'>
                  <span className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-sm'>
                    <feature.icon className='h-4 w-4 text-foreground' />
                  </span>
                  <div>
                    <p className='text-sm font-medium text-foreground'>{feature.title}</p>
                    <p className='text-sm text-muted-foreground'>{feature.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <main className='flex min-h-svh items-center justify-center p-6 sm:p-10'>
        <div className={cn('flex w-full max-w-sm flex-col gap-8')}>
          <BrandLogo className='justify-center lg:hidden' />
          {children}
        </div>
      </main>
    </div>
  );
}
