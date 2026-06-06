"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const CARD_W = 254;
const CARD_GAP = 35;

const horses = [
  { name: "Vibranto", ageType: "12 Years | Mare",     breed: "Breed: Marwari",     image: "/assets/images/pic1.jpg" },
  { name: "Vibranto", ageType: "12 Years | Stallion", breed: "Breed: Thoroughbred", image: "/assets/images/pic2.jpg" },
  { name: "Vibranto", ageType: "12 Years | Gelding",  breed: "Breed: Arabian",      image: "/assets/images/pic3.jpg" },
  { name: "Vibranto", ageType: "12 Years | Mare",     breed: "Breed: Warm Blood",   image: "/assets/images/pic4.jpg" },
  { name: "Vibranto", ageType: "12 Years | Mare",     breed: "Breed: Marwari",      image: "/assets/images/pic5.jpg" },
];

// Trailing empty slot so the last card never sits flush at the right edge
const TRAIL_PX = 80;

export default function AboutHerdSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const [scrollDist, setScrollDist] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      // How far the track overflows the viewport
      const overflow = trackRef.current.scrollWidth - window.innerWidth;
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
        className={`w-full bg-[#f2ebd9] overflow-hidden flex flex-col justify-center ${
          scrollDist > 0 ? "sticky top-0 h-dvh" : ""
        }`}
        style={{ paddingTop: "clamp(48px, 8vw, 120px)", paddingBottom: "clamp(48px, 8vw, 120px)" }}
      >
        {/* Header — left-aligned*/}
        <div className="mb-10" style={{ paddingLeft: "clamp(24px, 11.4vw, 172px)", paddingRight: "clamp(24px, 4vw, 80px)" }}>
          <h2
            className="font-normal leading-[1.1] text-[#85431e] mb-6"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
          >
            Meet the Herd
          </h2>
          <p
            className="font-light text-[#85431e] leading-[1.25]"
            style={{ fontSize: "clamp(12px, 1.2vw, 18px)", maxWidth: "764px" }}
          >
            Every horse at Zippy Equestrian Center is well cared for, regularly vetted, and matched to
            each rider&apos;s level by our instructors. Getting to know the horses is one of the best
            parts of riding here and it starts the moment you arrive.
          </p>
        </div>

        {/* Scrolling track */}
        <div className="overflow-hidden">
          <motion.div
            ref={trackRef}
            className="flex"
            style={{
              x,
              gap: `${CARD_GAP}px`,
              // Left padding  margin (172/1512)
              paddingLeft: "clamp(24px, 11.4vw, 172px)",
              paddingRight: `${TRAIL_PX}px`,
            }}
          >
            {horses.map((horse, i) => (
              <div key={i} className="flex-none" style={{ width: `${CARD_W}px` }}>
                {/* Card image —  layer structure */}
                <div
                  className="relative rounded-[6px] overflow-hidden"
                  style={{ height: "330px" }}
                >
                  <div className="absolute inset-0 opacity-80 overflow-hidden rounded-[6px]">
                    <Image src={horse.image} alt={horse.name} fill sizes="254px" className="object-cover" />
                  </div>
                  <div
                    className="absolute inset-0 rounded-[6px]"
                    style={{
                      backgroundImage:
                        "linear-gradient(214.8deg, rgba(133,67,30,0.8) 2.6%, rgba(218,115,71,0.8) 135%)",
                      mixBlendMode: "hard-light",
                    }}
                  />
                </div>

                {/* Info below card */}
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
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
