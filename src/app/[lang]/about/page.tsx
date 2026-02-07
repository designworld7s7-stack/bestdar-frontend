import React from 'react';
import AboutHero from './components/about-hero';
import OurStory from './components/our-story';
import OurMission from './components/our-mission';
import WhyUs from './components/why-us';
import ClientCentric from './components/client-centric';
import HowWeWork from './components/how-we-work';
import MeetTheTeam from './components/meet-the-team';
import OurPartners from './components/our-partners';
import AboutCTA from './components/about-cta';
import BackButton from '@/components/shared/back-button';

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main className="bg-white min-h-screen">
      {/* Desktop-Only Navigation */}
      <div className="hidden lg:block pt-8 px-12">
        <BackButton lang={lang} />
      </div>

      {/* 1. Hero: Split screen boardroom aesthetic */}
      <AboutHero lang={lang} />

      {/* 2. Our Story: Grayscale architectural narrative */}
      <OurStory lang={lang} />

      {/* 3. Our Mission: Minimalist 3-column principles */}
      <OurMission lang={lang} />

      {/* 4. Why Us: Dark "Vault" grid for advantages */}
      <WhyUs lang={lang} />

      {/* 5. Client Centric: Handshake visual and bold promises */}
      <ClientCentric lang={lang} />

      {/* 6. How We Work: Step-by-step process cards */}
      <HowWeWork lang={lang} />

      {/* 7. Meet The Team: Professional advisor profiles */}
      <MeetTheTeam lang={lang} />

      {/* 8. Our Partners: Grayscale developer marquee */}
      <OurPartners lang={lang} />

      {/* 9. Final CTA: Consultation & WhatsApp trigger */}
      <AboutCTA lang={lang} />
    </main>
  );
}