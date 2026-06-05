"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent } from "framer-motion";

const cardsData = [
  {
    id: "discovery",
    badge: "TRIAL EXPERIENCE · START HERE",
    badgeBg: "bg-black/20",
    badgeText: "text-white",
    title: "Discovery Ride",
    description: "Anyone who wants to try horse riding for the first time. No experience, no fitness level, no age requirement — if you're curious, this is for you.",
    features: [
      "A brief introduction to the horse and basic safety",
      "Guided mounting with full instructor support",
      "A 30-minute supervised ride walking pace, fully guided",
      "A post-ride chat about which program to join next, if you'd like to continue"
    ],
    duration: "1 session · 45 minutes",
    sessions: null,
    button: "Call to book",
    bgColor: "bg-[#D9734A]",
    textColor: "text-white",
    featureBorder: "border-white/20",
    image: "/assets/images/pic1.jpg"
  },
  {
    id: "foundation",
    badge: "BEGINNER LEVEL",
    badgeBg: "bg-[#4271B3]",
    badgeText: "text-white",
    title: "Foundation Program",
    description: "Focused on building strong fundamentals in riding and horse management. The right place to begin your riding journey — no prior experience needed.",
    features: [
      "Walk, trot, and canter development",
      "Correct posture, balance, and control",
      "Understanding horse behaviour and communication",
      "Introduction to grooming and stable practices"
    ],
    duration: "1 session · 45 minutes",
    sessions: "50",
    button: null,
    bgColor: "bg-[#F2F9FF]",
    textColor: "text-[#242A59]",
    featureBorder: "border-[#242A59]/20",
    image: "/assets/images/pic2.jpg"
  },
  {
    id: "development",
    badge: "INTERMEDIATE / PRE-COMPETITIVE",
    badgeBg: "bg-white",
    badgeText: "text-[#5A7BB5]",
    title: "Development Program",
    description: "For riders who have completed the foundation program. A structured, performance-focused program to take you from a confident rider to competition-ready.",
    features: [
      "Improved control, balance, and riding technique across all gaits",
      "Introduction to jumping and discipline-specific training",
      "Structured, performance-focused progression",
      "Introduction to grooming and stable practices"
    ],
    duration: "1 session · 45 minutes",
    sessions: "50",
    button: null,
    bgColor: "bg-[#5A7BB5]",
    textColor: "text-white",
    featureBorder: "border-white/20",
    image: "/assets/images/pic3.jpg"
  },
  {
    id: "performance",
    badge: "ADVANCED / COMPETITIVE",
    badgeBg: "bg-white",
    badgeText: "text-[#91572D]",
    title: "Performance Program",
    description: "A high-performance track for riders aiming to compete nationally or represent state/national teams. Professional coaching, structured training plans, and a competitive environment.",
    features: [
      "Advanced techniques and discipline specialization - Show jumping and Dressage",
      "Competition preparation and strategy",
      "Professional coaching and structured training plans",
      "Pathway to national and international competitions"
    ],
    duration: "1 session · 45 minutes",
    sessions: "75",
    button: null,
    bgColor: "bg-[#91572D]",
    textColor: "text-white",
    featureBorder: "border-white/20",
    image: "/assets/images/pic4.jpg"
  },
  {
    id: "dressage",
    badge: "SPECIALIZATION",
    badgeBg: "bg-white",
    badgeText: "text-[#242A59]",
    title: "Dressage Program",
    description: "Riders who have completed the Performance Program and want to pursue Dressage as a discipline. A structured, block-wise training program. To block 1, complete the previous block training.",
    features: [
      "Correct dressage seat and refined position in the saddle",
      "Precise aids and communication with the horse",
      "Transitions, lateral movements, and rhythm at all gaits",
      "Building collection and extension for dressage elements"
    ],
    duration: "1 session · 45 minutes",
    sessions: "12 sessions a month",
    button: null,
    bgColor: "bg-[#242A59]",
    textColor: "text-white",
    featureBorder: "border-white/20",
    image: "/assets/images/pic5.jpg"
  },
  {
    id: "showjumping",
    badge: "SPECIALIZATION",
    badgeBg: "bg-white",
    badgeText: "text-[#242A59]",
    title: "Showjumping Program",
    description: "Riders who are comfortable cantering independently and want to learn how to jump fences. A progressive introduction to showjumping - from ground poles to jumping courses.",
    features: [
      "The jumping position and two-point seat",
      "Approach, take-off, and landing technique",
      "Gridwork and gymnastic exercises to build confidence",
      "Riding a course of fences with control and rhythm"
    ],
    duration: "1 session · 45 minutes",
    sessions: "12 sessions a month",
    button: null,
    bgColor: "bg-[#242A59]",
    textColor: "text-white",
    featureBorder: "border-white/20",
    image: "/assets/images/pic6.jpg"
  },
  {
    id: "practice",
    badge: "ADD ON",
    badgeBg: "bg-white",
    badgeText: "text-[#111111]",
    title: "Practice Program",
    description: "Practice sessions outside of our regular Foundation/Intermediate/Advanced curriculum. A structured way to get extra saddle time to work on specific skills.",
    features: [
      "Your instructor will suggest Practice sessions when they feel additional time on a specific skill will help you progress faster. Sessions are priced at the same rate as your current program."
    ],
    duration: "1 session · 45 minutes",
    sessions: null,
    button: "Call to book",
    bgColor: "bg-[#111111]",
    textColor: "text-white",
    featureBorder: "border-white/20",
    image: "/assets/images/pic1.jpg"
  },
  {
    id: "lease",
    badge: "ADD ON",
    badgeBg: "bg-white",
    badgeText: "text-[#1A2421]",
    title: "Lease a Horse",
    description: "For experienced riders looking for a deeper connection and more consistent riding experience without the full commitment of ownership.",
    features: [
      "Exclusive access to a selected horse for your sessions",
      "Priority booking for practice and training sessions",
      "Experience the responsibilities of horse care",
      "Tailored guidance from our head instructors"
    ],
    duration: "Monthly subscription",
    sessions: "Flexible",
    button: "Enquire now",
    bgColor: "bg-[#1A2421]",
    textColor: "text-white",
    featureBorder: "border-white/20",
    image: "/assets/images/pic2.jpg"
  }
];

