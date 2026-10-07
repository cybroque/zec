import Header from "@/components/Header";
import StoriesHero from "@/components/StoriesHero";
import StoriesRidersSection from "@/components/StoriesRidersSection";
import StoriesInstagramSection from "@/components/StoriesInstagramSection";
import Footer from "@/components/Footer";
import { getRiderStories } from "@/sanity/lib/fetch";

export default async function StoriesPage() {
  const dynamicRiders = await getRiderStories([]);

  return (
    <main className="relative min-h-screen bg-[#FFF8E5]">
      <Header />
      <StoriesHero />
      <StoriesRidersSection initialRiders={dynamicRiders.length > 0 ? dynamicRiders : undefined} />
      <StoriesInstagramSection />
      <Footer />
    </main>
  );
}
