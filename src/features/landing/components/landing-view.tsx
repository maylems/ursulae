import { SiteHeader } from './site-header';
import { HeroSection } from './hero-section';
import { ProblemSection } from './problem-section';
import { FeaturesSection } from './features-section';
import { IntegrationSection } from './integration-section';
import { HowItWorksSection } from './how-it-works-section';
import { FinalCtaSection } from './final-cta-section';
import { SiteFooter } from './site-footer';

export function LandingView() {
  return (
    <div className='min-h-svh bg-background'>
      <SiteHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <FeaturesSection />
        <IntegrationSection />
        <HowItWorksSection />
        <FinalCtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
