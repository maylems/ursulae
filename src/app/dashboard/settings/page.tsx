import PageContainer from '@/components/layout/page-container';
import { SettingsView } from '@/features/settings/components/settings-view';

export default function SettingsPage() {
  return (
    <PageContainer pageTitle='Settings' pageDescription='API keys, organization, and notifications'>
      <SettingsView />
    </PageContainer>
  );
}
