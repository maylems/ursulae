'use client';

import { useCallback } from 'react';
import { authClient } from '@/lib/auth-client';

// Same shape as the old Clerk `useAuth()` so query options keep taking `getToken`.
export function useAuth() {
  const { data: session, isPending } = authClient.useSession();

  const getToken = useCallback(async () => {
    const { data } = await authClient.getSession();
    return data?.session.token ?? null;
  }, []);

  return {
    getToken,
    isLoaded: !isPending,
    userId: session?.user.id ?? null,
    orgId: session?.session.activeOrganizationId ?? null
  };
}
