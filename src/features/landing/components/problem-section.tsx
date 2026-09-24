import { Ban, EyeOff, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';

const problems = [
  {
    icon: EyeOff,
    title: 'No visibility until the invoice',
    description:
      'API calls happen inside your code, not in a dashboard. The first real signal that something changed is the bill, weeks after the spend already happened.'
  },
  {
    icon: Users,
    title: 'No attribution',
    description:
      'A spike is easy to see and impossible to explain. Which feature caused it? Which team shipped it? Which customer triggered it?'
  },
  {
    icon: Ban,
    title: 'No way to stop it',
    description:
      "By the time a spike shows up on the invoice, the money's spent. There's no lever to pull mid-month, only a number to negotiate after the fact."
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
            You can&apos;t control what you can&apos;t see.
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
          Ursulae closes that gap, one request at a time.
        </p>
      </div>
    </section>
  );
}
