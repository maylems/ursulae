import PageContainer from '@/components/layout/page-container';
import { UsageCostToolbar } from '@/features/usage-cost/components/usage-cost-toolbar';
import { UsageCostView } from '@/features/usage-cost/components/usage-cost-view';

export default function OverviewPage() {
  return (
    <PageContainer
      pageTitle='Usage & Cost'
      pageDescription='Detailed usage analytics'
      pageHeaderAction={<UsageCostToolbar />}
    >
      <UsageCostView />
    </PageContainer>
  );
}
