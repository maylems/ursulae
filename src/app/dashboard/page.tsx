import { redirect } from 'next/navigation';
import { getServerAuth } from '@/lib/auth-server';

export default async function Page() {
  const { isSignedIn } = await getServerAuth();
  redirect(isSignedIn ? '/dashboard/overview' : '/auth/sign-in');
}
