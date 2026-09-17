import PageContainer from '@/components/layout/page-container';
import { BudgetsView } from '@/features/budgets/components/budgets-view';

export default function BudgetsPage() {
  return (
    <PageContainer
      pageTitle='Budgets & Alerts'
      pageDescription='Set spending limits and get notified before they are hit'
    >
      <BudgetsView />
    </PageContainer>
  );
}
