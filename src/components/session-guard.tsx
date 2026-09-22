'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

// The server layout only checks that a session cookie exists; this validates
// it and sends expired sessions back to sign-in. The cached client session can
// still read "signed out" right after sign-in, so confirm with a fresh fetch.
export function SessionGuard() {
  const router = useRouter();
  const { data: session, isPending, refetch } = authClient.useSession();

  useEffect(() => {
    if (isPending || session) return;
    let cancelled = false;
    authClient.getSession().then(({ data }) => {
      if (cancelled) return;
      if (data) void refetch();
      else router.replace('/auth/sign-in');
    });
    return () => {
      cancelled = true;
    };
  }, [isPending, session, router, refetch]);

  return null;
}
