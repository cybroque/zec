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
      <div className="container mx-auto max-w-6xl px-10 pt-24 pb-2 text-center max-md:px-6 max-md:pt-16 max-md:pb-2">
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
        className="w-full relative pt-6 md:pt-8 pb-28 md:pb-36 max-md:pt-4 max-md:pb-16"
        style={{
          backgroundColor:  "transparent",
          backgroundImage:  "url('/assets/images/insta-bg.svg')",
          backgroundSize:   "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* ── Image Grid (full size — matches GLIMPSES FROM ZIPPY) ── */}
        <div className="w-full overflow-x-auto no-scrollbar pb-6 px-4 max-md:px-3 max-md:pb-4">
          <div className="flex gap-[8px] w-max mx-auto max-md:gap-[4px]">
            {/* Column 1 */}
            <div className="flex flex-col gap-[6px] w-[324px] max-md:w-[190px] max-md:gap-[3px]">
              <Reveal delay={0.1} className="w-full h-[369px] max-md:h-[216px]">
                <div className="relative w-full h-full bg-[#E5DCC8] rounded-sm overflow-hidden">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g1.webp" alt="Zippy 1" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.2} className="w-full h-[216px] max-md:h-[126px]">
                <div className="relative w-full h-full bg-[#E5DCC8] rounded-sm overflow-hidden">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g2.webp" alt="Zippy 2" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col w-[331px] max-md:w-[194px]">
              <Reveal delay={0.15} className="w-full h-[591px] max-md:h-[346px]">
                <div className="relative w-full h-full bg-[#E5DCC8] rounded-sm overflow-hidden">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g3.webp" alt="Zippy 3" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-[11px] w-[393px] max-md:w-[230px] max-md:gap-[4px]">
              <Reveal delay={0.2} className="w-full h-[337px] max-md:h-[197px]">
                <div className="relative w-full h-full bg-[#E5DCC8] rounded-sm overflow-hidden">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g4.webp" alt="Zippy 4" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.3} className="w-full h-[243px] max-md:h-[142px]">
                <div className="relative w-full h-full bg-[#E5DCC8] rounded-sm overflow-hidden">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g5.webp" alt="Zippy 5" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-[9px] w-[337px] max-md:w-[197px] max-md:gap-[4px]">
              <Reveal delay={0.25} className="w-full h-[319px] max-md:h-[187px]">
                <div className="relative w-full h-full bg-[#E5DCC8] rounded-sm overflow-hidden">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g6.webp" alt="Zippy 6" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.35} className="w-full h-[263px] max-md:h-[154px]">
                <div className="relative w-full h-full bg-[#E5DCC8] rounded-sm overflow-hidden">
                  <Image loading="lazy" src="/assets/images/Contact/Webp/g7.webp" alt="Zippy 7" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
