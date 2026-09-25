import Link from 'next/link';
import { BrandLogo } from '@/features/auth/components/brand-logo';
import { Button } from '@/components/ui/button';
import { ThemeModeToggle } from '@/components/themes/theme-mode-toggle';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Integration', href: '#integration' },
  { label: 'How it works', href: '#how-it-works' }
];

export function SiteHeader() {
  return (
    <header className='sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60'>
      <div className='mx-auto flex h-14 max-w-6xl items-center justify-between px-6'>
        <Link href='/' className='flex shrink-0 items-center' aria-label='Ursulae home'>
          <BrandLogo className='h-5' />
        </Link>

        <nav className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className='text-sm text-muted-foreground transition-colors hover:text-foreground'
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className='flex shrink-0 items-center gap-4'>
          <ThemeModeToggle />
          <Link
            href='/auth/sign-in'
            className='text-sm text-muted-foreground transition-colors hover:text-foreground'
          >
            Sign in
          </Link>
          <Button
            size='sm'
            className='h-8 rounded-full px-4'
            nativeButton={false}
            // oxlint-disable-next-line jsx-a11y/anchor-has-content, jsx-a11y/control-has-associated-label -- link text arrives via props from Button's render composition
            render={<Link href='/auth/sign-up' />}
          >
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
