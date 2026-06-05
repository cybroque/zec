"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
    image: "/assets/images/about-p1.png",
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
    image: "/assets/images/about-p2.png",
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
    image: "/assets/images/about-p3.png",
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
    image: "/assets/images/about-p4.png",
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
    image: "/assets/images/about-p1.png",
  },
  {
    name: "Ritesh",
    joinedDate: "2023 June",
    location: "Bangalore",
    startingLevel: "Had some prior experience",
    role: "Finance Analyst, Bangalore",
    program: "Novice → Intermediate",
    beforeQuote: "Rode a couple of times on holiday trips but never had proper training. Wanted to do it right.",
    afterMonths: 4,
    afterQuote: "Built solid fundamentals. Now working through the Intermediate syllabus with focus on seat and contact.",
    image: "/assets/images/about-p2.png",
  },
  {
    name: "Kavya",
    joinedDate: "2022 September",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Graphic Designer, Bangalore",
    program: "Beginners → Intermediate",
    beforeQuote: "I was the person who always said 'I'd love to try that someday.' ZEC made someday happen.",
    afterMonths: 9,
    afterQuote: "One of our most consistent riders. Currently preparing for the regional beginner category event.",
    image: "/assets/images/about-p3.png",
  },
  {
    name: "Sameer",
    joinedDate: "2023 June",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Developer, Bangalore",
    program: "Beginners → Novice",
    beforeQuote: "Came in knowing nothing. The first time I sat on a horse I thought I was going to fall off.",
    afterMonths: 3,
    afterQuote: "Trotting independently after three months. Quick learner — will move to Novice in the next cycle.",
    image: "/assets/images/about-p4.png",
  },
  {
    name: "Divya",
    joinedDate: "2021 November",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Homemaker, Bangalore",
    program: "Beginners → Novice",
    beforeQuote: "I joined with my daughter. She was the brave one — I just wanted to keep up with her.",
    afterMonths: 12,
    afterQuote: "Now rides at the same level as her daughter. They school together on Saturday mornings. A family that rides together.",
    image: "/assets/images/about-p1.png",
  },
];

export default function StoriesRidersSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section className="w-full">
      {riders.map((rider, i) => {
        const bg = rowColors[i % rowColors.length];
        const isExpanded = expandedIndex === i;

        return (
          <motion.div
            key={rider.name}
            layout
            onMouseEnter={() => setExpandedIndex(i)}
            onMouseLeave={() => setExpandedIndex(null)}
            style={{ backgroundColor: bg }}
            className="w-full overflow-hidden"
          >
            <AnimatePresence initial={false} mode="wait">
              {!isExpanded ? (
                /* ── Collapsed row ── */
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="container mx-auto max-w-7xl px-8 md:px-16 grid grid-cols-3 items-center h-[110px]"
                >
                  <span
                    className="text-white/85 text-3xl md:text-4xl font-light tracking-wide"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {rider.name}
                  </span>

                  <div className="text-center">
                    <span className="text-white/45 text-[11px] tracking-widest uppercase block mb-1">
                      Joined ·
                    </span>
                    <span className="text-white/75 text-sm">{rider.joinedDate}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-white/45 text-[11px] tracking-widest uppercase block mb-1">
                      {rider.location} ·
                    </span>
                    <span className="text-white/75 text-sm">{rider.startingLevel}</span>
                  </div>
                </motion.div>
              ) : (
                /* ── Expanded profile (replaces the row entirely) ── */
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex min-h-[380px]"
                >
                  {/* Left: photo with name overlay */}
                  <div className="relative w-[38%] min-h-[380px] flex-shrink-0">
                    <Image
                      src={rider.image}
                      alt={rider.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 38vw"
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <h3
                        className="text-white text-3xl md:text-4xl font-bold leading-none mb-2"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                      >
                        {rider.name}
                      </h3>
                      <p className="text-white/70 text-sm">{rider.role}</p>
                      <p className="text-white/55 text-xs mt-1">Joined {rider.joinedDate}</p>
                      <p className="text-white/55 text-xs">Program: {rider.program}</p>
                    </div>
                  </div>

                  {/* Right: before / after */}
                  <div className="flex-1 px-8 md:px-12 py-10 flex flex-col justify-center gap-8">
                    <div>
                      <p className="text-white/45 text-[11px] tracking-[0.2em] uppercase mb-3">
                        Before Zippy
                      </p>
                      <p className="text-white/75 text-sm md:text-base italic leading-relaxed max-w-xl">
                        &ldquo;{rider.beforeQuote}&rdquo;
                      </p>
                    </div>

                    <div>
                      <p className="text-white/45 text-[11px] tracking-[0.2em] uppercase mb-3">
                        After {rider.afterMonths} Months
                      </p>
                      <div className="flex items-start gap-3">
                        <span className="text-white/25 text-5xl leading-none font-serif mt-1 flex-shrink-0">&ldquo;</span>
                        <p className="text-white text-lg md:text-2xl font-semibold leading-snug max-w-xl">
                          {rider.afterQuote}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </section>
  );
}
