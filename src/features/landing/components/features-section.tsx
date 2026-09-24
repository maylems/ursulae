import { Activity, BarChart3, Boxes, Coins, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: Activity,
    title: 'Usage monitoring',
    description:
      'Every request through the proxy is logged the moment it happens: model, tokens, latency, and status, not a daily aggregate you have to wait for.',
    span: 'lg:col-span-2'
  },
  {
    icon: Coins,
    title: 'AI API cost tracking',
    description:
      'Token counts are priced against up-to-date rate cards for every model, including cached and prompt tokens, so the number on your dashboard matches the one on your invoice.',
    span: 'lg:col-span-1'
  },
  {
    icon: Boxes,
    title: 'Centralized visibility',
    description:
      "OpenAI and Anthropic usage lands in one place, reconciled against your provider's own reporting so nothing is double-counted and nothing is missed.",
    span: 'lg:col-span-1'
  },
  {
    icon: ShieldCheck,
    title: 'Spending controls',
    description:
      "Set a daily or monthly budget per organization. When it's reached, Ursulae blocks the request before it reaches the provider, not after.",
    span: 'lg:col-span-1'
  },
  {
    icon: BarChart3,
    title: 'Analytics and reporting',
    description:
      'Cost by provider, token distribution by model, and a full event log, so you can answer "what changed" without exporting a spreadsheet.',
    span: 'lg:col-span-1'
  }
];

export function FeaturesSection() {
  return (
    <section id='features' className='py-20 sm:py-28'>
      <div className='mx-auto max-w-5xl px-6'>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
            Features
          </p>
          <h2 className='mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
            Everything between an API call and the invoice.
          </h2>
          <p className='mt-4 text-base text-pretty text-muted-foreground'>
            From the moment a request leaves your code to the moment it shows up on a bill, Ursulae
            tracks it, prices it, and gives you a lever to pull if it gets out of hand.
          </p>
        </div>

        <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map(({ icon: Icon, title, description, span }) => (
            <Card key={title} className={cn('border-0 bg-muted/40 ring-0', span)}>
              <CardContent className='flex h-full flex-col gap-3'>
                <div className='flex size-9 items-center justify-center rounded-lg bg-background ring-1 ring-border'>
                  <Icon className='size-4 text-foreground' />
                </div>
                <CardTitle className='text-base font-semibold'>{title}</CardTitle>
                <CardDescription className='text-sm text-pretty'>{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
