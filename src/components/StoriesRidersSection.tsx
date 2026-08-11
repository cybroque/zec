"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

type Rider = {
  name: string;
  age: string;
  joinedDate: string;
  location: string;
  startingLevel: string;
  role?: string;
  quote: string;
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
    name: "Anagha",
    age: "15",
    joinedDate: "2023 March",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Competitive Rider",
    quote: "Being a part of Zippy has been one of the happiest experiences of my life. What I love most about Zippy is the warm, welcoming environment. Every visit feels special, and I always leave feeling more confident, responsible, and connected to the horses. I’m truly grateful to the trainers and team for making my riding journey so memorable.",
    image: "/assets/images/Rider_stories/Webp/Anagha.webp",
  },
  {
    name: "AV Aravindh",
    age: "40+",
    joinedDate: "2023 March",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Dressage Rider",
    quote: "There has always been something about horses and riding that I’ve loved. As a child, I would paint horses, though I never had the opportunity to ride. I finally started riding close to 40, but struggled physically and was almost ready to quit after a difficult experience elsewhere. Finding Zippy about a year ago changed that journey completely. I’ve grown in confidence, learned to understand and care for horses, and even competed in dressage. Most importantly, Zippy has given me a wonderful community and special bonds with my horse friends—Hercules, BlackHawck, and Arjuna Maverick.",
    image: "/assets/images/Rider_stories/Webp/Aravindh.webp",
  },
  {
    name: "Shaurya Subramanian",
    age: "10",
    joinedDate: "2023 March",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Rider",
    quote: "Learning to ride here has been an incredible journey. The instructors are supportive and motivating, helping riders progress at their own pace. The horses are well cared for, and the positive atmosphere makes every visit enjoyable. I look forward to every lesson and have gained both confidence and valuable riding skills.",
    image: "/assets/images/Rider_stories/Webp/Shaurya.webp",
  },
  {
    name: "Ira Singal",
    age: "14",
    joinedDate: "2023 March",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Rider",
    quote: "I’ve been riding for a while now, and it has become my favourite place to spend my evening. It feels calm, friendly, and easygoing. It’s not just about riding; I enjoy hanging around after lessons, spending time with the horses, talking with other riders, and just being around the stable. The trainers are supportive and always there when I need help. Every visit feels like a mix of riding, learning, and having a good time. I’ve made some great memories at Zippy. It genuinely feels like a second home.",
    image: "/assets/images/Rider_stories/Webp/Ira.webp",
  },
  {
    name: "Salma Salim",
    age: "25",
    joinedDate: "2023 March",
    location: "Bangalore",
    startingLevel: "Started as a complete beginner",
    role: "Rider",
    quote: "I love that it doesn’t feel like just another commitment, it’s a space where I can slow down, ride, spend time with the horses, and simply unwind. The atmosphere is relaxed and welcoming, and the trainers are supportive without making the experience feel overly serious. I’ve also really enjoyed getting to know the horses and their different personalities. Riding at Zippy gives me something to look forward to after a busy week",
    image: "/assets/images/Rider_stories/Webp/Salma.webp",
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
                  className="container mx-auto px-6 md:px-12 w-full grid grid-cols-3 items-center h-[110px] max-md:grid-cols-1 max-md:h-auto max-md:gap-1.5 max-md:py-4"
                >
                  <span
                    className="text-white/60 text-3xl md:text-3xl font-light "
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
                  className="flex min-h-[380px] max-md:flex-col max-md:min-h-0 relative"
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
                  </div>

                  {/* Rider Name Overlay Aligned to Container */}
                  <div className="absolute bottom-0 left-0 w-full pointer-events-none max-md:top-0 max-md:bottom-auto">
                    {/* On mobile, we position it relative to the image which is 280px min height, 
                        so we place it at the bottom of the image area. */}
                    <div className="container mx-auto px-6 md:px-12 h-full flex items-end">
                      <div className="pb-8 md:pb-16 max-md:h-[280px] max-md:pb-6 flex flex-col justify-end pointer-events-auto max-w-md">
                        <h3 className="text-white text-3xl md:text-4xl font-bold leading-none mb-2 max-sm:text-2xl">
                          {rider.name}
                        </h3>
                        <p className="text-white/70 text-sm">{rider.role}</p>
                        <p className="text-white/55 text-xs mt-1">Age: {rider.age}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right: review */}
                  <div className="flex-1 px-8 md:px-16 py-10 flex flex-col justify-center max-md:px-6 max-md:py-8">
                    <p className="text-white text-base md:text-lg leading-relaxed max-w-2xl font-light">
                      &quot;{rider.quote}&quot;
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
