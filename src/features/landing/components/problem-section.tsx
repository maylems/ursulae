import { Ban, EyeOff, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

const problems = [
  {
    icon: EyeOff,
    title: 'No real-time control at the application layer',
    description:
      "API requests happen inside your application. Provider dashboards can show you what was used, but they don't sit in the request path of your application. Ursulae sees each request as it happens and can enforce your spending limits before the request reaches the provider."
  },
  {
    icon: Users,
    title: 'Limited attribution across your application',
    description:
      'A spending spike tells you that something changed. The harder question is what caused it: which feature, team, or application component generated the spend? Ursulae lets your application tag requests with feature-level context, so costs can be attributed to the parts of your product that generated them.'
  },
  {
    icon: Ban,
    title: 'A bill tells you what happened. A control layer can stop what happens next.',
    description:
      'Once an API request has been processed, its cost has already been incurred. Ursulae adds a budget control layer directly in the request path, allowing you to define spending limits and block requests when those limits are reached.'
  }
];

export function ProblemSection() {
  return (
    <section className='py-20 sm:py-28'>
      <div className='mx-auto max-w-5xl px-6'>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
            The problem
          </p>
          <h2 className='mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
            Seeing your AI spend isn&apos;t the same as controlling it.
          </h2>
          <p className='mt-4 text-base text-pretty text-muted-foreground'>
            OpenAI and Anthropic bill you at the end of the month for whatever your product called
            during it. By then, the spend is already gone, and there&apos;s no record of what
            actually drove it.
          </p>
        </div>

        <div className='mt-14 grid gap-6 sm:grid-cols-3'>
          {problems.map(({ icon: Icon, title, description }) => (
            <Card key={title} className='border-0 bg-muted/40 ring-0'>
              <CardContent className='flex flex-col gap-3'>
                <div className='flex size-9 items-center justify-center rounded-lg bg-background ring-1 ring-border'>
                  <Icon className='size-4 text-foreground' />
                </div>
                <CardTitle className='text-base font-semibold'>{title}</CardTitle>
                <CardDescription className='text-sm text-pretty'>{description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className='mt-14 text-center text-base font-medium text-balance'>
          Ursulae closes the gap between AI usage and financial control, one request at a time.
        </p>

        <div className='mx-auto mt-6 flex max-w-md flex-col items-center gap-1 text-center'>
          <p className='text-sm text-muted-foreground'>
            Provider dashboards show you what you spent.
          </p>
          <p className='text-sm font-medium text-foreground'>
            Ursulae helps you control what happens next.
          </p>
        </div>
      </div>
    </section>
  );
}
