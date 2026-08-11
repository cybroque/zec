"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Reveal from "./ui/Reveal";

const CARD_W = 254;
const CARD_GAP = 35;

const horses = [
  { name: "Chargano fly PS", ageType: "10 Years | Gelding", breed: "Breed: Holsteiner", image: "/assets/images/About/Webp/herd0.webp" },
  { name: "Maharaja", ageType: "9 Years | Gelding", breed: "Breed: Thoroughbred", image: "/assets/images/About/Webp/herd1.webp" },
  { name: "Arjuna", ageType: "9 Years | Gelding", breed: "Breed: Thoroughbred", image: "/assets/images/About/Webp/herd2.webp" },
  { name: "Gwen", ageType: "12 Years | Mare", breed: "Breed: Pony", image: "/assets/images/About/Webp/herd3.webp" },
  { name: "CHF Party Time", ageType: "8 Years | Gelding", breed: "Breed: Irish Sport Horse", image: "/assets/images/About/Webp/herd4.webp" },
  { name: "Dawn", ageType: "12 Years | Gelding", breed: "Breed: Arabian", image: "/assets/images/About/Webp/herd5.webp" },
  { name: "Vedette Van Splabeek Z", ageType: "10 Years | Gelding", breed: "Breed: Zangersheide", image: "/assets/images/About/Webp/herd6.webp" },
];

// Trailing empty slot so the last card never sits flush at the right edge
const TRAIL_PX = 80;

