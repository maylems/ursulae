'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'sonner';
import { AuthForm } from '@/components/ui/sign-in';
import { authClient } from '@/lib/auth-client';

type SocialProvider = 'google' | 'microsoft';

export function SignInForm() {
  const router = useRouter();
  const busy = useRef(false);

  async function handleEmailSubmit(data: { email: string; password?: string }) {
    if (busy.current) return;
    busy.current = true;
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password ?? ''
    });
    busy.current = false;

    if (error) {
      toast.error(error.message ?? 'Unable to sign in. Please try again.');
      return;
    }
    router.push('/dashboard/overview');
    router.refresh();
  }

  async function handleBetterAuthSocial(provider: 'google' | 'microsoft') {
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

  return <AuthForm onEmailSubmit={handleEmailSubmit} onSocialSignIn={handleSocialSignIn} />;
}
