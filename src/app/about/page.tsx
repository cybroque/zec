import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import AboutStorySection from "@/components/AboutStorySection";
import AboutTeamSection from "@/components/AboutTeamSection";
import AboutInstructorsSection from "@/components/AboutInstructorsSection";
import AboutHerdSection from "@/components/AboutHerdSection";
import Footer from "@/components/Footer";
import { getInstructors, getHorses, getTeamMembers } from "@/sanity/lib/fetch";

export default async function AboutPage() {
  const [instructors, horses, team] = await Promise.all([
    getInstructors([]),
    getHorses([]),
    getTeamMembers([]),
  ]);

  return (
    <main className="relative min-h-screen bg-zippy-dark-blue">
      <Header />
      <AboutHero />
      <AboutStorySection />
      <AboutTeamSection initialTeam={team} />
      <AboutInstructorsSection initialInstructors={instructors} />
      <AboutHerdSection initialHorses={horses} />
      <Footer />
    </main>
  );
}
