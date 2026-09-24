import { redirect } from 'next/navigation';
import { LandingView } from '@/features/landing/components/landing-view';
import { getServerAuth } from '@/lib/auth-server';

export default async function Page() {
  const { isSignedIn } = await getServerAuth();
  if (isSignedIn) redirect('/dashboard/overview');
  return <LandingView />;
}
