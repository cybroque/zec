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

interface ProgramTheme {
  bgColor: string;
  categoryColor?: string;
  isLight?: boolean;
  textColor: string;
  subtextColor: string;
  borderColor: string;
  buttonBg: string;
  buttonText: string;
  buttonHoverBg: string;
  footerBg: string;
}

const PROGRAM_THEMES: Record<string, ProgramTheme> = {
  discovery: {
    bgColor: "#D9734A",
    categoryColor: "#FFFFFF",
    textColor: "text-white",
    subtextColor: "text-white/90",
    borderColor: "border-white/20",
    buttonBg: "bg-white",
    buttonText: "text-[#D9734A]",
    buttonHoverBg: "hover:bg-[#FFFBF7]",
    footerBg: "#D9734A",
  },
  foundation: {
    bgColor: "#F2F9FF",
    categoryColor: "#4271B3",
    isLight: true,
    textColor: "text-[#242A59]",
    subtextColor: "text-[#242A59]/85",
    borderColor: "border-[#242A59]/20",
    buttonBg: "bg-[#242A59]",
    buttonText: "text-white",
    buttonHoverBg: "hover:bg-[#1C2245]",
    footerBg: "#242A59",
  },
  development: {
    bgColor: "#5A7BB5",
    categoryColor: "#FFFFFF",
    textColor: "text-white",
    subtextColor: "text-white/90",
    borderColor: "border-white/20",
    buttonBg: "bg-white",
    buttonText: "text-[#5A7BB5]",
    buttonHoverBg: "hover:bg-[#FFFBF7]",
    footerBg: "#5A7BB5",
  },
  performance: {
    bgColor: "#91572D",
    categoryColor: "#FFFFFF",
    textColor: "text-white",
    subtextColor: "text-white/90",
    borderColor: "border-white/20",
    buttonBg: "bg-white",
    buttonText: "text-[#91572D]",
    buttonHoverBg: "hover:bg-[#FFFBF7]",
    footerBg: "#91572D",
  },
  dressage: {
    bgColor: "#242A59",
    categoryColor: "#FFFFFF",
    textColor: "text-white",
    subtextColor: "text-white/90",
    borderColor: "border-white/20",
    buttonBg: "bg-white",
    buttonText: "text-[#242A59]",
    buttonHoverBg: "hover:bg-[#FFFBF7]",
    footerBg: "#242A59",
  },
  showjumping: {
    bgColor: "#242A59",
    categoryColor: "#FFFFFF",
    textColor: "text-white",
    subtextColor: "text-white/90",
    borderColor: "border-white/20",
    buttonBg: "bg-white",
    buttonText: "text-[#242A59]",
    buttonHoverBg: "hover:bg-[#FFFBF7]",
    footerBg: "#242A59",
  },
  practice: {
    bgColor: "#111111",
    categoryColor: "#FFFFFF",
    textColor: "text-white",
    subtextColor: "text-white/90",
    borderColor: "border-white/20",
    buttonBg: "bg-white",
    buttonText: "text-[#111111]",
    buttonHoverBg: "hover:bg-[#F2EBD9] hover:text-[#111111]",
    footerBg: "#111111",
  },
};

function getProgramTheme(slug: string, title?: string): ProgramTheme {
  const s = (slug || "").toLowerCase().trim();
  const t = (title || "").toLowerCase().trim();

  if (s.includes("foundation") || s.includes("beginner") || t.includes("foundation") || t.includes("beginner")) {
    return PROGRAM_THEMES.foundation;
  }
  if (s.includes("development") || s.includes("intermediate") || t.includes("development") || t.includes("intermediate")) {
    return PROGRAM_THEMES.development;
  }
  if (s.includes("performance") || s.includes("competitive") || t.includes("performance") || t.includes("competitive")) {
    return PROGRAM_THEMES.performance;
  }
  if (s.includes("dressage") || t.includes("dressage")) {
    return PROGRAM_THEMES.dressage;
  }
  if (s.includes("showjumping") || s.includes("jumping") || t.includes("showjumping") || t.includes("jumping")) {
    return PROGRAM_THEMES.showjumping;
  }
  if (s.includes("practice") || t.includes("practice")) {
    return PROGRAM_THEMES.practice;
  }
  if (s.includes("discovery") || s.includes("trial") || t.includes("discovery") || t.includes("trial")) {
    return PROGRAM_THEMES.discovery;
  }

  const clean = s.replace(/-program$|-ride$/, "");
  return PROGRAM_THEMES[clean] || PROGRAM_THEMES.discovery;
}

export const revalidate = 0;

export default async function ProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = await fetchProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  const theme = getProgramTheme(program.slug || slug, program.title);

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
    <main
      className="relative min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.bgColor }}
    >
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

      {/* Program Details Section styled with Card Theme */}
      <section
        className={`w-full py-14 md:py-20 px-6 md:px-12 lg:px-16 ${theme.textColor}`}
        style={{ backgroundColor: theme.bgColor }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Category Tag */}
          <span
            className="text-xs md:text-sm font-semibold tracking-widest uppercase block mb-2"
            style={{ color: theme.categoryColor || undefined }}
          >
            {program.category}
          </span>

          {/* Program Title */}
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 font-heading">
            {program.title}
          </h1>

          {/* Detailed Narrative Paragraphs */}
          <div className={`space-y-5 text-sm md:text-base font-light leading-relaxed mb-10 ${theme.subtextColor}`}>
            {program.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Bordered Curriculum / Safety Checklist Lines */}
          <div className={`border-t border-b divide-y ${theme.borderColor} my-10`}>
            {program.curriculumList.map((item, idx) => (
              <div key={idx} className={`py-3.5 text-sm md:text-base font-light ${theme.subtextColor}`}>
                {item}
              </div>
            ))}
          </div>

          {/* What You'll Experience Section */}
          <div className="mt-14">
            <h2 className={`text-xs md:text-sm uppercase tracking-widest font-semibold mb-8 ${theme.subtextColor}`}>
              WHAT YOU&apos;LL EXPERIENCE
            </h2>

            {/* Experience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
              {program.experiences.map((exp, idx) => (
                <div key={idx} className="flex flex-col">
                  <h3 className="text-xs md:text-sm font-bold tracking-wider uppercase mb-1.5">
                    {exp.title}
                  </h3>
                  <p className={`text-xs md:text-sm font-light leading-relaxed ${theme.subtextColor}`}>
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
              className={`${theme.buttonBg} ${theme.buttonText} ${theme.buttonHoverBg} px-8 py-3.5 rounded-md font-medium text-sm inline-flex items-center gap-3 transition-all shadow-md group`}
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

      {/* Standard Footer */}
      <Footer forceTerracotta={true} />
    </main>
  );
}
