'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

const PROVIDERS = [
  { id: 'google', label: 'Google', icon: Icons.google },
  { id: 'microsoft', label: 'Microsoft', icon: Icons.microsoft }
] as const;

type ProviderId = (typeof PROVIDERS)[number]['id'];

export function SocialSignIn() {
  const [pending, setPending] = useState<ProviderId | null>(null);

  async function startSignIn(provider: ProviderId) {
    if (pending) return;
    setPending(provider);
    try {
      // Absolute URLs on the frontend origin: Better Auth's callback, error and
      // trusted-origin checks all run against these, so keep them on our origin.
      const callbackURL = new URL('/dashboard/overview', window.location.origin).toString();
      const errorCallbackURL = new URL('/auth/sign-in', window.location.origin).toString();
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL,
        errorCallbackURL
      });

      if (error) {
        setPending(null);
        toast.error('Unable to start sign in. Please try again.');
        return;
      }

      // The client navigates to the provider when `redirect: true`; fall back
      // to the returned URL explicitly in case the provider did not redirect.
      if (data?.url) {
        window.location.href = data.url;
      } else {
        setPending(null);
      }
    } catch {
      setPending(null);
      toast.error('Unable to start sign in. Please try again.');
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background text-muted-foreground px-2'>Or continue with</span>
        </div>
      </div>
      {PROVIDERS.map((provider) => {
        const isLoading = pending === provider.id;
        return (
          <Button
            key={provider.id}
            type='button'
            variant='outline'
            className='w-full'
            disabled={pending !== null}
            onClick={() => startSignIn(provider.id)}
          >
            {isLoading ? (
              <Icons.spinner className='animate-spin' />
            ) : (
              <provider.icon className='mr-2 h-4 w-4' />
            )}
            Continue with {provider.label}
          </Button>
        );
      })}
    </div>
  );
}
