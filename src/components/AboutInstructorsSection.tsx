"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useTransform, useMotionTemplate, animate } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const instructors = [
  {
    id: 1,
    name: "Barath Manoharan",
    role: "Head of Training",
    desc: "Equestrian national champion guiding our riders with confidence and real sportsman spirit",
    image: "/assets/images/about-img1.png",
    gridImage: "col-start-5 col-span-3",
    gridText: "col-start-8 col-span-4",
  },
  {
    id: 2,
    name: "Barath Manoharan",
    role: "Head of Trainning",
    desc: "Equestrian national champion guiding our riders with confidence and real sportsman spirit",
    image: "/assets/images/about-img2.png",
    gridImage: "col-start-1 col-span-3",
    gridText: "col-start-4 col-span-3",
  },
  {
    id: 3,
    name: "Barath Manoharan",
    role: "Head of Trainning",
    desc: "Equestrian national champion guiding our riders with confidence and real sportsman spirit",
    image: "/assets/images/about-img3.png",
    gridImage: "col-start-6 col-span-3",
    gridText: "col-start-9 col-span-3",
  },
];

export default function AboutInstructorsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

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
      <div className="pt-24 pb-16 md:pt-42 md:pb-24 relative z-10">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <Reveal>
              <h2 className="text-[#FFF8E5] font-sans text-3xl md:text-5xl font-normal  mb-5">
                The People You&apos;ll Ride With
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-[#FFF8E5]/80 text-sm md:text-base leading-relaxed font-light max-w-2xl lg:max-w-[600px] mx-auto">
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
                      <Image loading="eager" fetchPriority="low"
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
                    <Image loading="eager" fetchPriority="low" src={instructor.image} alt={instructor.name} fill sizes="248px" className="object-cover" />
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
      <div className="pt-24 pb-0 md:pt-32">
        <div className="container mx-auto pl-6 md:pl-12 pr-0 lg:pr-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-0 items-start">
            {/* Left: Text */}
            <div className="flex flex-col gap-10 pr-6 md:pr-12 lg:pr-8 lg:pt-22">
              <Reveal>
                <h2 className="text-[#FFF8E5] font-sans text-4xl md:text-[55px] font-normal leading-[1.1]">
                  The Center That&apos;s<br />Right in the City.
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-[#f2ebd9]/80 text-base md:text-[15px] font-light leading-[1.25] max-w-[400px]">
                  Zippy Equestrian Center is located in JP Nagar, 7th Phase, right in the heart of
                  South Bangalore with a well-maintained arena, proper stabling for our horses and
                  everything you need to show up, ride and leave with a smile.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-white text-base md:text-[15px] font-normal leading-[1.25] max-w-[420px]">
                  No lengthy commute, no remote farm, zero fuss. Just a fully equipped riding center
                  that is minutes away from where you are.
                </p>
              </Reveal>
            </div>

            {/* Right: Map */}
            <div
              className="relative w-full max-w-[450px] lg:max-w-[733px] ml-auto cursor-pointer mt-12 lg:-mt-[150px] lg:-mb-0 z-0"
              style={{
                marginRight: "calc(-48vw + 100%)",
                aspectRatio: "733/982",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 100%)",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 100%)"
              }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Image loading="eager" fetchPriority="low"
                src="/assets/images/map2.svg"
                alt="ZEC Location Map"
                fill
                sizes="(max-width: 768px) 100vw, 700px"
                className="object-contain"
              />

              {/* Dot marker */}
              <div
                className="absolute pointer-events-none"
                style={{ left: "calc(34.1% - 10px)", top: "calc(56.8% - 10px)", width: 20, height: 20 }}
              >
                <div
                  className={`w-full h-full rounded-full border-2 border-[#DA7347] transition-opacity duration-300 ${showTooltip ? "opacity-100" : "opacity-0"
                    }`}
                />
              </div>

              {/* Address card */}
              <motion.div
                initial={false}
                animate={showTooltip ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute pointer-events-none z-30"
                style={{ left: "34.65%", top: "57.43%", width: "50%" }}
              >
                <div
                  className="backdrop-blur-[3px] rounded-[7px] p-4 lg:p-5"
                  style={{ background: "rgba(218,115,71,0.4)" }}
                >
                  <p className="text-[#f2ebd9] text-[10px] lg:text-[11px] uppercase font-bold mb-2 tracking-wider">
                    Zippy Equestrian Center
                  </p>
                  <p className="text-[#f2ebd9]/90 text-[12px] lg:text-[13px] font-light leading-relaxed">
                    102/2, next to Sports Drome,<br />
                    Opposite Jain Public School, Puttenahalli,<br />
                    JP Nagar 7th Phase, Bengaluru – 560078
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
