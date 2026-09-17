import PageContainer from '@/components/layout/page-container';
import { ErrorLogView } from '@/features/error-log/components/error-log-view';

export default function ErrorsPage() {
  return (
    <PageContainer
      pageTitle='Errors'
      pageDescription='Failed requests, rate limits, and policy actions'
    >
      <ErrorLogView />
    </PageContainer>
  );
}
