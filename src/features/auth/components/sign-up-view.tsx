import { AuthShell } from './auth-shell';
import { CredentialsForm } from './credentials-form';

export default function SignUpViewPage() {
  return (
    <AuthShell>
      <CredentialsForm mode='sign-up' />
    </AuthShell>
  );
}
