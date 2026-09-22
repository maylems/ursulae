import { AuthShell } from './auth-shell';
import { CredentialsForm } from './credentials-form';

export default function SignInViewPage() {
  return (
    <AuthShell>
      <CredentialsForm mode='sign-in' />
    </AuthShell>
  );
}
