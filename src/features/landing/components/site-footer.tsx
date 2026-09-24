import Link from 'next/link';

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Integration', href: '#integration' },
      { label: 'How it works', href: '#how-it-works' }
    ]
  },
  {
    heading: 'Account',
    links: [
      { label: 'Sign in', href: '/auth/sign-in' },
      { label: 'Get started', href: '/auth/sign-up' }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className='overflow-hidden border-t border-border/60 bg-background'>
      <div className='mx-auto max-w-6xl px-6 pt-16 sm:pt-20'>
        <div className='grid grid-cols-2 gap-10 sm:grid-cols-4'>
          <div className='col-span-2'>
            <span className='text-sm font-semibold text-foreground'>Ursulae</span>
            <p className='mt-3 max-w-xs text-sm text-pretty text-muted-foreground'>
              Real-time metering, cost tracking, and spend controls for your OpenAI and Anthropic
              traffic. Currently in private beta.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading} className='flex flex-col gap-3'>
              <p className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
                {column.heading}
              </p>
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-sm text-muted-foreground transition-colors hover:text-foreground'
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className='mt-16 flex flex-col items-center gap-2 border-t border-border/60 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between'>
          <span>&copy; {new Date().getFullYear()} Ursulae. All rights reserved.</span>
          <span>Private beta</span>
        </div>
      </div>

      <div
        aria-hidden
        className='pointer-events-none -mb-8 text-center leading-none font-bold tracking-tighter text-foreground/5 select-none sm:-mb-14'
        style={{ fontSize: 'clamp(4.5rem, 18vw, 11rem)' }}
      >
        Ursulae
      </div>
    </footer>
  );
}
