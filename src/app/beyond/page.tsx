import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BeyondHero from "@/components/BeyondHero";
import BeyondServicesSection from "@/components/BeyondServicesSection";
import BeyondContactSection from "@/components/BeyondContactSection";

export default function BeyondPage() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <BeyondHero />
      <BeyondServicesSection />
      <BeyondContactSection />
      <Footer />
    </main>
  );
}
