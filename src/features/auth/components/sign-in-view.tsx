import Link from 'next/link';
import { AuthShell } from './auth-shell';
import { SignInForm } from './sign-in-form';

export default function SignInViewPage() {
  return (
    <AuthShell>
      <SignInForm />
      <p className='text-center text-sm text-muted-foreground'>
        Don't have an account?{' '}
        <Link
          href='/auth/sign-up'
          className='font-medium text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400'
        >
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}
