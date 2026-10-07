import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeyondHero from "@/components/BeyondHero";
import BeyondServicesSection from "@/components/BeyondServicesSection";
import BeyondContactSection from "@/components/BeyondContactSection";
import { getBeyondServices } from "@/sanity/lib/fetch";

export default async function BeyondPage() {
  const dynamicServices = await getBeyondServices();

  return (
    <main className="relative min-h-screen">
      <Header />
      <BeyondHero />
      <BeyondServicesSection initialServices={dynamicServices} />
      <BeyondContactSection />
      <Footer />
    </main>
  );
}
