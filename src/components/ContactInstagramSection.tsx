"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

interface ContactInstagramSectionProps {
  bgColor?: string;
}

export default function ContactInstagramSection({ bgColor = "#FFFBF2" }: ContactInstagramSectionProps) {
  return (
    <section 
      className={`w-full ${bgColor === "#FFF8E5" ? "bg-[#FFF8E5]" : ""}`} 
      style={bgColor !== "#FFFBF2" ? { backgroundColor: bgColor } : undefined}
    >
      {/* ── Heading ── */}
      <div className="container mx-auto max-w-6xl px-10 pt-24 pb-12 text-center max-md:px-6 max-md:pt-16 max-md:pb-8">
        <Reveal>
          <h2
            className="text-[#85431E] font-medium insta-heading-text transition-colors duration-300"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
          >
            Follow us for stable updates and rider stories.
          </h2>
        </Reveal>
      </div>

      {/* ── SVG band — edge to edge ── */}
      <div
        className="w-full relative py-12 md:py-16 max-md:py-8"
        style={{
          backgroundColor:  "transparent",
          backgroundImage:  "url('/assets/images/insta-bg.svg')",
          backgroundSize:   "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* ── Image Grid (Scaled down to ~70%) ── */}
        <div className="w-full overflow-x-auto no-scrollbar pb-6 px-4 max-md:px-3 max-md:pb-4">
          <div className="flex gap-[6px] w-max mx-auto max-md:gap-[4px]">
            {/* Column 1 */}
            <div className="flex flex-col gap-[4px] w-[227px] max-md:w-[140px] max-md:gap-[3px]">
              <Reveal delay={0.1} className="w-full h-[258px] max-md:h-[160px]">
                <div className="relative w-full h-full bg-[#E5DCC8]">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g1.webp" alt="Zippy 1" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.2} className="w-full h-[151px] max-md:h-[94px]">
                <div className="relative w-full h-full bg-[#E5DCC8]">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g2.webp" alt="Zippy 2" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col w-[232px] max-md:w-[144px]">
              <Reveal delay={0.15} className="w-full h-[413px] max-md:h-[256px]">
                <div className="relative w-full h-full bg-[#E5DCC8]">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g3.webp" alt="Zippy 3" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-[7px] w-[275px] max-md:w-[170px] max-md:gap-[4px]">
              <Reveal delay={0.2} className="w-full h-[236px] max-md:h-[146px]">
                <div className="relative w-full h-full bg-[#E5DCC8]">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g4.webp" alt="Zippy 4" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.3} className="w-full h-[170px] max-md:h-[105px]">
                <div className="relative w-full h-full bg-[#E5DCC8]">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g5.webp" alt="Zippy 5" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-[6px] w-[236px] max-md:w-[146px] max-md:gap-[4px]">
              <Reveal delay={0.25} className="w-full h-[223px] max-md:h-[138px]">
                <div className="relative w-full h-full bg-[#E5DCC8]">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g6.webp" alt="Zippy 6" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.35} className="w-full h-[184px] max-md:h-[114px]">
                <div className="relative w-full h-full bg-[#E5DCC8]">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g7.webp" alt="Zippy 7" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {/* Button below the section */}
      <div className="container mx-auto max-w-[1000px] px-6 mt-6 pb-24 flex justify-end max-md:justify-center max-md:pb-16">
        <Reveal delay={0.4}>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#DA7347] text-[#FFF8E5] px-6 py-3 font-medium text-sm transition-colors hover:bg-[#DA7347]/90 insta-btn max-md:w-full max-md:justify-center max-md:py-3.5"
          >
            See more on Instagram
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12H19M12 5L19 12L12 19" />
            </svg>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
