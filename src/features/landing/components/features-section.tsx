import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: 'Usage monitoring',
    description:
      'Every request through the proxy is logged the moment it happens: model, tokens, latency, and status.'
  },
  {
    title: 'AI API cost tracking',
    description:
      'Token counts are priced against up-to-date rate cards for every model, including cached and prompt tokens.'
  },
  {
    title: 'Centralized visibility',
    description:
      "OpenAI and Anthropic usage lands in one place, reconciled against your provider's own reporting."
  },
  {
    title: 'Spending controls',
    description:
      "Set a daily or monthly budget. When it's reached, Ursulae blocks the request before it reaches the provider."
  },
  {
    title: 'Analytics and reporting',
    description: 'Cost by provider, token distribution by model, and a full event log.'
  },
  {
    title: 'Email alerts',
    description: 'Get notified by email the moment a budget hits its threshold or is exceeded.'
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
              Everything between an API call and the invoice.
            </h2>
            <p className='max-w-xl text-lg leading-relaxed tracking-tight text-muted-foreground'>
              From the moment a request leaves your code to the moment it shows up on a bill,
              Ursulae tracks it, prices it, and gives you a lever to pull if it gets out of hand.
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
