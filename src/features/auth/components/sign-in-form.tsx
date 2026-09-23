'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { AuthForm } from '@/components/ui/sign-in';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { getVerificationCallbackURL } from '../lib/verification';

type SocialProvider = 'google' | 'microsoft';

export function SignInForm() {
  const router = useRouter();
  const busy = useRef(false);
  const [resending, setResending] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);

  async function handleEmailSubmit(data: { email: string; password?: string }) {
    if (busy.current) return;
    busy.current = true;
    const email = data.email.trim();
    const { error } = await authClient.signIn.email({
      email,
      password: data.password ?? '',
      callbackURL: getVerificationCallbackURL()
    });
    busy.current = false;

    if (error) {
      if (error.code === 'EMAIL_NOT_VERIFIED') {
        // Better Auth already auto-sent a fresh verification email (sendOnSignIn).
        setUnverifiedEmail(email);
        return;
      }
      toast.error(error.message ?? 'Unable to sign in. Please try again.');
      return;
    }
    router.push('/dashboard/overview');
    router.refresh();
  }

  async function handleResend() {
    if (!unverifiedEmail || resending) return;
    setResending(true);
    const { error } = await authClient.sendVerificationEmail({
      email: unverifiedEmail,
      callbackURL: getVerificationCallbackURL()
    });
    setResending(false);

    if (error) {
      toast.error(error.message ?? 'Unable to resend the verification email. Please try again.');
      return;
    }
    toast.success('Verification email sent — check your inbox.');
  }

  async function handleBetterAuthSocial(provider: SocialProvider) {
    if (busy.current) return;
    busy.current = true;
    try {
      const callbackURL = new URL('/dashboard/overview', window.location.origin).toString();
      const errorCallbackURL = new URL('/auth/sign-in', window.location.origin).toString();
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL,
        errorCallbackURL
      });

      if (error) {
        busy.current = false;
        toast.error(error.message ?? 'Unable to start sign in. Please try again.');
        return;
      }
      if (data?.url) {
        window.location.href = data.url;
      } else {
        busy.current = false;
      }
    } catch {
      busy.current = false;
      toast.error('Unable to start sign in. Please try again.');
    }
  }

  function handleSocialSignIn(provider: SocialProvider) {
    void handleBetterAuthSocial(provider);
  }

  return (
    <>
      <AuthForm onEmailSubmit={handleEmailSubmit} onSocialSignIn={handleSocialSignIn} />
      {unverifiedEmail && (
        <div className='flex flex-col items-center gap-2 px-2 text-center text-sm text-muted-foreground'>
          <p>
            Please verify your email before signing in. We just sent a new link to{' '}
            <span className='font-medium text-foreground'>{unverifiedEmail}</span>.
          </p>
          <Button variant='ghost' size='sm' onClick={handleResend} disabled={resending}>
            {resending ? 'Sending…' : 'Resend verification email'}
          </Button>
        </div>
      )}
    </>
  );
}
