"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

type Rider = {
  name: string;
  joinedDate: string;
  location: string;
  startingLevel: string;
  role: string;
  program: string;
  beforeQuote: string;
  afterMonths: number;
  afterQuote: string;
  image: string;
};

const rowColors = [
  "#6872A8",
  "#B05A38",
  "#4A2810",
  "#7A4820",
  "#1A2848",
];

const riders: Rider[] = [
  {
    name: "Mohak",
    joinedDate: "2023 March",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Product Designer, Bangalore",
    program: "Beginners → Novice",
    beforeQuote: "I'd never been near a horse in my life. I booked the trial on a whim after seeing a photo on Instagram. I was nervous the whole drive there.",
    afterMonths: 6,
    afterQuote: "Can trot independently and canter with support. Competed in the first inter-club event. Confident around all the horses at ZEC.",
    image: "/assets/images/rider1.webp",
  },
  {
    name: "Priya S",
    joinedDate: "2023 March",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Software Engineer, Bangalore",
    program: "Beginners → Intermediate",
    beforeQuote: "I'd never been near a horse in my life. I booked the trial on a whim after seeing a photo on Instagram. I was nervous the whole drive there.",
    afterMonths: 8,
    afterQuote: "Completed Beginners and Novice programs. Now in Intermediate. Can trot independently and has been introduced to canter.",
    image: "/assets/images/rider2.webp",
  },
  {
    name: "Tushita",
    joinedDate: "2023 March",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Architect, Bangalore",
    program: "Beginners → Novice",
    beforeQuote: "Horses seemed majestic but intimidating. I wasn't sure I'd last more than a few sessions.",
    afterMonths: 8,
    afterQuote: "Now rides three days a week. Has started learning jumping fundamentals and helps newer riders settle in.",
    image: "/assets/images/rider3.webp",
  },
  {
    name: "Arnav",
    joinedDate: "2023 March",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Marketing Manager, Bangalore",
    program: "Beginners → Novice",
    beforeQuote: "I wanted something different from the gym. Horses were on the bucket list since childhood.",
    afterMonths: 5,
    afterQuote: "Progressed to Novice program in five months. Now working on posting trot and balance exercises.",
    image: "/assets/images/rider4.webp",
  },
  {
    name: "Anagha",
    joinedDate: "2023 March",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Teacher, Bangalore",
    program: "Beginners → Novice",
    beforeQuote: "I was scared of large animals. My daughter convinced me to try the trial ride and I never looked back.",
    afterMonths: 7,
    afterQuote: "Rides confidently on all horses in the school string. Recently started light trail rides on weekend sessions.",
    image: "/assets/images/rider5.webp",
  },
];

export default function StoriesRidersSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Desktop reveals on hover; mobile has no hover so each row is tapped to toggle
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section className="w-full">
      {/* Preload images in the background so they display instantly on hover */}
      <div className="hidden">
        {riders.map((rider) => (
          <Image key={`preload-${rider.name}`} src={rider.image} alt="" width={10} height={10} priority />
        ))}
      </div>

      {riders.map((rider, i) => {
        const bg = rowColors[i % rowColors.length];
        const isExpanded = expandedIndex === i;

        return (
          <Reveal key={rider.name} delay={0.05 * i} className="w-full">
            <motion.div
              layout
              onMouseEnter={!isMobile ? () => setExpandedIndex(i) : undefined}
              onMouseLeave={!isMobile ? () => setExpandedIndex(null) : undefined}
              onClick={isMobile ? () => setExpandedIndex(prev => (prev === i ? null : i)) : undefined}
              style={{ backgroundColor: bg }}
              className="w-full overflow-hidden cursor-pointer"
            >
            <AnimatePresence initial={false} mode="wait">
              {!isExpanded ? (
                /* ── Collapsed row ── */
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32 }}
                  className="w-full px-8 md:px-16 grid grid-cols-3 items-center h-[110px] max-md:grid-cols-1 max-md:h-auto max-md:gap-1.5 max-md:px-6 max-md:py-4"
                >
                  <span
                    className="text-white/60 text-3xl md:text-5xl font-light "
                  >
                    {rider.name}
                  </span>

                  <div className="text-left flex flex-col justify-center">
                    <span className="text-white/30 text-[11px] md:text-base block leading-tight">
                      Joined &middot;
                    </span>
                    <span className="text-white/50 text-sm md:text-base leading-tight">{rider.joinedDate}</span>
                  </div>

                  <div className="text-left flex flex-col justify-center">
                    <span className="text-white/30 text-[11px] md:text-base block leading-tight">
                      {rider.location} &middot;
                    </span>
                    <span className="text-white/50 text-sm md:text-base leading-tight">{rider.startingLevel}</span>
                  </div>
                </motion.div>
              ) : (
                /* ── Expanded profile (replaces the row entirely) ── */
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32 }}
                  className="flex min-h-[380px] max-md:flex-col max-md:min-h-0"
                >
                  {/* Left: photo with name overlay */}
                  <div className="relative w-[38%] min-h-[380px] flex-shrink-0 max-md:w-full max-md:min-h-[280px]">
                    <Image loading="lazy"
                      src={rider.image}
                      alt={rider.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 38vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-md:p-6">
                      <h3
                        className="text-white text-3xl md:text-4xl font-bold leading-none mb-2 max-sm:text-2xl"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                      >
                        {rider.name}
                      </h3>
                      <p className="text-white/70 text-sm">{rider.role}</p>
                      <p className="text-white/55 text-xs mt-1">Joined {rider.joinedDate}</p>
                      <p className="text-white/55 text-xs">Program: {rider.program}</p>
                    </div>
                  </div>

                  {/* Right: review */}
                  <div className="flex-1 px-8 md:px-16 py-10 flex flex-col justify-center max-md:px-6 max-md:py-8">
                    <p className="text-white text-[13px] md:text-sm mb-2">
                      After {rider.afterMonths} Months of riding
                    </p>
                    <p className="text-white text-base md:text-lg leading-relaxed max-w-2xl font-light">
                      {rider.afterQuote}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            </motion.div>
          </Reveal>
        );
      })}
    </section>
  );
}
