import Header from "@/components/Header";
import AboutHero from "@/components/AboutHero";
import AboutStorySection from "@/components/AboutStorySection";
import AboutTeamSection from "@/components/AboutTeamSection";
import AboutInstructorsSection from "@/components/AboutInstructorsSection";
import AboutHerdSection from "@/components/AboutHerdSection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-zippy-dark-blue">
      <Header />
      <AboutHero />
      <AboutStorySection />
      <AboutTeamSection />
      <AboutInstructorsSection />
      <AboutHerdSection />
      <Footer />
    </main>
  );
}
