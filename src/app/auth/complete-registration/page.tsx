import type { Metadata } from 'next';
import CompleteRegistrationView from '@/features/auth/components/complete-registration-view';

export const metadata: Metadata = {
  title: 'Complete your registration | Ursulae',
  description: 'Set your username and password to finish creating your account.'
};

export default function Page() {
  return <CompleteRegistrationView />;
}