export default function AboutHerdSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const [scrollDist, setScrollDist] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !trackRef.current.parentElement) return;
      // Mobile gets a plain swipeable carousel instead of the pinned
      // scroll-jack animation — skip the scroll-distance math entirely.
      if (window.innerWidth < 768) {
        setScrollDist(0);
        return;
      }
      // Calculate how much the scrolling track overflows its container (the right side of the screen)
      const containerWidth = trackRef.current.parentElement.clientWidth;
      // We want the last horse to stop exactly at the center of the container.
      // The center of the last horse is (TRAIL_PX + CARD_W / 2) away from the right edge of the track.
      // To center it, we add the distance (containerWidth / 2) minus that offset.
      const extraScroll = (containerWidth / 2) - TRAIL_PX - (CARD_W / 2);
      const overflow = trackRef.current.scrollWidth - containerWidth + extraScroll;
      setScrollDist(Math.max(0, overflow));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (window.innerWidth >= 768) {
      const idx = Math.min(horses.length - 1, Math.max(0, Math.round(latest * (horses.length - 1))));
      setActiveIndex(idx);
    }
  });

  // Translate track leftward as user scrolls down through the container
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDist]);

  return (
    /*
      Outer container is taller than the viewport by exactly scrollDist px.
      That extra height "buys" the scroll distance that powers the sticky animation.
    */
    <div
      ref={containerRef}
      style={{ height: scrollDist > 0 ? `calc(100dvh + ${scrollDist}px)` : "auto" }}
    >
      <section
        id="herd-section"
        className={`relative w-full bg-[#f2ebd9] overflow-hidden flex flex-col md:flex-row items-center max-md:!pt-4 max-md:!pb-4 ${
          scrollDist > 0 ? "sticky top-0 h-dvh" : ""
        }`}
        style={{ 
          paddingTop: "clamp(40px, 6vw, 96px)", 
          paddingBottom: "clamp(40px, 6vw, 96px)" 
        }}
      >
        {/* Grid Background Layer */}
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-300 herd-grid-layer"
          style={{
            backgroundImage: `url('/assets/images/Group.svg')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Header — left-aligned */}
        <div className="relative z-10 w-full md:w-1/3 xl:w-[40%] flex-shrink-0">
          <Reveal delay={0.1}>
            <div className="mb-10 max-md:mb-6 md:mb-0" style={{ paddingLeft: "clamp(24px, 11.4vw, 172px)", paddingRight: "clamp(24px, 4vw, 40px)" }}>
              <h2
                className="herd-heading-text font-normal leading-[1.1] text-[#85431e] mb-6 max-md:!text-[34px]"
                style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
              >
                Meet the Herd
              </h2>
              <p
                className="herd-body-text font-light text-[#85431e] leading-[1.25] max-md:!text-[15px] max-md:!leading-[1.5]"
                style={{ fontSize: "clamp(12px, 1.2vw, 18px)", maxWidth: "400px" }}
              >
                Every horse at Zippy Equestrian Center is well-cared for, regularly vetted, and matched to
                each rider&apos;s level by our instructors. Getting to know the horses is one
                of the best parts of riding here and it starts the moment you arrive.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Card Tracker & Scrolling track */}
        <div className="relative z-10 w-full md:w-2/3 xl:w-[60%] flex flex-col">
          {/* Card Tracker directly above image cards */}
          <div className="flex gap-3 items-center mb-4 md:mb-6 pl-6 md:pl-0">
            {horses.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setActiveIndex(i);
                  if (window.innerWidth < 768 && trackContainerRef.current) {
                    trackContainerRef.current.scrollTo({
                      left: i * (CARD_W + CARD_GAP),
                      behavior: 'smooth'
                    });
                  }
                }}
                aria-label={`Go to horse ${i + 1}`}
                className={`herd-tracker-dot w-3.5 h-3.5 p-0 cursor-pointer block transition-all duration-300 ${
                  i === activeIndex ? 'tracker-active bg-[#85431e]' : 'bg-transparent border border-[#85431e]'
                }`}
              />
            ))}
          </div>

          {/* Scrolling track */}
          <div
            ref={trackContainerRef}
            onScroll={(e) => {
              if (window.innerWidth < 768) {
                const scrollLeft = e.currentTarget.scrollLeft;
                const idx = Math.min(horses.length - 1, Math.max(0, Math.round(scrollLeft / (CARD_W + CARD_GAP))));
                setActiveIndex(idx);
              }
            }}
            className="w-full overflow-x-auto md:overflow-hidden pl-6 md:pl-0 snap-x snap-proximity md:snap-none no-scrollbar touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch]"
          >
            <motion.div
              ref={trackRef}
              className="flex"
              style={{
                x,
                gap: `${CARD_GAP}px`,
              }}
            >
              {horses.map((horse, i) => (
                <div key={i} className="flex-none snap-center md:snap-none select-none [-webkit-touch-callout:none]" style={{ width: `${CARD_W}px` }}>
                  {/* Card image — layer structure */}
                  <Reveal delay={0.05 * Math.min(i, 4)}>
                  <div
                    className="relative rounded-[6px] overflow-hidden hover:scale-[1.03] hover:-translate-y-[3px] transition-transform duration-[400ms] ease-out"
                    style={{ height: "330px" }}
                  >
                    <div className="absolute inset-0 overflow-hidden rounded-[6px]">
                      <Image loading="lazy" src={horse.image} alt={horse.name} fill draggable={false} sizes="254px" className="object-cover [-webkit-user-drag:none] pointer-events-none" />
                    </div>
                  </div>
                  </Reveal>

                  {/* Info below card */}
                  <Reveal delay={0.05 * Math.min(i, 4)}>
                  <div className="mt-[15px]">
                    <p className="herd-body-text text-[#85431e] font-normal leading-[1.25]" style={{ fontSize: "22px" }}>
                      {horse.name}
                    </p>
                    <p className="herd-body-text text-black font-light uppercase leading-[1.25] mt-1" style={{ fontSize: "13px" }}>
                      {horse.ageType}
                    </p>
                    <p className="herd-body-text text-black font-light leading-[1.25]" style={{ fontSize: "13px" }}>
                      {horse.breed}
                    </p>
                  </div>
                  </Reveal>
                </div>
              ))}
              {/* Trailing empty slot to prevent flex padding collapse and ensure proper scroll math */}
              <div className="flex-none" style={{ width: `${TRAIL_PX}px` }} />
            </motion.div>
          </div>
        </div>
       
      </section>
    </div>
  );
}
