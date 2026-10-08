import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBlogPosts } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Equestrian Journal & Horse Riding Guides | Zippy Equestrian Center",
  description:
    "Explore in-depth articles, beginner guides, and horsemanship insights from the trainers at Zippy Equestrian Center in Bangalore.",
  alternates: {
    canonical: "https://zippyec.com/blog",
  },
  openGraph: {
    title: "Equestrian Journal & Horse Riding Guides | Zippy Equestrian Center",
    description:
      "Explore in-depth articles, beginner guides, and horsemanship insights from the trainers at Zippy Equestrian Center in Bangalore.",
    url: "https://zippyec.com/blog",
    siteName: "Zippy Equestrian Center",
    locale: "en_IN",
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const posts = await getBlogPosts();
  const [featuredPost, ...otherPosts] = posts;

  return (
    <main className="relative min-h-screen bg-white">
      {/* Global Fixed Header */}
      <Header theme="dark" bodyTheme="light" />

      {/* Hero Header in Terracotta */}
      <section id="page-hero-section" className="w-full bg-[#DA7347] text-white pt-28 pb-16 md:pt-36 md:pb-20 px-6 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto text-center md:text-left">
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-white/80 block mb-2">
            STORIES &amp; HORSEMANSHIP INSIGHTS
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white font-heading">
            The Equestrian Journal
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/90 font-light max-w-2xl leading-relaxed">
            Expert riding guides, stable insights, and real horsemanship stories from our coaching
            team in South Bangalore.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full bg-[#FFFBF7] py-16 md:py-24 px-6 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto flex flex-col gap-16">
          {/* Featured Article Card */}
          {featuredPost && (
            <div className="bg-white rounded-2xl overflow-hidden border border-[#DA7347]/15 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Image */}
                <div className="lg:col-span-7 relative h-[300px] sm:h-[380px] lg:h-auto min-h-[320px]">
                  <Image
                    src={featuredPost.bannerImage}
                    alt={featuredPost.bannerImageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute top-4 left-4 bg-[#DA7347] text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                    FEATURED STORY
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#85431E] font-medium mb-3">
                      <span>{featuredPost.category}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-medium text-[#242A59] tracking-tight mb-4 font-heading leading-snug">
                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="hover:text-[#DA7347] transition-colors"
                      >
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-sm md:text-base text-[#5C381E]/80 font-light leading-relaxed mb-6">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div>
                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="bg-[#DA7347] text-white px-6 py-3 rounded-md font-medium text-sm inline-flex items-center gap-2.5 hover:bg-[#C5653C] transition-all shadow-sm group"
                    >
                      <span>Read Article</span>
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
            </div>
          )}

          {/* Grid of Other Articles */}
          {otherPosts.length > 0 && (
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-[#242A59] tracking-tight mb-8 font-heading">
                More Articles &amp; Insights
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white rounded-xl overflow-hidden border border-[#DA7347]/15 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
                  >
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        src={post.bannerImage}
                        alt={post.bannerImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#85431E] font-medium mb-2.5">
                          <span>{post.category}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>

                        <h4 className="text-xl font-medium text-[#242A59] tracking-tight mb-3 font-heading leading-snug">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="hover:text-[#DA7347] transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h4>

                        <p className="text-sm text-[#5C381E]/80 font-light leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[#DA7347] font-medium text-sm inline-flex items-center gap-2 hover:text-[#85431E] transition-colors mt-auto"
                      >
                        <span>Read full article</span>
                        <svg
                          width="16"
                          height="16"
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
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gentle transition gradient to terracotta footer */}
      <div className="w-full h-32 md:h-44 bg-gradient-to-b from-[#FFFBF7] via-[#F5E6DC] to-[#DA7347]" />

      {/* Terracotta Footer */}
      <Footer forceTerracotta={true} />
    </main>
  );
}
