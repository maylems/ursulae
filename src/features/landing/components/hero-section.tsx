import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className='relative isolate overflow-hidden'>
      {/* A faint fixed-size dot grid, faded out toward the edges via a mask. */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-[0.4] dark:opacity-[0.25]'
        style={{
          backgroundImage:
            'radial-gradient(color-mix(in oklch, var(--foreground), transparent 82%) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 0%, black 40%, transparent 90%)'
        }}
      />

      <div className='mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-28'>
        <div className='animate-in fade-in slide-in-from-bottom-2 duration-700'>
          <span className='inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground'>
            <span className='size-1.5 rounded-full bg-primary' />
            Private beta &middot; OpenAI &amp; Anthropic
          </span>
        </div>

        <h1 className='mt-6 animate-in fade-in slide-in-from-bottom-3 text-4xl font-semibold tracking-tight text-balance duration-700 sm:text-6xl'>
          Control what your AI
          <br />
          actually costs.
        </h1>

        <p className='mt-6 max-w-2xl animate-in fade-in slide-in-from-bottom-3 text-base text-pretty text-muted-foreground delay-100 duration-700 sm:text-lg'>
          Ursulae meters every OpenAI and Anthropic request as it happens, attributes the cost to
          the team or feature behind it, and enforces the budget before it&apos;s exceeded, not
          after the invoice arrives.
        </p>

        <div className='mt-10 flex animate-in fade-in slide-in-from-bottom-3 flex-col items-center gap-3 delay-150 duration-700 sm:flex-row'>
          <Button
            size='lg'
            className='h-11 px-6 text-base'
            nativeButton={false}
            // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label -- link text arrives via props from Button's render composition
            render={<Link href='/auth/sign-in' />}
          >
            Get started
            <ArrowRight data-icon='inline-end' />
          </Button>
          <Button
            variant='outline'
            size='lg'
            className='h-11 px-6 text-base'
            nativeButton={false}
            // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label -- link text arrives via props from Button's render composition
            render={<Link href='#how-it-works' />}
          >
            See how it works
          </Button>
        </div>

        <p className='mt-6 animate-in fade-in text-xs text-muted-foreground delay-200 duration-700'>
          Works with the OpenAI and Anthropic keys you already have.
        </p>
      </div>
    </section>
  );
}
