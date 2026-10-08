import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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

  const themeColor = getBeyondServiceColor(service.slug || slug);

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
      <Header theme="dark" disableThemeChangeOnScroll={true} />

      {/* Split Hero Section - Left Image, Right Card Color Box */}
      <section className="relative w-full overflow-hidden">
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
                href={service.ctaHref}
                className="bg-white px-6 py-3.5 rounded-md font-medium text-sm inline-flex items-center gap-3 hover:bg-[#FFFBF7] transition-all shadow-sm group"
                style={{ color: themeColor }}
              >
                <span>{service.ctaText}</span>
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
      </section>

      {/* Gentle transition gradient to the terracotta footer */}
      <div className="w-full h-32 md:h-44 bg-gradient-to-b from-white via-[#F5E6DC] to-[#DA7347]" />

      {/* Standard Footer in Terracotta */}
      <Footer forceTerracotta={true} />
    </main>
  );
}
