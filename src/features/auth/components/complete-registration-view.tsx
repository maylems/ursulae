'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { AuthShell } from './auth-shell';
import { CompleteRegistrationForm } from './complete-registration-form';

type Status = 'loading' | 'ready' | 'already-complete' | 'not-signed-in' | 'not-verified';

export default function CompleteRegistrationView() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('loading');
  const [email, setEmail] = useState('');

  useEffect(() => {
    let cancelled = false;
    void authClient
      .getSession()
      .then(({ data }) => {
        if (cancelled) return;
        if (!data?.user) {
          setStatus('not-signed-in');
          return;
        }
        if (!data.user.emailVerified) {
          setStatus('not-verified');
          return;
        }
        if (data.user.name) {
          setStatus('already-complete');
          setTimeout(() => router.replace('/dashboard/overview'), 800);
          return;
        }
        setEmail(data.user.email);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('not-signed-in');
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <AuthShell>
      {status === 'loading' && (
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader className='text-left'>
            <Icons.spinner className='mb-1 h-7 w-7 animate-spin text-primary' />
            <CardTitle className='text-2xl'> Checking your account… </CardTitle>
          </CardHeader>
        </Card>
      )}

      {status === 'ready' && <CompleteRegistrationForm email={email} />}

      {status === 'already-complete' && (
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader className='text-left'>
            <Icons.check className='mb-1 h-7 w-7 text-primary' />
            <CardTitle className='text-2xl'> You're all set </CardTitle>
            <CardDescription>Taking you to your dashboard…</CardDescription>
          </CardHeader>
        </Card>
      )}

      {status === 'not-signed-in' && (
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader className='text-left'>
            <CardTitle className='text-2xl'> Sign in to finish setup </CardTitle>
            <CardDescription>
              Please sign in to your new account to set your username and password.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <Button className='h-11 w-full' onClick={() => router.push('/auth/sign-in')}>
              Go to sign in
            </Button>
          </CardContent>
        </Card>
      )}

      {status === 'not-verified' && (
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader className='text-left'>
            <CardTitle className='text-2xl'> Verify your email first </CardTitle>
            <CardDescription>
              You need a verified email before you can finish setting up your account.
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <Button className='h-11 w-full' onClick={() => router.push('/auth/sign-up')}>
              Go to sign up
            </Button>
          </CardContent>
        </Card>
      )}

      {status !== 'loading' && status !== 'ready' && (
        <p className='text-center text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link
            href='/auth/sign-in'
            className='font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400'
          >
            Sign in
          </Link>
        </p>
      )}
    </AuthShell>
  );
}
