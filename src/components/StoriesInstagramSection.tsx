"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const INSTA_LINK = "https://www.instagram.com/zippy.equestrian?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

const socialLinks = [
  { 
    name: "Instagram", 
    href: INSTA_LINK,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
      </svg>
    )
  },
  { 
    name: "Facebook", 
    href: "https://www.facebook.com/zippyequestriancenter",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    )
  },
  { 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/company/zippy-horse-riding-academy/posts/?feedView=all",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    )
  },
  { 
    name: "Whatsapp", 
    href: "https://wa.me/919882988267",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    )
  },
];

interface StoriesInstagramSectionProps {
  bgColor?: string;
  hideFooter?: boolean;
}

export default function StoriesInstagramSection({ bgColor = "#FFF8E5", hideFooter = false }: StoriesInstagramSectionProps) {
  return (
    <section 
      className={`w-full ${bgColor === "#FFF8E5" ? "bg-[#FFF8E5]" : ""}`} 
      style={bgColor !== "#FFF8E5" ? { backgroundColor: bgColor } : undefined}
    >
      {/* ── Heading ── */}
      <div className="container mx-auto max-w-6xl px-10 pt-24 pb-12 text-center max-md:px-6 max-md:pt-14 max-md:pb-8">
        <Reveal>
          <h2
            className="text-[#6B3213] uppercase leading-tight mb-4 font-normal insta-heading-text transition-colors duration-300"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "0.02em" }}
          >
            GLIMPSES FROM ZIPPY
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-[#85431E]/80 text-base md:text-lg font-medium insta-heading-text transition-colors duration-300">
            Real moments right from the stables
          </p>
        </Reveal>
      </div>

      {/* ── Image Grid ── */}
      <div className="w-full overflow-x-auto pb-12 no-scrollbar max-md:pb-6 max-md:overflow-visible">
        <div className="flex gap-[8px] w-max max-md:grid max-md:grid-cols-2 max-md:gap-[8px] max-md:w-auto max-md:mx-auto max-md:px-6">
          {/* Dynamic Left Spacer for perfect centering on large screens and equal padding on small ones */}
          <div className="flex-none max-md:hidden" style={{ width: "max(40px, calc(50vw - 705px))" }} />
          {/* Column 1 */}
          <div className="flex flex-col gap-[6px] w-[324px] max-md:w-auto max-md:gap-[4px]">
            <Reveal delay={0.1} className="w-full h-[369px] max-md:h-[170px]">
              <a href={INSTA_LINK} target="_blank" rel="noopener noreferrer" className="block relative w-full h-full bg-[#E5DCC8] hover:opacity-90 transition-opacity">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g1.webp" alt="Zippy 1" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </a>
            </Reveal>
            <Reveal delay={0.2} className="w-full h-[216px] max-md:h-[99px]">
              <a href={INSTA_LINK} target="_blank" rel="noopener noreferrer" className="block relative w-full h-full bg-[#E5DCC8] hover:opacity-90 transition-opacity">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g2.webp" alt="Zippy 2" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </a>
            </Reveal>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col w-[331px] max-md:w-auto">
            <Reveal delay={0.15} className="w-full h-[591px] max-md:h-[272px]">
              <a href={INSTA_LINK} target="_blank" rel="noopener noreferrer" className="block relative w-full h-full bg-[#E5DCC8] hover:opacity-90 transition-opacity">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g3.webp" alt="Zippy 3" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </a>
            </Reveal>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-[11px] w-[393px] max-md:w-auto max-md:gap-[6px]">
            <Reveal delay={0.2} className="w-full h-[337px] max-md:h-[155px]">
              <a href={INSTA_LINK} target="_blank" rel="noopener noreferrer" className="block relative w-full h-full bg-[#E5DCC8] hover:opacity-90 transition-opacity">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g4.webp" alt="Zippy 4" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </a>
            </Reveal>
            <Reveal delay={0.3} className="w-full h-[243px] max-md:h-[112px]">
              <a href={INSTA_LINK} target="_blank" rel="noopener noreferrer" className="block relative w-full h-full bg-[#E5DCC8] hover:opacity-90 transition-opacity">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g5.webp" alt="Zippy 5" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </a>
            </Reveal>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-[9px] w-[337px] max-md:w-auto max-md:gap-[5px]">
            <Reveal delay={0.25} className="w-full h-[319px] max-md:h-[147px]">
              <a href={INSTA_LINK} target="_blank" rel="noopener noreferrer" className="block relative w-full h-full bg-[#E5DCC8] hover:opacity-90 transition-opacity">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g6.webp" alt="Zippy 6" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </a>
            </Reveal>
            <Reveal delay={0.35} className="w-full h-[263px] max-md:h-[121px]">
              <a href={INSTA_LINK} target="_blank" rel="noopener noreferrer" className="block relative w-full h-full bg-[#E5DCC8] hover:opacity-90 transition-opacity">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g7.webp" alt="Zippy 7" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </a>
            </Reveal>
          </div>

          {/* Dynamic Right Spacer */}
          <div className="flex-none max-md:hidden" style={{ width: "max(40px, calc(50vw - 705px))" }} />
        </div>
      </div>

      {/* ── "Follow us" + social links ── */}
      {!hideFooter && (
        <div className="container mx-auto max-w-5xl px-4 md:px-6 pt-16 pb-24 mt-8 max-md:pt-10 max-md:pb-12 max-md:mt-4">
          <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-16 md:gap-20 max-w-5xl mx-auto max-md:gap-8 text-left">
            
            {/* Left text */}
            <div className="flex-1 max-w-[650px]">
              <Reveal>
                <a href={INSTA_LINK} target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-80 transition-opacity mb-2">
                  <h3 className="text-[#85431E] font-medium leading-[1.1] insta-heading-text transition-colors duration-300" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)" }}>
                    Follow us for stable updates and rider<br/>stories
                  </h3>
                </a>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-[#85431E]/90 text-[14px] md:text-[15px] leading-tight insta-heading-text transition-colors duration-300">
                  Learn about Horses and get the best tips on riding, taking care, competitions, and most importantly having fun!
                </p>
              </Reveal>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] bg-black/40 hidden md:block self-stretch mx-4" />

            {/* Right social links */}
            <div className="flex-1 max-w-[280px]">
              <Reveal delay={0.4}>
                <div className="flex flex-col items-center">
                  <p
                    className="font-bold text-[#2C1A0E] mb-6 insta-heading-text transition-colors duration-300 text-center"
                    style={{ fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
                  >
                    FOLLOW US ON
                  </p>
                  <div className="flex flex-row justify-center gap-8">
                    {socialLinks.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#85431E] hover:opacity-70 transition-all flex items-center justify-center insta-heading-text"
                        aria-label={link.name}
                      >
                        {link.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
