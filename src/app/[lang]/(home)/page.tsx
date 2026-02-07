import Hero from "./components/hero";
import TurkeySection from "./components/turkey";
import UaeSection from "./components/uae";
import InvestorClub from "./components/investor-club";
import GuidesSection from "./components/guides";
import LeadForm from "./components/lead-form";
import Footer from "./components/footer";; // Import here instead

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main className="bg-white">
      <Hero lang={lang} />
      <TurkeySection lang={lang} />
      <UaeSection lang={lang} />
      <InvestorClub lang={lang} />
      <GuidesSection lang={lang} />
      <LeadForm lang={lang} />
      
      {/* Footer is now part of the home page flow */}
      <Footer lang={lang} />
    </main>
  );
}