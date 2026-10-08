import { client } from "./client";
import { isSanityConfigured } from "../env";
import {
  PROGRAMS_QUERY,
  PROGRAM_BY_SLUG_QUERY,
  BEYOND_SERVICES_QUERY,
  BEYOND_SERVICE_BY_SLUG_QUERY,
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
  RIDER_STORIES_QUERY,
  INSTRUCTORS_QUERY,
  HORSES_QUERY,
  TEAM_MEMBERS_QUERY,
} from "./queries";
import { programsSeoList, getProgramBySlug, ProgramSeoItem } from "@/data/programsSeoData";
import { beyondServicesSeoList, getBeyondServiceBySlug, BeyondServiceSeoItem } from "@/data/beyondSeoData";
import { blogPosts, getBlogPostBySlug, BlogPost } from "@/data/blogData";

export interface SiteSettings {
  siteName: string;
  tagline: string;
  phoneNumber: string;
  email: string;
  address: string;
  googleMapsUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  footerHeading: string;
  footerSubheading: string;
  footerCtaText: string;
}

export const defaultSiteSettings: SiteSettings = {
  siteName: "Zippy Equestrian Center",
  tagline: "Real Riding. Real Feeling.",
  phoneNumber: "+91 98453 64281",
  email: "ride@zippyec.com",
  address:
    "Survey No. 46/1 & 46/2, Chikkanayakanahalli, Off Sarjapur Road, Near Carmelaram Railway Station, Bengaluru, Karnataka 560035",
  googleMapsUrl: "https://maps.google.com/?q=Zippy+Equestrian+Center",
  instagramUrl: "https://www.instagram.com/zippyequestrian",
  footerHeading: "The rider in you is just a ride away.",
  footerSubheading: "Your first ride is 30 minutes away. Call us and let's get you started.",
  footerCtaText: "Book your trial ride",
};

/**
 * Safely fetches Sanity data with an automatic fallback if Sanity is not configured or fails
 */
export async function sanityFetch<T>({
  query,
  params = {},
  fallback,
}: {
  query: string;
  params?: Record<string, any>;
  fallback: T;
}): Promise<T> {
  if (!isSanityConfigured) {
    return fallback;
  }

  try {
    const isDev = process.env.NODE_ENV === "development";
    const data = await client.fetch<T>(query, params, {
      next: { revalidate: isDev ? 0 : 60 },
    });
    if (data === null || data === undefined) {
      return fallback;
    }
    if (Array.isArray(data) && data.length === 0) {
      return fallback;
    }
    return data;
  } catch (error) {
    console.warn("Sanity fetch error (using fallback data):", error);
    return fallback;
  }
}

/**
 * Fetches Global Site Settings
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  return sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    fallback: defaultSiteSettings,
  });
}

/**
 * Fetches all Programs (with fallback and seamless merging)
 */
export async function getPrograms(): Promise<ProgramSeoItem[]> {
  const data = await sanityFetch<any[]>({
    query: PROGRAMS_QUERY,
    fallback: programsSeoList,
  });

  if (!Array.isArray(data) || data.length === 0) {
    return programsSeoList;
  }

  // Merge each fallback program with any matching program from Sanity
  const merged = programsSeoList.map((fallbackItem) => {
    const cmsMatch = data.find((cms) => {
      const cmsSlug = (cms.slug || "").toLowerCase().trim();
      const fbSlug = fallbackItem.slug.toLowerCase().trim();
      const cmsClean = cmsSlug.replace(/-program$|-ride$/, "");
      const fbClean = fbSlug.replace(/-program$|-ride$/, "");

      return (
        cmsSlug === fbSlug ||
        fallbackItem.aliases?.includes(cmsSlug) ||
        (cmsClean.length > 0 && cmsClean === fbClean)
      );
    });

    if (!cmsMatch) return fallbackItem;

    return {
      ...fallbackItem,
      ...cmsMatch,
      title: cmsMatch.title || fallbackItem.title,
      category: cmsMatch.category || fallbackItem.category,
      shortDescription: cmsMatch.shortDescription || fallbackItem.paragraphs?.[0] || "",
      bannerImage: cmsMatch.bannerImage || fallbackItem.bannerImage,
      curriculumList:
        cmsMatch.curriculumList && cmsMatch.curriculumList.length > 0
          ? cmsMatch.curriculumList
          : fallbackItem.curriculumList,
      experiences:
        cmsMatch.experiences && cmsMatch.experiences.length > 0
          ? cmsMatch.experiences
          : fallbackItem.experiences,
      duration: cmsMatch.duration || "1 session - 45 minutes",
      sessions: cmsMatch.sessions !== undefined ? cmsMatch.sessions : null,
      ctaText: cmsMatch.ctaText || fallbackItem.ctaText,
      ctaHref:
        fallbackItem.ctaHref ||
        `/contact?interest=Riding%20Programs&message=${encodeURIComponent(
          cmsMatch.title || fallbackItem.title
        )}`,
    } as ProgramSeoItem;
  });

  // Also include any new programs created in Sanity that aren't in the default 7
  const extraCmsPrograms = data
    .filter((cms) => {
      const cmsSlug = (cms.slug || "").toLowerCase().trim();
      return !programsSeoList.some((item) => {
        const fbSlug = item.slug.toLowerCase().trim();
        const cmsClean = cmsSlug.replace(/-program$|-ride$/, "");
        const fbClean = fbSlug.replace(/-program$|-ride$/, "");
        return (
          fbSlug === cmsSlug ||
          item.aliases?.includes(cmsSlug) ||
          (cmsClean.length > 0 && cmsClean === fbClean)
        );
      });
    })
    .map(
      (cms) =>
        ({
          slug: cms.slug,
          aliases: [],
          category: cms.category || "PROGRAM",
          title: cms.title,
          shortDescription: cms.shortDescription || "",
          bannerImage: cms.bannerImage || "/assets/images/Programs/Webp/r1.webp",
          bannerImageAlt: cms.title,
          paragraphs: cms.paragraphs || [],
          curriculumList: cms.curriculumList || [],
          experiences: cms.experiences || [],
          duration: cms.duration || "1 session - 45 minutes",
          sessions: cms.sessions ?? null,
          ctaText: cms.ctaText || "Enroll now",
          ctaHref: `/contact?interest=Riding%20Programs&message=${encodeURIComponent(
            cms.title
          )}`,
          metaTitle: cms.metaTitle || cms.title,
          metaDescription: cms.metaDescription || "",
          keywords: [],
        }) as ProgramSeoItem
    );

  return [...merged, ...extraCmsPrograms];
}

