import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFormMapSection from "@/components/ContactFormMapSection";
import ContactDirectorySection from "@/components/ContactDirectorySection";
import ContactInstagramSection from "@/components/ContactInstagramSection";
export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#FFFBF2]">
      <Header theme="light" />
      <div className="pt-36">
        <ContactFormMapSection />
        <ContactDirectorySection />
        <ContactInstagramSection bgColor="#FFFBF2" />
      </div>
      <Footer />
    </main>
  );
}
