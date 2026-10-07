import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ScrollCarousel from "@/components/ScrollCarousel";
import ActivitiesSection from "@/components/ActivitiesSection";
import ZippyFamilySection from "@/components/ZippyFamilySection";
import TestimonialSection from "@/components/TestimonialSection";
import StoriesInstagramSection from "@/components/StoriesInstagramSection";
import Footer from "@/components/Footer";

import { getRiderStories } from "@/sanity/lib/fetch";

export default async function Home() {
  const testimonials = await getRiderStories([]);

  return (
    <main className="relative min-h-screen">
      <Header />
      <Hero />
      <AboutSection />
      <ScrollCarousel />
      <TestimonialSection initialTestimonials={testimonials} />
      <ActivitiesSection />
      <ZippyFamilySection />
      <StoriesInstagramSection />
      <Footer />
    </main>
  );
}
