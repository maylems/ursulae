export function getVerificationCallbackURL(): string {
  return new URL('/auth/verify-email', window.location.origin).toString();
}
