'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Check, Eye, EyeOff, KeyRound, User } from 'lucide-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth-client';
import { clearPendingRegistration, getPendingRegistration } from '../lib/pending-registration';

const USERNAME_PATTERN = /^[A-Za-z0-9](?:[A-Za-z0-9_.-]{2,29})$/;

type Errors = {
  username?: string;
  password?: string;
  confirm?: string;
};

export function CompleteRegistrationForm({ email }: { email: string }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const next: Errors = {};
    if (!USERNAME_PATTERN.test(username)) {
      next.username =
        'Username must be 3–30 characters using letters, numbers, dots, dashes or underscores.';
    }
    if (password.length < 8) {
      next.password = 'Password must be at least 8 characters.';
    }
    if (confirm !== password) {
      next.confirm = 'Passwords do not match.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);

    const pending = getPendingRegistration();
    const tempPassword =
      pending && pending.email.toLowerCase() === email.toLowerCase() ? pending.tempPassword : null;

    if (tempPassword) {
      const change = await authClient.changePassword({
        currentPassword: tempPassword,
        newPassword: password,
        revokeOtherSessions: true
      });
      if (change.error) {
        setSubmitting(false);
        toast.error(change.error.message ?? 'Unable to set your password. Please try again.');
        return;
      }
    } else {
      await authClient.requestPasswordReset({
        email,
        redirectTo: '/auth/sign-in'
      });
    }

    const update = await authClient.updateUser({ name: username });
    if (update.error) {
      setSubmitting(false);
      toast.error(update.error.message ?? 'Unable to save your username. Please try again.');
      return;
    }

    clearPendingRegistration();
    setSubmitting(false);
    toast.success('Your account is ready. Welcome!');
    router.push('/dashboard/overview');
    router.refresh();
  }

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader className='text-left'>
        <Check className='mb-1 h-7 w-7 text-primary' />
        <CardTitle className='text-2xl'> Finish setting up </CardTitle>
        <CardDescription>Choose your username and password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='username'> Username </Label>
            <div className='relative'>
              <User className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                id='username'
                name='username'
                type='text'
                placeholder='janedoe'
                className='pl-9'
                autoComplete='username'
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                aria-invalid={Boolean(errors.username)}
              />
            </div>
            {errors.username && <p className='text-sm text-destructive'>{errors.username}</p>}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='password'> Password </Label>
            <div className='relative'>
              <KeyRound className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                className='pr-10 pl-9'
                autoComplete='new-password'
                value={password}
                minLength={8}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={Boolean(errors.password)}
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 text-muted-foreground'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </Button>
            </div>
            {errors.password && <p className='text-sm text-destructive'>{errors.password}</p>}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='confirm'> Confirm password </Label>
            <div className='relative'>
              <KeyRound className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <Input
                id='confirm'
                name='confirm'
                type={showConfirm ? 'text' : 'password'}
                className='pr-10 pl-9'
                autoComplete='new-password'
                value={confirm}
                minLength={8}
                onChange={(event) => setConfirm(event.target.value)}
                aria-invalid={Boolean(errors.confirm)}
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2 text-muted-foreground'
                onClick={() => setShowConfirm(!showConfirm)}
              >
                {showConfirm ? <EyeOff className='h-4 w-4' /> : <Eye className='h-4 w-4' />}
              </Button>
            </div>
            {errors.confirm && <p className='text-sm text-destructive'>{errors.confirm}</p>}
          </div>

          <Button type='submit' className='h-11 w-full' disabled={submitting}>
            {submitting && <Icons.spinner className='animate-spin' />}
            {submitting ? 'Setting up…' : 'Finish setup'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
