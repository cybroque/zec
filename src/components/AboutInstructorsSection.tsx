"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

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
    gridImage: "col-start-7 col-span-3 mt-12 md:mt-24 lg:mt-36 relative z-20",
    gridText: "col-start-10 col-span-3 mt-12 md:mt-24 lg:mt-36 relative z-20",
  },
];

export default function AboutInstructorsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 20%"],
  });

  const color1 = useTransform(scrollYProgress, [0, 1], ["#1C2245", "#1C2245"]);
  const color2 = useTransform(scrollYProgress, [0, 1], ["#1C2245", "#85431E"]);
  const color3 = useTransform(scrollYProgress, [0, 1], ["#1C2245", "#85431E"]);
  const background = useMotionTemplate`linear-gradient(to bottom, ${color1} 0%, ${color2} 40%, ${color3} 100%)`;

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ background }}
    >
      {/* ── Instructors ── */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-[#FFF8E5] font-sans text-3xl md:text-5xl font-normal tracking-wide mb-5">
              The People You&apos;ll Ride With
            </h2>
            <p className="text-[#FFF8E5]/80 text-sm md:text-base leading-relaxed font-light max-w-2xl mx-auto">
              The right guidance changes everything. And that&apos;s exactly what you&apos;ll find here,
              instructors who care about how you ride and how you feel while doing it.
            </p>
          </div>

          {/* Desktop Grid — staggered layout */}
          <div className="hidden md:grid grid-cols-12 gap-y-4 relative w-full">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="contents">
                <div
                  className={`${instructor.gridImage} relative shadow-2xl rounded-sm overflow-hidden`}
                  style={{ aspectRatio: "4/5", maxHeight: "340px" }}
                >
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={`${instructor.gridText} flex flex-col justify-center pl-6 lg:pl-10`}>
                  <h3 className="text-[#FFF8E5] text-lg lg:text-2xl font-normal mb-1.5">
                    {instructor.name}
                  </h3>
                  <p className="text-[#FFF8E5]/80 text-[10px] uppercase tracking-widest font-light mb-3">
                    {instructor.role}
                  </p>
                  <p className="text-[#DA7347] text-sm font-light leading-relaxed max-w-[280px]">
                    {instructor.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden flex-col gap-12">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="flex flex-col items-center text-center">
                <div className="relative w-[220px] shadow-2xl mb-6 rounded-sm overflow-hidden" style={{ aspectRatio: "4/5" }}>
                  <Image src={instructor.image} alt={instructor.name} fill className="object-cover" />
                </div>
                <h3 className="text-[#FFF8E5] text-xl font-normal mb-1.5">{instructor.name}</h3>
                <p className="text-[#FFF8E5]/80 text-[10px] uppercase tracking-widest font-light mb-3">{instructor.role}</p>
                <p className="text-[#DA7347] text-sm font-light leading-relaxed max-w-[260px]">{instructor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Location / Map ── */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
            {/* Left: Text */}
            <div className="flex flex-col gap-6">
              <h2 className="text-[#FFF8E5] font-sans text-4xl md:text-5xl lg:text-[58px] font-normal leading-[1.1]">
                The Center That&apos;s<br />Right in the City.
              </h2>
              <p className="text-[#f2ebd9]/80 text-base md:text-[19px] font-light leading-[1.25] max-w-md">
                Zippy Equestrian Center is located in JP Nagar, 7th Phase, right in the heart of
                South Bangalore with a well-maintained arena, proper stabling for our horses and
                everything you need to show up, ride and leave with a smile.
              </p>
              <p className="text-white text-base md:text-[19px] font-normal leading-[1.25] max-w-md">
                No lengthy commute, no remote farm, zero fuss. Just a fully equipped riding center
                that is minutes away from where you are.
              </p>
            </div>

            {/* Right: Map — hover anywhere on map to show address card */}
            <div
              className="relative w-full max-w-[580px] ml-auto cursor-pointer"
              style={{ aspectRatio: "733/982" }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Image
                src="/assets/images/about-map.svg"
                alt="ZEC Location Map"
                fill
                className="object-contain"
              />

              {/*
                Dot marker: cx=250.313 cy=557.88 in 733×982 SVG
                → 34.1% from left, 56.8% from top
                Pulsing ring shown over the dot when hovering
              */}
              <div
                className="absolute pointer-events-none"
                style={{ left: "calc(34.1% - 10px)", top: "calc(56.8% - 10px)", width: 20, height: 20 }}
              >
                <div
                  className={`w-full h-full rounded-full border-2 border-[#DA7347] transition-opacity duration-300 ${
                    showTooltip ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Address card — appears at dot position, extends right */}
              <motion.div
                initial={false}
                animate={showTooltip ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute pointer-events-none"
                style={{ left: "34.65%", top: "57.43%", width: "52%" }}
              >
                <div
                  className="backdrop-blur-[3px] rounded-[7px] p-4"
                  style={{ background: "rgba(218,115,71,0.4)" }}
                >
                  <p className="text-[#f2ebd9] text-[9px] uppercase tracking-widest font-bold mb-2">
                    Zippy Equestrian Center
                  </p>
                  <p className="text-[#f2ebd9]/90 text-[11px] font-light leading-relaxed">
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
