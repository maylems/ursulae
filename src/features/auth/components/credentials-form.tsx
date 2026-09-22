'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';

export function CredentialsForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isSignUp = mode === 'sign-up';

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email'));
    const password = String(form.get('password'));

    setLoading(true);
    const { error } = isSignUp
      ? await authClient.signUp.email({ name: String(form.get('name')), email, password })
      : await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? 'Something went wrong');
      return;
    }
    router.push('/dashboard/overview');
    router.refresh();
  }

  return (
    <div className='flex w-full flex-col gap-6'>
      <div className='flex flex-col gap-1.5 text-center'>
        <h1 className='text-2xl font-semibold tracking-tight text-foreground'>
          {isSignUp ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className='text-sm text-muted-foreground'>
          {isSignUp ? 'Start controlling your AI spend today.' : 'Sign in to AI Financial Control.'}
        </p>
      </div>
      <form onSubmit={onSubmit} className='flex flex-col gap-4'>
        {isSignUp && (
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor='name'>Name</Label>
            <Input id='name' name='name' placeholder='Jane Doe' required autoComplete='name' />
          </div>
        )}
        <div className='flex flex-col gap-1.5'>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='you@company.com'
            required
            autoComplete='email'
          />
        </div>
        <div className='flex flex-col gap-1.5'>
          <Label htmlFor='password'>Password</Label>
          <div className='relative'>
            <Input
              id='password'
              name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder={isSignUp ? 'At least 8 characters' : 'Enter your password'}
              className='pr-9'
              required
              minLength={8}
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
            />
            <button
              type='button'
              onClick={() => setShowPassword((shown) => !shown)}
              className='absolute inset-y-0 right-1 flex w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <Icons.eyeOff className='h-4 w-4' />
              ) : (
                <Icons.eye className='h-4 w-4' />
              )}
            </button>
          </div>
        </div>
        <Button type='submit' disabled={loading}>
          {loading && <Icons.spinner className='animate-spin' />}
          {isSignUp ? 'Create account' : 'Sign in'}
        </Button>
      </form>
      <p className='text-center text-sm text-muted-foreground'>
        {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
        <Link
          href={isSignUp ? '/auth/sign-in' : '/auth/sign-up'}
          className='font-medium text-foreground underline underline-offset-4 transition-colors hover:text-primary'
        >
          {isSignUp ? 'Sign in' : 'Sign up'}
        </Link>
      </p>
    </div>
  );
}
