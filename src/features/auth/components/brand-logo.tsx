import Image from 'next/image';

import { cn } from '@/lib/utils';

export function BrandLogo({ className }: { className?: string }) {
  return (
    <Image
      src='/ursulae.png'
      alt='Ursulae'
      width={462}
      height={381}
      className={cn('h-6 w-auto object-contain', className)}
      priority
    />
  );
}
