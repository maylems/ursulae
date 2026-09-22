import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerAuth } from '@/lib/auth-server';
import SignInViewPage from '@/features/auth/components/sign-in-view';

export const metadata: Metadata = {
  title: 'Sign in to Ursulae',
  description: 'Monitor and control your AI spending, all in one place.'
};

export default async function Page() {
  const { isSignedIn } = await getServerAuth();
  if (isSignedIn) redirect('/dashboard/overview');
  return <SignInViewPage />;
}
