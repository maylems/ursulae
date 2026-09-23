'use client';

import { MailCheck } from 'lucide-react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface VerificationPromptProps {
  email: string;
  resending?: boolean;
  onResend?: () => void;
  backLabel?: string;
  onBack?: () => void;
}

export function VerificationPrompt({
  email,
  resending = false,
  onResend,
  backLabel,
  onBack
}: VerificationPromptProps) {
  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader className='text-left'>
        <MailCheck className='mb-1 h-7 w-7 text-primary' />
        <CardTitle className='text-2xl'> Check your inbox </CardTitle>
        <CardDescription>
          We've sent a verification link to{' '}
          <span className='font-medium text-foreground'>{email}</span>. Click it to activate your
          account.
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <Button className='h-11 w-full' onClick={onResend} disabled={resending}>
          {resending && <Icons.spinner className='mr-2 animate-spin' />}
          {resending ? 'Sending…' : 'Resend verification email'}
        </Button>
        {onBack && (
          <Button variant='ghost' className='w-full text-muted-foreground' onClick={onBack}>
            {backLabel ?? 'Go back'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
