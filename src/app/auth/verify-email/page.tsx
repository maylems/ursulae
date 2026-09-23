import type { Metadata } from 'next';
import VerifyEmailView from '@/features/auth/components/verify-email-view';

export const metadata: Metadata = {
  title: 'Email verification | Ursulae',
  description: 'Verify your email address for Ursulae.'
};

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Better Auth redirects here with ?error=<CODE> when a token is invalid/expired.
  const { error } = await searchParams;
  return <VerifyEmailView error={error ?? null} />;
}
