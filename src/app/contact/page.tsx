import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactFormMapSection from "@/components/ContactFormMapSection";
import ContactDirectorySection from "@/components/ContactDirectorySection";
import StoriesInstagramSection from "@/components/StoriesInstagramSection";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#FFFBF2]">
      <Header theme="light" />
      <div className="pt-36">
        <ContactFormMapSection />
        <ContactDirectorySection />
        <StoriesInstagramSection bgColor="#FFFBF2" />
      </div>
      <Footer />
    </main>
  );
}
