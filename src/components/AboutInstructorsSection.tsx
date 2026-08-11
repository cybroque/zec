"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform, useMotionTemplate, animate } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const instructors = [
  {
    id: 1,
    name: "Barath Manoharan",
    role: "HEAD OF TRAINING",
    desc: "Equestrian national champion guiding our riders with confidence and real sportsman spirit",
    image: "/assets/images/About/Webp/people-c.webp",
    gridImage: "col-start-6 col-span-3",
    gridText: "col-start-9 col-span-4",
  },
  {
    id: 2,
    name: "Vishwa Premalal",
    role: "TRAINER",
    desc: "Equestrian and Showjumping rider and champion from Sri Lanka training our riders of all levels",
    image: "/assets/images/About/Webp/about-img2.webp",
    gridImage: "col-start-2 col-span-3",
    gridText: "col-start-5 col-span-4",
  },
];

export default function AboutInstructorsSection() {
  const containerRef = useRef<HTMLElement>(null);

  const isInView = useInView(containerRef, { amount: 0.15, once: true });
  const progress = useMotionValue(0);

  useEffect(() => {
    animate(progress, isInView ? 1 : 0, { duration: 0.8, ease: "easeInOut" });
  }, [isInView, progress]);

  const color1 = useTransform(progress, [0, 1], ["#1C2245", "#1C2245"]);
  const color2 = useTransform(progress, [0, 1], ["#1C2245", "#85431E"]);
  const color3 = useTransform(progress, [0, 1], ["#1C2245", "#85431E"]);
  const background = useMotionTemplate`linear-gradient(to bottom, ${color1} 0px, ${color2} 120px, ${color3} 100%)`;

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ background }}
    >
      {/* ── Instructors ── */}
      <div className="pt-24 pb-4 md:pt-36 md:pb-8 max-md:pt-16 relative z-10">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 max-md:mb-10">
            <Reveal>
              <h2 className="text-[#FFF8E5] font-sans text-3xl md:text-5xl font-normal md:pt-12 mb-5">
                The People You&apos;ll Ride With
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-[#FFF8E5]/80 text-sm md:text-base leading-relaxed font-light max-w-3xl lg:max-w-[760px] mx-auto">
                The right guidance changes everything. And that&apos;s exactly what you&apos;ll find here,
                instructors who care about how you ride and how you feel while doing it.
              </p>
            </Reveal>
          </div>

          {/* Desktop Grid — staggered layout */}
          <div className="hidden md:grid grid-cols-12 gap-y-16 relative w-full">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="contents">
                <div className={instructor.gridImage}>
                  <Reveal delay={0.05 * instructor.id} className="w-full h-full">
                    <div className="relative shadow-2xl rounded-sm overflow-hidden w-[248px] h-[332px] hover:scale-[1.03] hover:-translate-y-[3px] transition-transform duration-[400ms] ease-out">
                      <Image loading="lazy"
                        src={instructor.image}
                        alt={instructor.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                  </Reveal>
                </div>
                <div className={instructor.gridText}>
                  <Reveal delay={(0.05 * instructor.id) + 0.08} className="flex flex-col justify-center pl-3 lg:pl-5 h-full">
                    <h3 className="text-[#FFF8E5] text-lg lg:text-2xl font-normal mb-1.5">
                      {instructor.name}
                    </h3>
                    <p className="text-[#FFF8E5]/80 text-[10px] uppercase font-light mb-3">
                      {instructor.role}
                    </p>
                    <p className="text-[#DA7347] text-sm font-light leading-relaxed max-w-[280px]">
                      {instructor.desc}
                    </p>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden flex-col gap-12">
            {instructors.map((instructor) => (
              <Reveal key={instructor.id} delay={0.08}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-[248px] h-[332px] shadow-2xl mb-6 rounded-sm overflow-hidden hover:scale-[1.03] hover:-translate-y-[3px] transition-transform duration-[400ms] ease-out">
                    <Image loading="lazy" src={instructor.image} alt={instructor.name} fill sizes="248px" className="object-cover" />
                  </div>
                  <h3 className="text-[#FFF8E5] text-xl font-normal mb-1.5">{instructor.name}</h3>
                  <p className="text-[#FFF8E5]/80 text-[10px] uppercase  font-light mb-3">{instructor.role}</p>
                  <p className="text-[#DA7347] text-sm font-light leading-relaxed max-w-[260px]">{instructor.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Location / Map ── */}
      <div className="pt-12 pb-12 md:pt-16 md:pb-16 overflow-hidden">
        <div className="w-full pr-0">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left: Text — using exact clamp padding from Meet the Herd while maintaining full paragraph width */}
            <div
              className="w-full lg:w-[45%] xl:w-[42%] flex-shrink-0 flex flex-col gap-6 py-4"
              style={{ paddingLeft: "clamp(24px, 11.4vw, 172px)", paddingRight: "clamp(12px, 1.5vw, 24px)" }}
            >
              <Reveal>
                <h2 className="text-[#FFF8E5] font-sans text-4xl md:text-[50px] lg:text-[54px] font-normal leading-[1.1]">
                  The Center That&apos;s<br />Right in the City.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[#f2ebd9]/80 text-base md:text-[15px] font-light leading-[1.4] max-w-[500px]">
                  Zippy Equestrian Center is located in JP Nagar, 7th Phase, right in the heart of
                  South Bangalore with a well-maintained arena, proper stabling for our horses and
                  everything you need to show up, ride and leave with a smile.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-white text-base md:text-[15px] font-normal leading-[1.4] max-w-[500px]">
                  No lengthy commute, no remote farm, zero fuss. Just a fully equipped riding center
                  that is minutes away from where you are.
                </p>
              </Reveal>
            </div>

            {/* Right: Map (Touches right edge with 0 right padding & moderate scale) */}
            <div
              className="w-full lg:w-[55%] xl:w-[58%] relative max-w-[500px] lg:max-w-[580px] xl:max-w-[620px] ml-auto mr-0 z-0 max-md:pr-6 mt-6 lg:mt-0"
              style={{
                aspectRatio: "733/982",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 100%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 100%)"
              }}
            >
              <Image loading="lazy"
                src="/assets/images/about-map.svg"
                alt="ZEC Location Map"
                fill
                sizes="(max-width: 768px) 100vw, 620px"
                className="object-contain"
              />

              {/* Statically visible Dot marker */}
              <div
                className="absolute pointer-events-none"
                style={{ left: "calc(34.1% - 10px)", top: "calc(56.8% - 10px)", width: 20, height: 20 }}
              >
                <div className="w-full h-full rounded-full border-2 border-[#DA7347]" />
              </div>

              {/* Statically visible Square Address card */}
              <div
                className="absolute z-30 pointer-events-auto"
                style={{ left: "34.65%", top: "57.43%", width: "50%" }}
              >
                <div
                  className="backdrop-blur-[3px] rounded-none p-3.5 lg:p-4 shadow-lg border border-[#DA7347]/30"
                  style={{ background: "rgba(218,115,71,0.55)" }}
                >
                  <p className="text-[#f2ebd9] text-[10px] lg:text-[11px] uppercase font-bold mb-1.5 tracking-wider">
                    Zippy Equestrian Center
                  </p>
                  <p className="text-[#f2ebd9]/90 text-[11px] lg:text-[12px] font-light leading-relaxed">
                    102/2, next to Sports Drome,<br />
                    Opposite Jain Public School, Puttenahalli,<br />
                    JP Nagar 7th Phase, Bengaluru – 560078
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
