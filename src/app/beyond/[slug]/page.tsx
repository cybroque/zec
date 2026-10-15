import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FranchiseEnquiryForm from "@/components/FranchiseEnquiryForm";
import { beyondServicesSeoList } from "@/data/beyondSeoData";
import { fetchBeyondServiceBySlug } from "@/sanity/lib/fetch";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return beyondServicesSeoList.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await fetchBeyondServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Zippy Equestrian Center",
      description: "Explore equestrian services at Zippy Equestrian Center in Bangalore.",
    };
  }

  const canonicalUrl = `https://zippyec.com/beyond/${service.slug}`;

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: canonicalUrl,
      siteName: "Zippy Equestrian Center",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [service.image],
    },
  };
}

const BEYOND_SERVICE_COLORS: Record<string, string> = {
  "summer-camps": "#DA7347",
  "horse-training": "#526FAE",
  "buy-a-horse": "#85431E",
  "parties-and-venues": "#AE5834",
  "equestrian-consultation": "#1C2245",
  "horse-rent-lease": "#85431E",
  "photoshoots": "#526FAE",
  "franchise": "#DA7347",
  "horse-boarding": "#1C2245",
};

function getBeyondServiceColor(slug: string): string {
  const clean = slug.toLowerCase().trim();
  return BEYOND_SERVICE_COLORS[clean] || "#DA7347";
}

export const revalidate = 0;

export default async function BeyondDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await fetchBeyondServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const isFranchise = (service.slug || slug).toLowerCase().trim() === "franchise";
  const themeColor = getBeyondServiceColor(service.slug || slug);
  const heroCtaHref = isFranchise ? "#enquire-details" : service.ctaHref;
  const heroCtaText = isFranchise ? "Enquire Now" : service.ctaText;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.heroDescription,
    provider: {
      "@type": "SportsActivityLocation",
      name: "Zippy Equestrian Center",
      url: "https://zippyec.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": "City",
      name: "Bangalore",
    },
    image: `https://zippyec.com${service.image}`,
  };

  return (
    <main className="relative min-h-screen bg-white">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global Fixed Header */}
      <Header theme="dark" bodyTheme="light" />

      {/* Split Hero Section - Left Image, Right Card Color Box */}
      <section id="page-hero-section" className="relative w-full overflow-hidden">
        <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[560px] lg:min-h-[640px]">
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative w-full h-[360px] md:h-[480px] lg:h-auto min-h-[380px]">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right Column: Card-Colored Box */}
          <div
            className="lg:col-span-7 text-white px-6 md:px-14 lg:px-20 pt-28 pb-16 md:pt-36 md:pb-20 lg:py-28 flex flex-col justify-center transition-colors duration-300"
            style={{ backgroundColor: themeColor }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight uppercase text-white font-heading">
              {service.title}
            </h1>

            <p className="mt-6 text-sm md:text-base leading-relaxed text-white/95 font-light max-w-xl">
              {service.heroDescription}
            </p>

            <div className="mt-8">
              <Link
                href={heroCtaHref}
                className="bg-white px-6 py-3.5 rounded-md font-medium text-sm inline-flex items-center gap-3 hover:bg-[#FFFBF7] transition-all shadow-sm group"
                style={{ color: themeColor }}
              >
                <span>{heroCtaText}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section (White Background) */}
      <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12 lg:px-16">
        {isFranchise ? (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Franchise Overview & Operational Advantages */}
            <div className="lg:col-span-7 flex flex-col gap-8 text-left">
              <div>
                <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-[#DA7347] block mb-3">
                  FRANCHISE OPPORTUNITIES • EXPAND WITH ZIPPY
                </span>
                <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-[#85431E] font-heading leading-tight">
                  Bring World-Class Horsemanship to Your City
                </h2>
              </div>

              <div className="space-y-5">
                {service.contentParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-[#5C381E]/90 text-base md:text-lg font-light leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Franchise Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div className="bg-[#FFF8E5] p-5 rounded-xl border border-[#85431E]/10">
                  <div className="w-9 h-9 rounded-lg bg-[#DA7347]/15 text-[#DA7347] flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-[#85431E] mb-1.5 uppercase tracking-wide">
                    Turnkey Stables &amp; Arenas
                  </h3>
                  <p className="text-xs text-[#5C381E]/80 font-light leading-relaxed">
                    European-standard stable architecture, arena footing engineering, and paddock optimization for your land parcel.
                  </p>
                </div>

                <div className="bg-[#FFF8E5] p-5 rounded-xl border border-[#85431E]/10">
                  <div className="w-9 h-9 rounded-lg bg-[#DA7347]/15 text-[#DA7347] flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-[#85431E] mb-1.5 uppercase tracking-wide">
                    Equine Sourcing &amp; Care
                  </h3>
                  <p className="text-xs text-[#5C381E]/80 font-light leading-relaxed">
                    Vetted procurement of safe school and competition horses, ongoing veterinary support, and nutrition regimens.
                  </p>
                </div>

                <div className="bg-[#FFF8E5] p-5 rounded-xl border border-[#85431E]/10">
                  <div className="w-9 h-9 rounded-lg bg-[#DA7347]/15 text-[#DA7347] flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-[#85431E] mb-1.5 uppercase tracking-wide">
                    Standardized Curriculum
                  </h3>
                  <p className="text-xs text-[#5C381E]/80 font-light leading-relaxed">
                    Structured 6-tier riding syllabus, certified trainer recruitment, and junior-to-competitive equestrian pipelines.
                  </p>
                </div>

                <div className="bg-[#FFF8E5] p-5 rounded-xl border border-[#85431E]/10">
                  <div className="w-9 h-9 rounded-lg bg-[#DA7347]/15 text-[#DA7347] flex items-center justify-center mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-[#85431E] mb-1.5 uppercase tracking-wide">
                    Digital Software &amp; Brand
                  </h3>
                  <p className="text-xs text-[#5C381E]/80 font-light leading-relaxed">
                    Online session booking, customer billing, national brand marketing campaigns, and proven unit profitability.
                  </p>
                </div>
              </div>

              {service.highlightText && (
                <div className="p-6 rounded-xl border border-[#DA7347]/30 bg-[#FFF8E5] text-left">
                  <p className="text-base md:text-lg font-medium text-[#85431E] leading-snug">
                    “{service.highlightText}”
                  </p>
                </div>
              )}
            </div>

            {/* Right Column: “Enquire Details” Form */}
            <div className="lg:col-span-5 w-full">
              <FranchiseEnquiryForm />
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto flex flex-col gap-6 text-left">
            {service.contentParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[#5C381E]/90 text-base md:text-lg font-light leading-relaxed"
              >
                {paragraph}
              </p>
            ))}

            {service.highlightText && (
              <h2
                className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight mt-6"
                style={{ color: themeColor }}
              >
                {service.highlightText}
              </h2>
            )}
          </div>
        )}
      </section>

      {/* Gentle transition gradient to the terracotta footer */}
      <div className="w-full h-32 md:h-44 bg-gradient-to-b from-white via-[#F5E6DC] to-[#DA7347]" />

      {/* Standard Footer in Terracotta */}
      <Footer forceTerracotta={true} />
    </main>
  );
}