/**
 * Fetches a Program by slug (with fallback)
 */
export async function fetchProgramBySlug(slug: string): Promise<ProgramSeoItem | undefined> {
  const fallback = getProgramBySlug(slug);
  if (!isSanityConfigured) return fallback;

  try {
    const isDev = process.env.NODE_ENV === "development";
    const cmsProgram = await client.fetch(
      PROGRAM_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: isDev ? 0 : 60 } }
    );
    if (cmsProgram && cmsProgram.title) {
      return {
        ...fallback,
        ...cmsProgram,
        bannerImage: cmsProgram.bannerImage || fallback?.bannerImage || "/assets/images/programs/banner.webp",
        ctaHref: fallback?.ctaHref || `/contact?program=${cmsProgram.slug || slug}`,
        paragraphs: (cmsProgram.paragraphs && cmsProgram.paragraphs.length > 0) ? cmsProgram.paragraphs : fallback?.paragraphs || [],
        curriculumList: (cmsProgram.curriculumList && cmsProgram.curriculumList.length > 0) ? cmsProgram.curriculumList : fallback?.curriculumList || [],
        experiences: (cmsProgram.experiences && cmsProgram.experiences.length > 0) ? cmsProgram.experiences : fallback?.experiences || [],
      } as ProgramSeoItem;
    }
  } catch (err) {
    // ignore, fall back
  }
  return fallback;
}

/**
 * Fetches all Beyond the Ride services (with fallback and seamless merging)
 */
export async function getBeyondServices(): Promise<BeyondServiceSeoItem[]> {
  const data = await sanityFetch<any[]>({
    query: BEYOND_SERVICES_QUERY,
    fallback: beyondServicesSeoList,
  });

  if (!Array.isArray(data) || data.length === 0) {
    return beyondServicesSeoList;
  }

  // Merge each fallback item with any matching CMS item
  const merged = beyondServicesSeoList.map((fallbackItem) => {
    const cmsMatch = data.find((cms) => {
      const cmsSlug = (cms.slug || "").toLowerCase().trim();
      const fbSlug = fallbackItem.slug.toLowerCase().trim();
      return (
        cmsSlug === fbSlug ||
        fallbackItem.aliases?.includes(cmsSlug) ||
        cmsSlug.replace(/-service$/, "") === fbSlug.replace(/-service$/, "")
      );
    });

    if (!cmsMatch) return fallbackItem;

    return {
      ...fallbackItem,
      ...cmsMatch,
      title: cmsMatch.title || fallbackItem.title,
      heroDescription: cmsMatch.heroDescription || fallbackItem.heroDescription,
      ctaText: cmsMatch.ctaText || fallbackItem.ctaText,
      ctaHref:
        fallbackItem.ctaHref ||
        `/contact?interest=${encodeURIComponent(
          cmsMatch.contactInterest || fallbackItem.title
        )}`,
      image: cmsMatch.image || fallbackItem.image,
      contentParagraphs:
        cmsMatch.contentParagraphs && cmsMatch.contentParagraphs.length > 0
          ? cmsMatch.contentParagraphs
          : fallbackItem.contentParagraphs,
      highlightText: cmsMatch.highlightText || fallbackItem.highlightText,
    } as BeyondServiceSeoItem;
  });

  // Also include any newly created services in Sanity that aren't in the default list
  const extraCmsServices = data
    .filter((cms) => {
      const cmsSlug = (cms.slug || "").toLowerCase().trim();
      return !beyondServicesSeoList.some((item) => {
        const fbSlug = item.slug.toLowerCase().trim();
        return (
          fbSlug === cmsSlug ||
          item.aliases?.includes(cmsSlug) ||
          cmsSlug.replace(/-service$/, "") === fbSlug.replace(/-service$/, "")
        );
      });
    })
    .map(
      (cms) =>
        ({
          slug: cms.slug,
          aliases: [],
          title: cms.title,
          heroDescription: cms.heroDescription || "",
          ctaText: cms.ctaText || "Book your slot",
          ctaHref: `/contact?interest=${encodeURIComponent(
            cms.contactInterest || cms.title
          )}`,
          image: cms.image || "/assets/images/BeyondRide/Webp/summer-camp.webp",
          imageAlt: cms.title,
          contentParagraphs: cms.contentParagraphs || [],
          highlightText: cms.highlightText || "",
          metaTitle: cms.metaTitle || cms.title,
          metaDescription: cms.metaDescription || "",
          keywords: [],
        }) as BeyondServiceSeoItem
    );

  return [...merged, ...extraCmsServices];
}

