"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const [scrollDist, setScrollDist] = useState(0);

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
        className={`w-full bg-[#FFF8E5] overflow-hidden flex flex-col md:flex-row items-center max-md:!pt-8 max-md:!pb-8 ${
          scrollDist > 0 ? "sticky top-0 h-dvh" : ""
        }`}
        style={{ paddingTop: "clamp(48px, 8vw, 120px)", paddingBottom: "clamp(48px, 8vw, 120px)" }}
      >
        {/* Header — left-aligned */}
        <div className="w-full md:w-1/3 xl:w-[40%] flex-shrink-0 z-10">
          <Reveal delay={0.1}>
            <div className="mb-10 max-md:mb-6 md:mb-0" style={{ paddingLeft: "clamp(24px, 11.4vw, 172px)", paddingRight: "clamp(24px, 4vw, 40px)" }}>
              <h2
                className="font-normal leading-[1.1] text-[#85431e] mb-6 max-md:!text-[34px]"
                style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
              >
                Meet the Herd
              </h2>
              <p
                className="font-light text-[#85431e] leading-[1.25] max-md:!text-[15px] max-md:!leading-[1.5]"
                style={{ fontSize: "clamp(12px, 1.2vw, 18px)", maxWidth: "400px" }}
              >
                Every horse at Zippy Equestrian Center is well-cared for, regularly vetted, and matched to
                each rider&apos;s level by our instructors. Getting to know the horses is one
                of the best parts of riding here and it starts the moment you arrive.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Scrolling track */}
        <div className="w-full md:w-2/3 xl:w-[60%] overflow-x-auto md:overflow-hidden pl-6 md:pl-0 snap-x snap-proximity md:snap-none no-scrollbar touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch]">
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
                {/* Card image —  layer structure */}
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
                  <p className="text-[#85431e] font-normal leading-[1.25]" style={{ fontSize: "22px" }}>
                    {horse.name}
                  </p>
                  <p className="text-black font-light uppercase leading-[1.25] mt-1" style={{ fontSize: "13px" }}>
                    {horse.ageType}
                  </p>
                  <p className="text-black font-light leading-[1.25]" style={{ fontSize: "13px" }}>
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
       
      </section>
    </div>
  );
}
