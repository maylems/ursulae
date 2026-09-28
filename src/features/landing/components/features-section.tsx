import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: 'Usage monitoring',
    description:
      'Every request through the proxy is logged as it happens: model, tokens, latency, and status.'
  },
  {
    title: 'AI API cost tracking',
    description:
      'Token counts are priced against up-to-date rate cards for every supported model, including cached and prompt tokens.'
  },
  {
    title: 'Centralized visibility',
    description:
      "OpenAI and Anthropic usage lands in one place, with costs reconciled against your providers' own reporting."
  },
  {
    title: 'Spending controls',
    description:
      'Set a daily or monthly budget. When the limit is reached, Ursulae blocks the request before it reaches the provider.'
  },
  {
    title: 'Analytics and reporting',
    description:
      'See cost by provider, model, feature, token type, and request, with a complete event log.'
  },
  {
    title: 'Email alerts',
    description: 'Get notified when spending reaches your configured thresholds or limits.'
  }
];

export function FeaturesSection() {
  return (
    <section id='features' className='w-full py-20 lg:py-28'>
      <div className='mx-auto max-w-5xl px-6'>
        <div className='flex flex-col items-start gap-4'>
          <Badge>Platform</Badge>
          <div className='flex flex-col gap-2'>
            <h2 className='text-3xl font-medium tracking-tighter lg:max-w-xl lg:text-5xl'>
              Everything between an API call and your AI spend.
            </h2>
            <p className='max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground'>
              From the moment a request leaves your code to the moment its cost appears in your
              provider's reporting, Ursulae tracks it, prices it, and gives your team a lever to
              control spending.
            </p>
          </div>

          <div className='grid w-full grid-cols-1 items-start gap-10 pt-12 sm:grid-cols-2 lg:grid-cols-3'>
            {features.map(({ title, description }) => (
              <div key={title} className='flex w-full flex-row items-start gap-6'>
                <Check className='mt-2 size-4 shrink-0 text-primary' />
                <div className='flex flex-col gap-1'>
                  <p>{title}</p>
                  <p className='text-sm text-muted-foreground'>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
