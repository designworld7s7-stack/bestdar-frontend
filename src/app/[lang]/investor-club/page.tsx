import ClubHeader from "./components/club-header";
import ClubPrinciples from "./components/club-principles";
import StrategySafety from "./components/strategy-safety";
import TierScene from "./components/tier-scene";
import TierMatrix from "./components/tier-matrix";
import JoinPath from "./components/join-path";
import ClubCTA from "./components/club-cta";

export default async function InvestorClubPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main className="min-h-screen">
      {/* 1. Black Section: The Entrance */}
      <ClubHeader lang={lang} />

      {/* 2. White Section: Why Us & Principles */}
      <ClubPrinciples lang={lang} />

      {/* 3. Black Section: Security & Approach */}
      <StrategySafety lang={lang} />

      {/* 4. White Section: The 3D Depth Tiers */}
      <TierScene lang={lang} />

      {/* 5. Black Section: Comparison Matrix */}
      <TierMatrix lang={lang} />

      {/* 6. White Section: The Joining Journey */}
      <JoinPath lang={lang} />

      {/* 7. Final White Section: The CTA */}
      <ClubCTA lang={lang} />
    </main>
  );
}