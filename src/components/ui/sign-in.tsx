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
import { Eye, EyeOff, KeyRound, Mail } from 'lucide-react';

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

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onEmailSubmit?: (data: { email: string; password?: string }) => void;
  onSocialSignIn?: (provider: 'google' | 'microsoft') => void;
}

const AuthForm = React.forwardRef<HTMLDivElement, AuthFormProps>(
  ({ className, onEmailSubmit, onSocialSignIn, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      onEmailSubmit?.({ email, password });
    };

    return (
      <Card ref={ref} className={cn('w-full mx-auto max-w-md', className)} {...props}>
        <CardHeader className='text-left'>
          <CardTitle className='text-2xl'> Sign in with email </CardTitle>
          <CardDescription>
            Make a new doc to bring your words, data, and teams together. For free.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {/* Social Sign-in */}
            <div className='space-y-2'>
              <Label className='text-xs text-muted-foreground'> Sign in with</Label>
              <div className='grid grid-cols-2 gap-2'>
                <Button variant='outline' onClick={() => onSocialSignIn?.('google')}>
                  <GoogleIcon className='size-4 fill-primary' />
                </Button>
                <Button variant='outline' onClick={() => onSocialSignIn?.('microsoft')}>
                  <MicrosoftIcon className='size-4 fill-primary' />
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'> or </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleFormSubmit} className='space-y-4'>
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
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <Label htmlFor='password'> Password </Label>
                  {/* oxlint-disable-next-line jsx-a11y/anchor-is-valid -- provided verbatim */}
                  <a href='#' className='text-sm font-medium text-primary hover:underline'>
                    {' '}
                    Forgot password ?{' '}
                  </a>
                </div>
                <div className='relative'>
                  <KeyRound className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input
                    id='password'
                    name='password'
                    type={showPassword ? 'text' : 'password'}
                    className='pr-10 pl-9'
                    required
                  />
                  <Button
                    type='button'
                    variant='ghost'
                    size='icon'
                    className='absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 text-muted-foreground'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
                  </Button>
                </div>
              </div>
              <Button type='submit' className='w-full'>
                {' '}
                Sign In{' '}
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className='flex-col items-start space-y-4'>
          <p className='w-full text-center text-xs text-muted-foreground'>
            By logging in, you agree to our{' '}
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
AuthForm.displayName = 'AuthForm';

export { AuthForm };
