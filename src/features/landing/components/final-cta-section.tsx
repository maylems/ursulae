import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FinalCtaSection() {
  return (
    <section>
      <div className='mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-28'>
        <h2 className='text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
          Stop guessing what your AI costs.
        </h2>
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
      </div>
    </section>
  );
}
