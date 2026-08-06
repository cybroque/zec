import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFormMapSection from "@/components/ContactFormMapSection";
import ContactDirectorySection from "@/components/ContactDirectorySection";
import ContactInstagramSection from "@/components/ContactInstagramSection";
export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#FFF8E5]">
      <Header theme="light" />
      <div className="pt-36">
        <ContactFormMapSection />
        <ContactDirectorySection />
        <ContactInstagramSection bgColor="#FFF8E5" />
      </div>
      <Footer />
    </main>
  );
}
