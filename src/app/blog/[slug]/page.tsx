import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/blogData";
import { fetchBlogPostBySlug } from "@/sanity/lib/fetch";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Zippy Equestrian Center",
      description: "Read horse riding and equestrian articles at Zippy Equestrian Center.",
    };
  }

  const canonicalUrl = `https://zippyec.com/blog/${post.slug}`;

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: canonicalUrl,
      siteName: "Zippy Equestrian Center",
      locale: "en_IN",
      type: "article",
      images: [
        {
          url: post.bannerImage,
          width: 1200,
          height: 630,
          alt: post.bannerImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.bannerImage],
    },
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://zippyec.com${post.bannerImage}`,
    datePublished: "2026-10-01",
    author: {
      "@type": "Organization",
      name: "Zippy Equestrian Center",
      url: "https://zippyec.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Zippy Equestrian Center",
      logo: {
        "@type": "ImageObject",
        url: "https://zippyec.com/assets/images/zippylogo2.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://zippyec.com/blog/${post.slug}`,
    },
  };

  return (
    <main className="relative min-h-screen bg-white">
      {/* Schema.org BlogPosting Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Global Fixed Header */}
      <Header theme="dark" bodyTheme="light" />

      {/* Top Terracotta Header Section (Matching Image 3) */}
      <section className="w-full bg-[#DA7347] text-white pt-28 pb-12 md:pt-36 md:pb-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb / Category Tag */}
          <div className="flex items-center gap-3 text-white/80 text-xs md:text-sm tracking-wider uppercase font-medium mb-4">
            <Link href="/blog" className="hover:text-white transition-colors">
              Journal
            </Link>
            <span>•</span>
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white font-heading leading-[1.12]">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Large Banner Image with Quote Overlay (Matching Image 3) */}
      <section id="page-hero-section" className="relative w-full h-[320px] md:h-[480px] lg:h-[540px] overflow-hidden">
        <Image
          src={post.bannerImage}
          alt={post.bannerImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Ambient Darkened Overlay */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />

        {/* Center Quote Overlay with Horse Crest from Image 3 */}
        {post.quoteOverlay && (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-2xl px-6 py-4 rounded-xl backdrop-blur-[2px] bg-black/15">
              <p className="text-xl md:text-3xl lg:text-4xl text-white font-light tracking-wide italic font-optima-medium drop-shadow-md">
                &ldquo;{post.quoteOverlay.text}&rdquo;
              </p>

              <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0 opacity-90 drop-shadow">
                <Image
                  src="/assets/images/zippyfooter1.svg"
                  alt="Zippy Equestrian Crest"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Article Body Content (White Background matching Image 3) */}
      <article className="w-full bg-white py-14 md:py-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          {post.contentSections.map((section, sIdx) => (
            <div key={sIdx} className="flex flex-col gap-4">
              {section.heading && (
                <h2 className="text-2xl md:text-3xl font-medium text-[#242A59] tracking-tight mt-6 mb-2 font-heading">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  className="text-[#4A2810]/90 text-base md:text-lg font-light leading-relaxed md:leading-[1.8]"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}

          {/* Contact Details Card (Matching Image 3) */}
          {post.contactInfo && (
            <div className="mt-8 p-6 md:p-8 rounded-xl bg-[#FFFBF2] border border-[#DA7347]/20 flex flex-col gap-3">
              <h3 className="text-lg md:text-xl font-medium text-[#85431E]">
                {post.contactInfo.title}
              </h3>
              <div className="text-sm md:text-base text-[#5C381E]/90 font-light leading-relaxed space-y-1">
                {post.contactInfo.address.map((line, lIdx) => (
                  <p key={lIdx}>{line}</p>
                ))}
              </div>
              <p className="text-sm md:text-base text-[#5C381E] font-medium pt-2">
                Phone:{" "}
                <a
                  href={`tel:${post.contactInfo.phone.replace(/\s+/g, "")}`}
                  className="underline hover:text-[#DA7347]"
                >
                  {post.contactInfo.phone}
                </a>
              </p>
              <p className="text-sm md:text-base text-[#5C381E] font-medium">
                Website:{" "}
                <a
                  href={`https://${post.contactInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#DA7347]"
                >
                  {post.contactInfo.website}
                </a>
              </p>
            </div>
          )}

          {/* Action Button: "Find more stories ->" (Matching Image 3) */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 mt-6">
            <Link
              href="/stories"
              className="bg-[#DA7347] text-white px-8 py-3.5 rounded-md font-medium text-sm inline-flex items-center gap-3 hover:bg-[#C5653C] transition-all shadow-sm group w-full sm:w-fit justify-center"
            >
              <span>Find more stories</span>
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

            <Link
              href="/blog"
              className="text-[#DA7347] hover:text-[#85431E] font-medium text-sm transition-colors"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>
      </article>

      {/* Gentle gradient transition to terracotta footer */}
      <div className="w-full h-32 md:h-44 bg-gradient-to-b from-white via-[#F5E6DC] to-[#DA7347]" />

      {/* Footer in Terracotta */}
      <Footer forceTerracotta={true} />
    </main>
  );
}
