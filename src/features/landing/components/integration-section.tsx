import { Check } from 'lucide-react';
import { anthropicProxySnippet, openaiProxySnippet } from '@/features/proxy/lib/snippets';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const points = [
  'Keep your existing SDK and your own OpenAI or Anthropic key',
  'We forward your key on every request, we never store it',
  'Tag requests with an optional feature label for attribution'
];

export function IntegrationSection() {
  return (
    <section id='integration' className='py-20 sm:py-28'>
      <div className='mx-auto max-w-5xl px-6'>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-xs font-semibold tracking-widest text-muted-foreground uppercase'>
            Integration
          </p>
          <h2 className='mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
            Swap the base URL. Keep everything else.
          </h2>
          <p className='mt-4 text-base text-pretty text-muted-foreground'>
            This is the exact snippet a connected account sees in Settings. No new SDK, no rewrite
            of your call sites, just a different base URL and a header.
          </p>
        </div>

        <div className='mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14'>
          <ul className='flex flex-col gap-4 lg:order-2'>
            {points.map((point) => (
              <li key={point} className='flex items-start gap-3'>
                <span className='mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-foreground text-background'>
                  <Check className='size-3' />
                </span>
                <span className='text-sm text-pretty text-muted-foreground'>{point}</span>
              </li>
            ))}
          </ul>

          <div className='overflow-hidden rounded-xl bg-muted/40 ring-1 ring-border lg:order-1'>
            <Tabs defaultValue='openai'>
              <div className='flex items-center justify-between border-b border-border/60 px-4 py-2'>
                <TabsList variant='line'>
                  <TabsTrigger value='openai'>OpenAI</TabsTrigger>
                  <TabsTrigger value='anthropic'>Anthropic</TabsTrigger>
                </TabsList>
                <div className='flex gap-1.5' aria-hidden>
                  <span className='size-2.5 rounded-full bg-muted-foreground/20' />
                  <span className='size-2.5 rounded-full bg-muted-foreground/20' />
                  <span className='size-2.5 rounded-full bg-muted-foreground/20' />
                </div>
              </div>
              <TabsContent value='openai'>
                <pre className='overflow-x-auto p-4 text-xs leading-relaxed'>
                  {openaiProxySnippet}
                </pre>
              </TabsContent>
              <TabsContent value='anthropic'>
                <pre className='overflow-x-auto p-4 text-xs leading-relaxed'>
                  {anthropicProxySnippet}
                </pre>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}
