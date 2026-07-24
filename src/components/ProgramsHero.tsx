"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Reveal from "@/components/ui/Reveal";
import { useLoading } from "@/lib/LoadingContext";

export default function ProgramsHero() {
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
  }, [startLoading]);

  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/pro-hero.svg"
          alt="Horse and rider"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          onLoad={stopLoading}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-32 md:pb-68 h-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-top">
          {/* Left Heading */}
          <div className="md:col-span-7 lg:col-span-7 pb-4">
            <Reveal>
              <h1 className="text-[#FBEECC] text-[30px] md:text-[45px] lg:text-[55px] leading-[1.05] tracking-medium mb-4 md:mb-0 lg:pt-4">
                Your equestrian<br />
                journey starts here.
              </h1>
            </Reveal>
          </div>

          {/* Right Description */}
          <div className="md:col-span-5 lg:col-span-9 lg:col-start-9">
            <Reveal delay={0.2}>
              <p className="text-[#FFF8E5] max-w-6xl text-sm md:text-[15px] font-sans leading-relaxed">
                At Zippy, our programs are designed to guide riders through a structured journey from their very first interaction with a horse to competing at national and international levels. Every program is 45 mins a session and built around real skill development at a pace that works for you.</p>
              <p className="text-[#FFF8E5] max-w-6xl text-sm md:text-[15px] font-sans leading-relaxed lg:pt-4">Not sure which one to pick? Start with the <Link href="#programs-cards" className="text-[#DA7347]">Discovery Ride</Link>, our instructors will guide you from there.</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

