import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFormMapSection from "@/components/ContactFormMapSection";
import ContactDirectorySection from "@/components/ContactDirectorySection";
import StoriesInstagramSection from "@/components/StoriesInstagramSection";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#F5F1E8]">
      <Header />
      <div className="pt-24">
        <ContactFormMapSection />
        <ContactDirectorySection />
        <StoriesInstagramSection />
      </div>
      <Footer />
    </main>
  );
}
