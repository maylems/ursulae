import { EyeOff, KeyRound, Lock, Unlock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

const pillars = [
  {
    icon: KeyRound,
    title: 'Zero key storage',
    description:
      'Your OpenAI and Anthropic API keys are forwarded in-flight, straight to the provider. We never write your provider keys to a database, disk, or persistent logs.'
  },
  {
    icon: EyeOff,
    title: 'Zero payload retention',
    description:
      'Ursulae meters token counts, model names, latency, and status codes. We do not store, inspect, or log the body or content of your prompts and completions.'
  },
  {
    icon: Lock,
    title: 'Encrypted in transit',
    description:
      'Traffic through the Ursulae proxy is encrypted with TLS end to end, from your app to Ursulae, and from Ursulae to the provider. Nothing moves as plaintext.'
  },
  {
    icon: Unlock,
    title: 'Zero lock-in',
    description:
      "Stop using Ursulae at any time by reverting your SDK's baseURL back to the provider's default. No leftover access, no cleanup required."
  }
];

export function SecuritySection() {
  return (
    <section id='security' className='py-20 sm:py-28'>
      <div className='mx-auto max-w-5xl px-6'>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
            Security &amp; privacy
          </p>
          <h2 className='mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
            Engineered for zero trust from day one.
          </h2>
          <p className='mt-4 text-base text-pretty text-muted-foreground'>
            We designed Ursulae to fit into your infrastructure without compromising your security
            posture or your users' data.
          </p>
        </div>

        <div className='mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {pillars.map(({ icon: Icon, title, description }) => (
            <Card key={title} className='border-0 bg-muted/40 ring-0'>
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
