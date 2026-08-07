"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "Linked In", href: "#" },
  { name: "Whatsapp", href: "#" },
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
      <div className="w-full overflow-x-auto pb-12 no-scrollbar max-md:pb-6">
        <div className="flex gap-[8px] w-max max-md:gap-[5px]">
          {/* Dynamic Left Spacer for perfect centering on large screens and equal padding on small ones */}
          <div className="flex-none" style={{ width: "max(40px, calc(50vw - 705px))" }} />
          {/* Column 1 */}
          <div className="flex flex-col gap-[6px] w-[324px] max-md:w-[150px] max-md:gap-[4px]">
            <Reveal delay={0.1} className="w-full h-[369px] max-md:h-[170px]">
              <div className="relative w-full h-full bg-[#E5DCC8]">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g1.webp" alt="Zippy 1" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.2} className="w-full h-[216px] max-md:h-[99px]">
              <div className="relative w-full h-full bg-[#E5DCC8]">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g2.webp" alt="Zippy 2" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col w-[331px] max-md:w-[152px]">
            <Reveal delay={0.15} className="w-full h-[591px] max-md:h-[272px]">
              <div className="relative w-full h-full bg-[#E5DCC8]">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g3.webp" alt="Zippy 3" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-[11px] w-[393px] max-md:w-[181px] max-md:gap-[6px]">
            <Reveal delay={0.2} className="w-full h-[337px] max-md:h-[155px]">
              <div className="relative w-full h-full bg-[#E5DCC8]">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g4.webp" alt="Zippy 4" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.3} className="w-full h-[243px] max-md:h-[112px]">
              <div className="relative w-full h-full bg-[#E5DCC8]">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g5.webp" alt="Zippy 5" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col gap-[9px] w-[337px] max-md:w-[155px] max-md:gap-[5px]">
            <Reveal delay={0.25} className="w-full h-[319px] max-md:h-[147px]">
              <div className="relative w-full h-full bg-[#E5DCC8]">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g6.webp" alt="Zippy 6" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
            <Reveal delay={0.35} className="w-full h-[263px] max-md:h-[121px]">
              <div className="relative w-full h-full bg-[#E5DCC8]">
                <Image loading="lazy" src="/assets/images/Contact/Webp/g7.webp" alt="Zippy 7" fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
              </div>
            </Reveal>
          </div>

          {/* Dynamic Right Spacer */}
          <div className="flex-none" style={{ width: "max(40px, calc(50vw - 705px))" }} />
        </div>
      </div>

      {/* ── "Follow us" + social links ── */}
      {!hideFooter && (
        <div className="container mx-auto max-w-5xl px-10 pt-16 pb-24 mt-8 max-md:px-6 max-md:pt-10 max-md:pb-12 max-md:mt-4">
          <div className="flex flex-col md:flex-row justify-center items-start gap-16 md:gap-20 max-w-4xl mx-auto max-md:gap-8">
            
            {/* Left text */}
            <div className="flex-1 max-w-[420px] md:text-left">
              <Reveal>
                <h3 className="text-[#85431E] font-medium mb-8 insta-heading-text transition-colors duration-300" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)" }}>
                  Follow us for stable updates and rider stories
                </h3>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-[#85431E]/90 text-[14px] md:text-[15px] leading-[1.6] insta-heading-text transition-colors duration-300">
                  Learn about Horses and get the best tips on riding, taking care, competitions, and most importantly having fun!
                </p>
              </Reveal>
            </div>

            {/* Vertical Divider */}
            <div className="w-[1px] bg-black/40 hidden md:block self-stretch mx-4" />

            {/* Right social links */}
            <div className="flex-1 max-w-[200px]">
              <Reveal delay={0.4}>
                <p
                  className="font-bold text-[#2C1A0E] mb-6 insta-heading-text transition-colors duration-300"
                  style={{ fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
                >
                  FOLLOW US ON
                </p>
                <div className="flex flex-col gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-[#85431E] font-medium text-[15px] underline decoration-[#85431E]/40 underline-offset-4 hover:decoration-[#85431E] transition-all w-fit insta-heading-text"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