const navItems = [
  "TRIAL EXPERIENCE",
  "BEGINNER LEVEL",
  "INTERMEDIATE/PRE-COMPETITIVE",
  "ADVANCED/COMPETITIVE",
  "SPECIALIZATION",
];

// Which nav label each card maps to
const cardToNavIndex = [0, 1, 2, 3, 4, 4, 4, 4];

export default function ProgramsCardsSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [activeNavIdx, setActiveNavIdx] = useState(0);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const xPercent = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const vwOffset = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const x = useMotionTemplate`calc(${xPercent}% + ${vwOffset}vw)`;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardIdx = Math.min(
      Math.floor(latest * cardsData.length),
      cardsData.length - 1
    );
    setActiveNavIdx(cardToNavIndex[cardIdx]);
  });

  useEffect(() => {
    const labelEl = labelRefs.current[activeNavIdx];
    const containerEl = navContainerRef.current;
    if (labelEl && containerEl) {
      setUnderline({ left: labelEl.offsetLeft, width: labelEl.offsetWidth });
    }
  }, [activeNavIdx]);

  // Initialise underline after mount
  useEffect(() => {
    const labelEl = labelRefs.current[0];
    const containerEl = navContainerRef.current;
    if (labelEl && containerEl) {
      setUnderline({ left: labelEl.offsetLeft, width: labelEl.offsetWidth });
    }
  }, []);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#FFF8E5]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Top Navigation / Labels */}
        <div
          ref={navContainerRef}
          className="absolute top-12 left-0 w-full px-8 md:px-16 z-20"
        >
          <div className="relative flex gap-8 md:gap-16 text-[10px] md:text-xs font-bold tracking-widest w-fit">
            {/* Sliding underline */}
            <motion.div
              className="absolute bottom-0 h-px bg-[#DA7347]"
              animate={{ left: underline.left, width: underline.width }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
            />
            {navItems.map((item, idx) => (
              <span
                key={item}
                ref={(el) => { labelRefs.current[idx] = el; }}
                className={`pb-1.5 transition-colors duration-300 ${
                  activeNavIdx === idx ? "text-[#DA7347]" : "text-[#85431E]/40"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Cards Container */}
        <motion.div 
          style={{ x }} 
          className="flex w-max gap-6 px-8 md:px-16 pt-20 pb-10 items-stretch"
        >
          {cardsData.map((card) => (
            <div 
              key={card.id} 
              className={`flex-shrink-0 w-[350px] md:w-[420px] h-[75vh] min-h-[600px] max-h-[800px] flex flex-col ${card.bgColor} ${card.textColor} shadow-lg`}
            >
              {/* Card Content Top */}
              <div className="flex-1 flex flex-col p-8 md:p-10 overflow-hidden">
                <div className="mb-6">
                  <span className={`inline-block px-3 py-1 text-[10px] md:text-xs font-bold tracking-wider ${card.badgeBg} ${card.badgeText} rounded-sm uppercase`}>
                    {card.badge}
                  </span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-normal mb-4 leading-tight tracking-tight">
                  {card.title}
                </h3>
                
                <p className={`text-sm mb-8 leading-relaxed opacity-90`}>
                  {card.description}
                </p>
                
                <div className="flex flex-col gap-3">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className={`border-t ${card.featureBorder} pt-3 text-sm opacity-90`}>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Card Content Bottom / Stats */}
              <div className="p-8 md:p-10 pt-4 flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="text-[10px] tracking-wider uppercase opacity-80 mb-1">Duration</span>
                  <span className="text-sm font-medium">{card.duration}</span>
                </div>
                
                {card.sessions && (
                  <div className="flex flex-col">
                    <span className="text-[10px] tracking-wider uppercase opacity-80 mb-1">Number of Sessions</span>
                    <span className="text-sm font-medium">{card.sessions}</span>
                  </div>
                )}
                
                {card.button && (
                  <button className="bg-white text-[#D9734A] px-4 py-2 text-sm font-medium flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    {card.button}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Image at bottom */}
              <div className="relative h-48 md:h-56 w-full mt-auto">
                <Image 
                  src={card.image} 
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
