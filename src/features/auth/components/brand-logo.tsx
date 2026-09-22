import { cn } from '@/lib/utils';

/**
 * Logo placeholder — swap the mark and wordmark once the real logo is ready.
 */
export function BrandLogo({
  className,
  showWordmark = true
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2.25'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='h-5 w-5'
          aria-hidden='true'
        >
          <path d='M6 9h12' />
          <path d='M6 15h12' />
          <path d='M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z' />
          <path d='M12 3v18' />
        </svg>
      </span>
      {showWordmark && (
        <span className='text-base font-semibold tracking-tight text-foreground'>
          AI Financial Control
        </span>
      )}
    </span>
  );
}
