const steps = [
  {
    title: 'Create a proxy key',
    description:
      'Generate a key in Settings and point your existing OpenAI or Anthropic SDK at the proxy. Your own provider key stays with you.'
  },
  {
    title: 'Every request is metered',
    description:
      'Tokens, cost, latency, and status are recorded the instant a request completes, priced against current rate cards.'
  },
  {
    title: 'Set a budget',
    description:
      "Pick a daily or monthly limit. When it's reached, the next request is blocked before it reaches the provider."
  },
  {
    title: 'Watch it in the dashboard',
    description:
      'Cost by provider, spend by feature, and a full event log, reconciled against what OpenAI and Anthropic report on their own.'
  }
];

export function HowItWorksSection() {
  return (
    <section id='how-it-works' className='py-20 sm:py-28'>
      <div className='mx-auto max-w-5xl px-6'>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
            How it works
          </p>
          <h2 className='mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
            From your code to your budget, in four steps.
          </h2>
        </div>

        <div className='relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8'>
          <div aria-hidden className='absolute inset-x-0 top-5 hidden h-px bg-border lg:block' />
          {steps.map((step, index) => (
            <div key={step.title} className='relative flex flex-col gap-3'>
              <div className='relative z-10 flex size-10 items-center justify-center rounded-full bg-background text-sm font-semibold ring-1 ring-border'>
                {index + 1}
              </div>
              <h3 className='text-base font-semibold'>{step.title}</h3>
              <p className='text-sm text-pretty text-muted-foreground'>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
