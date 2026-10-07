import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { programsSeoList } from "@/data/programsSeoData";
import { fetchProgramBySlug } from "@/sanity/lib/fetch";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return programsSeoList.map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = await fetchProgramBySlug(slug);

  if (!program) {
    return {
      title: "Program Not Found | Zippy Equestrian Center",
      description: "Explore equestrian riding programs at Zippy Equestrian Center in Bangalore.",
    };
  }

  const canonicalUrl = `https://zippyec.com/programs/${program.slug}`;

  return {
    title: program.metaTitle,
    description: program.metaDescription,
    keywords: program.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: program.metaTitle,
      description: program.metaDescription,
      url: canonicalUrl,
      siteName: "Zippy Equestrian Center",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: program.bannerImage,
          width: 1200,
          height: 630,
          alt: program.bannerImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: program.metaTitle,
      description: program.metaDescription,
      images: [program.bannerImage],
    },
  };
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await fetchProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.paragraphs[0],
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
    image: `https://zippyec.com${program.bannerImage}`,
  };

  return (
    <main className="relative min-h-screen bg-[#DA7347]">
      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global Fixed Header */}
      <Header theme="dark" disableThemeChangeOnScroll={true} />

      {/* Hero Banner Image */}
      <section className="relative w-full h-[340px] md:h-[480px] lg:h-[540px] overflow-hidden">
        <Image
          src={program.bannerImage}
          alt={program.bannerImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle top overlay to ensure header readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
      </section>

      {/* Terracotta Main Body Section */}
      <section className="w-full bg-[#DA7347] text-white py-14 md:py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Category Tag */}
          <span className="text-xs md:text-sm font-semibold tracking-widest text-white/90 uppercase block mb-2">
            {program.category}
          </span>

          {/* Program Title */}
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-8 font-heading">
            {program.title}
          </h1>

          {/* Detailed Narrative Paragraphs */}
          <div className="space-y-5 text-sm md:text-base text-white/95 font-light leading-relaxed mb-10">
            {program.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Bordered Curriculum / Safety Checklist Lines */}
          <div className="border-t border-b divide-y divide-white/20 border-white/20 my-10">
            {program.curriculumList.map((item, idx) => (
              <div key={idx} className="py-3.5 text-sm md:text-base font-light text-white/95">
                {item}
              </div>
            ))}
          </div>

          {/* What You'll Experience Section */}
          <div className="mt-14">
            <h2 className="text-xs md:text-sm uppercase tracking-widest font-semibold text-white/90 mb-8">
              WHAT YOU&apos;LL EXPERIENCE
            </h2>

            {/* Experience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
              {program.experiences.map((exp, idx) => (
                <div key={idx} className="flex flex-col">
                  <h3 className="text-xs md:text-sm font-bold tracking-wider uppercase text-white mb-1.5">
                    {exp.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/85 font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Enroll Now Button Aligned to the Right */}
          <div className="flex justify-end pt-4 pb-8">
            <Link
              href={program.ctaHref}
              className="bg-white text-[#DA7347] px-8 py-3.5 rounded-md font-medium text-sm inline-flex items-center gap-3 hover:bg-[#FFFBF7] transition-all shadow-md group"
            >
              <span>{program.ctaText}</span>
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
      </section>

      {/* Seamless Terracotta Footer matching Image 2 */}
      <Footer forceTerracotta={true} />
    </main>
  );
}
