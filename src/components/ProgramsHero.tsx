"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function ProgramsHero() {
  return (
    <section id="page-hero-section" className="relative w-full h-[100svh] min-h-[700px] max-md:min-h-[620px] flex items-center overflow-hidden bg-[#242A59]">
      <div className="absolute inset-0 z-0">
        <picture className="absolute inset-0 w-full h-full">
          <source
            media="(max-width: 767px)"
            srcSet="/assets/images/Programs/Webp/Hero.webp"
          />
          <Image
            src="/assets/images/Programs/Webp/Hero.webp"
            alt="Horse and rider"
            fill
            priority
            sizes="100vw"
            className="object-cover max-md:object-[34%_50%] md:scale-[1.6] md:origin-[10%_15%]"
          />
        </picture>
      </div>

      {/* Bottom scrim — the mobile copy sits over bright sand, so this
          carries legibility (stronger on mobile). Same pattern as BeyondHero. */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-black/30 to-transparent max-md:from-black/85 max-md:via-black/50"
      />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-32 md:pb-68 max-md:pb-44 max-md:pt-28 h-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-top">
          {/* Left Heading */}
          <div className="md:col-span-7 lg:col-span-7 pb-4">
            <Reveal>
              <h1 className="text-[#FBEECC] text-[30px] md:text-[45px] lg:text-[55px] leading-[1.05] mb-4 md:mb-0 lg:pt-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                Your equestrian<br />
                journey starts here.
              </h1>
            </Reveal>
          </div>

          {/* Right Description */}
          <div className="md:col-span-5 lg:col-span-9 lg:col-start-9">
            <Reveal delay={0.1}>
              <p className="text-[#FFF8E5] max-w-6xl text-sm md:text-[15px] font-sans leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
                At Zippy, our programs are designed to guide riders through a structured journey from their very first interaction with a horse to competing at national and international levels. Every program is 45 mins a session and built around real skill development at a pace that works for you.</p>
              <p className="text-[#FFF8E5] max-w-6xl text-sm md:text-[15px] font-sans leading-relaxed lg:pt-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">Not sure which one to pick? Start with the <Link href="#programs-cards" className="text-[#DA7347]">Discovery Ride</Link>, our instructors will guide you from there.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

