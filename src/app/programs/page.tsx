import Header from "@/components/Header";
import ProgramsHero from "@/components/ProgramsHero";
import ProgramsJourney from "@/components/ProgramsJourney";
import ProgramsCardsSection from "@/components/ProgramsCardsSection";
import Footer from "@/components/Footer";
import { getPrograms } from "@/sanity/lib/fetch";

export default async function ProgramsPage() {
  const dynamicPrograms = await getPrograms();

  return (
    <main className="relative min-h-screen bg-zippy-dark-blue">
      <Header />
      <ProgramsHero />
      <ProgramsJourney />
      <ProgramsCardsSection initialCards={dynamicPrograms} />
      <Footer />
    </main>
  );
}
