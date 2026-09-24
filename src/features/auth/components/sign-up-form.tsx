'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { AuthSignUp } from '@/components/ui/sign-up';
import { authClient } from '@/lib/auth-client';
import { VerificationPrompt } from './verification-prompt';
import { getVerificationCallbackURL } from '../lib/verification';
import {
  generateTempPassword,
  setPendingRegistration,
  clearPendingRegistration
} from '../lib/pending-registration';

type SocialProvider = 'google' | 'microsoft';

export function SignUpForm() {
  const busy = useRef(false);
  const [resending, setResending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  async function handleEmailSubmit(data: { email: string }) {
    if (busy.current) return;
    busy.current = true;
    const email = data.email.trim();
    const tempPassword = generateTempPassword();
    const { error } = await authClient.signUp.email({
      email,
      name: '',
      password: tempPassword,
      callbackURL: getVerificationCallbackURL()
    });
    busy.current = false;

    if (error) {
      toast.error(error.message ?? 'Unable to create your account. Please try again.');
      return;
    }

    // The account now exists but there's no session yet — Better Auth sent a
    // verification email and the user must click the link. Signing up the same
    // email again is indistinguishable (the API returns a generic success), so
    // the account state is never leaked.
    setPendingRegistration({ email, tempPassword, createdAt: Date.now() });
    setPendingEmail(email);
  }

  async function handleResend() {
    if (!pendingEmail || resending) return;
    setResending(true);
    const { error } = await authClient.sendVerificationEmail({
      email: pendingEmail,
      callbackURL: getVerificationCallbackURL()
    });
    setResending(false);

    if (error) {
      toast.error(error.message ?? 'Unable to resend the verification email. Please try again.');
      return;
    }
    toast.success('Verification email sent — check your inbox.');
  }

  async function handleBetterAuthSocial(provider: SocialProvider) {
    if (busy.current) return;
    busy.current = true;
    try {
      const callbackURL = new URL('/dashboard/overview', window.location.origin).toString();
      const errorCallbackURL = new URL('/auth/sign-up', window.location.origin).toString();
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL,
        errorCallbackURL
      });

      if (error) {
        busy.current = false;
        toast.error(error.message ?? 'Unable to start sign up. Please try again.');
        return;
      }
      if (data?.url) {
        window.location.href = data.url;
      } else {
        busy.current = false;
      }
    } catch {
      busy.current = false;
      toast.error('Unable to start sign up. Please try again.');
    }
  }

  function handleSocialSignIn(provider: SocialProvider) {
    void handleBetterAuthSocial(provider);
  }

  function handleBack() {
    clearPendingRegistration();
    setPendingEmail(null);
  }

  if (pendingEmail) {
    return (
      <VerificationPrompt
        email={pendingEmail}
        resending={resending}
        onResend={handleResend}
        backLabel='Use a different email'
        onBack={handleBack}
      />
    );
  }

  return <AuthSignUp onEmailSubmit={handleEmailSubmit} onSocialSignIn={handleSocialSignIn} />;
}