/**
 * Fetches a Beyond the Ride service by slug (with fallback)
 */
export async function fetchBeyondServiceBySlug(slug: string): Promise<BeyondServiceSeoItem | undefined> {
  const fallback = getBeyondServiceBySlug(slug);
  if (!isSanityConfigured) return fallback;

  try {
    const isDev = process.env.NODE_ENV === "development";
    const cmsService = await client.fetch(
      BEYOND_SERVICE_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: isDev ? 0 : 60 } }
    );
    if (cmsService && cmsService.title) {
      return {
        ...fallback,
        ...cmsService,
        ctaHref: fallback?.ctaHref || `/contact?interest=${cmsService.contactInterest || cmsService.slug || slug}`,
        image: cmsService.image || fallback?.image || "/assets/images/beyond/summer-camp.webp",
        contentParagraphs: (cmsService.contentParagraphs && cmsService.contentParagraphs.length > 0) ? cmsService.contentParagraphs : fallback?.contentParagraphs || [],
        keywords: fallback?.keywords || [],
      } as BeyondServiceSeoItem;
    }
  } catch (err) {
    // ignore, fall back
  }
  return fallback;
}

/**
 * Fetches all Blog Posts (with fallback)
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await sanityFetch<BlogPost[]>({
    query: BLOG_POSTS_QUERY,
    fallback: blogPosts,
  });
  return data.map((item) => {
    const fallback = getBlogPostBySlug(item.slug);
    return {
      ...fallback,
      ...item,
      bannerImage: item.bannerImage || fallback?.bannerImage || "",
    } as BlogPost;
  });
}

/**
 * Fetches a Blog Post by slug (with fallback)
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const fallback = getBlogPostBySlug(slug);
  if (!isSanityConfigured) return fallback;

  try {
    const cmsPost = await client.fetch(BLOG_POST_BY_SLUG_QUERY, { slug }, { next: { revalidate: 60 } });
    if (cmsPost && cmsPost.title) {
      return {
        ...fallback,
        ...cmsPost,
        bannerImage: cmsPost.bannerImage || fallback?.bannerImage || "/assets/images/blog/blog1.webp",
        quoteOverlay: cmsPost.quoteOverlay || fallback?.quoteOverlay,
        contentSections: (cmsPost.contentSections && cmsPost.contentSections.length > 0) ? cmsPost.contentSections : fallback?.contentSections || [],
      } as BlogPost;
    }
  } catch (err) {
    // ignore, fall back
  }
  return fallback;
}

/**
 * Fetches Rider Stories
 */
export async function getRiderStories(fallback: any[]): Promise<any[]> {
  return sanityFetch<any[]>({
    query: RIDER_STORIES_QUERY,
    fallback,
  });
}

/**
 * Fetches Instructors
 */
export async function getInstructors(fallback: any[]): Promise<any[]> {
  return sanityFetch<any[]>({
    query: INSTRUCTORS_QUERY,
    fallback,
  });
}

/**
 * Fetches Horses (Herd)
 */
export async function getHorses(fallback: any[]): Promise<any[]> {
  return sanityFetch<any[]>({
    query: HORSES_QUERY,
    fallback,
  });
}

/**
 * Fetches Team Members
 */
export async function getTeamMembers(fallback: any[]): Promise<any[]> {
  return sanityFetch<any[]>({
    query: TEAM_MEMBERS_QUERY,
    fallback,
  });
}
