import Link from 'next/link';
import { AuthShell } from './auth-shell';
import { SignUpForm } from './sign-up-form';

export default function SignUpViewPage() {
  return (
    <AuthShell>
      <SignUpForm />
      <p className='text-center text-sm text-muted-foreground'>
        Already have an account?{' '}
        <Link
          href='/auth/sign-in'
          className='font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400'
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
