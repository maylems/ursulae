'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react';

// Simple SVG components for brand icons as placeholders
const GoogleIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  // oxlint-disable-next-line next/no-img-element -- provided verbatim (remote brand icon)
  <img
    src='https://cdn.21st.dev/assets/mirror/a6/a60266dab17c1c00981c7077fa025aa84c92782e0657ca2f78b7f70cbb8d5a56.svg'
    alt=''
    {...props}
  />
);

const MicrosoftIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  // oxlint-disable-next-line next/no-img-element -- provided verbatim (remote brand icon)
  <img
    src='https://cdn.21st.dev/assets/mirror/72/726aa11548b3771591ccbd747f744fbc8acc6879594c14edc740f2c0a00f016b.svg'
    alt=''
    {...props}
  />
);

interface AuthSignUpProps extends React.HTMLAttributes<HTMLDivElement> {
  onEmailSubmit?: (data: { email: string }) => void;
  onSocialSignIn?: (provider: 'google' | 'microsoft') => void;
}

const AuthSignUp = React.forwardRef<HTMLDivElement, AuthSignUpProps>(
  ({ className, onEmailSubmit, onSocialSignIn, ...props }, ref) => {
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      onEmailSubmit?.({ email });
    };

    return (
      <Card ref={ref} className={cn('w-full mx-auto max-w-md', className)} {...props}>
        <CardHeader className='text-left'>
          <CardTitle className='text-2xl'> Create your account </CardTitle>
          <CardDescription>
            Enter your email and we'll send you a verification link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-4'>
            {/* Social Sign-in */}
            <div className='flex flex-col gap-2'>
              <Button
                variant='outline'
                className='h-11 w-full'
                onClick={() => onSocialSignIn?.('google')}
              >
                <span className='flex w-full items-center justify-center'>
                  <GoogleIcon className='size-5 fill-primary' />
                  <span className='ml-2 w-48 text-left'>Continue with Google</span>
                </span>
              </Button>
              <Button
                variant='outline'
                className='h-11 w-full'
                onClick={() => onSocialSignIn?.('microsoft')}
              >
                <span className='flex w-full items-center justify-center'>
                  <MicrosoftIcon className='size-5 fill-primary' />
                  <span className='ml-2 w-48 text-left'>Continue with Microsoft</span>
                </span>
              </Button>
            </div>

            {/* Divider */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'> OR </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleFormSubmit} className='flex flex-col gap-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'> Email </Label>
                <div className='relative'>
                  <Mail className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='email'
                    name='email'
                    type='email'
                    placeholder='jdoe.mobbin@gmail.com'
                    className='pl-9'
                    required
                    autoComplete='email'
                  />
                </div>
              </div>
              <Button type='submit' className='h-11 w-full'>
                Send verification link
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className='flex-col items-start space-y-4'>
          <p className='w-full text-center text-xs text-muted-foreground'>
            By continuing, you agree to our{' '}
            {/* oxlint-disable-next-line jsx-a11y/anchor-is-valid -- provided verbatim */}
            <a href='#' className='underline hover:text-primary'>
              {' '}
              Terms of Service{' '}
            </a>{' '}
            & {/* oxlint-disable-next-line jsx-a11y/anchor-is-valid -- provided verbatim */}
            <a href='#' className='underline hover:text-primary'>
              {' '}
              Privacy Policy{' '}
            </a>
          </p>
        </CardFooter>
      </Card>
    );
  }
);
AuthSignUp.displayName = 'AuthSignUp';

export { AuthSignUp };
