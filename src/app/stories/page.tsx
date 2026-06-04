import Header from "@/components/Header";
import StoriesHero from "@/components/StoriesHero";
import StoriesRidersSection from "@/components/StoriesRidersSection";
import StoriesInstagramSection from "@/components/StoriesInstagramSection";
import Footer from "@/components/Footer";

export default function StoriesPage() {
  return (
    <main className="relative min-h-screen bg-[#FFF8E5]">
      <Header />
      <StoriesHero />
      <StoriesRidersSection />
      <StoriesInstagramSection />
      <Footer />
    </main>
  );
}
