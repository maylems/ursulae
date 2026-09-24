'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, MailCheck } from 'lucide-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { AuthShell } from './auth-shell';

type Status = 'checking' | 'verified' | 'not-signed-in';

const errorCopy: Record<string, string> = {
  TOKEN_EXPIRED: 'This verification link has expired. Request a new one from the sign-in page.',
  INVALID_TOKEN: 'This verification link is not valid. Request a new one from the sign-in page.',
  USER_NOT_FOUND: "We couldn't find an account for this verification link."
};

export default function VerifyEmailView({ error }: { error: string | null }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('checking');
  const [needsSetup, setNeedsSetup] = useState(false);

  useEffect(() => {
    if (error) return;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout> | undefined;

    void authClient.getSession().then(({ data }) => {
      if (cancelled) return;
      const verified = Boolean(data?.user && data.user.emailVerified);
      const incomplete = verified && !data?.user?.name;
      setStatus(verified ? 'verified' : 'not-signed-in');
      setNeedsSetup(incomplete);
      if (verified) {
        timeout = setTimeout(
          () => router.push(incomplete ? '/auth/complete-registration' : '/dashboard/overview'),
          1500
        );
      }
    });

    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [error, router]);

  return (
    <AuthShell>
      {error ? (
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader className='text-left'>
            <AlertCircle className='mb-1 h-7 w-7 text-destructive' />
            <CardTitle className='text-2xl'> Verification failed </CardTitle>
            <CardDescription>
              {errorCopy[error] ?? 'We could not verify this link.'}
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <Button className='h-11 w-full' onClick={() => router.push('/auth/sign-in')}>
              Go to sign in
            </Button>
            <Button
              variant='ghost'
              className='w-full text-muted-foreground'
              onClick={() => router.push('/auth/sign-up')}
            >
              Create an account
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader className='text-left'>
            {status === 'checking' && (
              <>
                <Icons.spinner className='mb-1 h-7 w-7 animate-spin text-primary' />
                <CardTitle className='text-2xl'> Checking your email… </CardTitle>
              </>
            )}
            {status === 'verified' && (
              <>
                <MailCheck className='mb-1 h-7 w-7 text-primary' />
                <CardTitle className='text-2xl'> Email verified </CardTitle>
                <CardDescription>
                  {needsSetup
                    ? 'Almost there — finish setting up your username and password.'
                    : 'Your email address is verified. Taking you to your dashboard…'}
                </CardDescription>
              </>
            )}
            {status === 'not-signed-in' && (
              <>
                <CheckCircle2 className='mb-1 h-7 w-7 text-primary' />
                <CardTitle className='text-2xl'> Email verified </CardTitle>
                <CardDescription>
                  Your email address is verified. You can now sign in.
                </CardDescription>
              </>
            )}
          </CardHeader>
          {status === 'verified' && (
            <CardContent className='flex flex-col gap-2'>
              <Button
                className='h-11 w-full'
                onClick={() =>
                  router.push(needsSetup ? '/auth/complete-registration' : '/dashboard/overview')
                }
              >
                {needsSetup ? 'Continue to setup' : 'Go to dashboard'}
              </Button>
            </CardContent>
          )}
          {status === 'not-signed-in' && (
            <CardContent className='flex flex-col gap-2'>
              <Button className='h-11 w-full' onClick={() => router.push('/auth/sign-in')}>
                Go to sign in
              </Button>
            </CardContent>
          )}
        </Card>
      )}
    </AuthShell>
  );
}
