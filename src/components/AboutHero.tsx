"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] flex items-center overflow-hidden bg-[#9eb9da] pb-24 max-md:pb-16">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/assets/images/About/Webp/hero.webp"
          alt="Woman in riding gear"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[80%_20%] max-md:object-[50%_20%]"
        />
      </div>

      {/* Figma Linear Overlay */}
      <div
        aria-hidden
        className="absolute inset-0 w-full h-full z-[1] bg-[linear-gradient(to_right,rgba(28,34,69,0.5)_20%,rgba(255,248,229,0)_95%)]"
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-32 max-md:pt-20">
        <div className="w-full max-w-[100%] lg:max-w-[1000px] mt-10 md:mt-20">
          <Reveal>
            <h1 className="text-[32px] sm:text-[40px] md:text-[44px] lg:text-[54px] leading-[1.1] tracking-tight text-[#FBEECC] mb-8 drop-shadow-sm md:whitespace-nowrap">
              It Started as a Bucket List.<br />
              It Became a Riding Center.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[15px] md:text-[17px] text-[#FBEECC] leading-[1.6] max-w-3xl font-medium opacity-95">
              Zippy Equestrian Center is Bangalore's home for horse riding, a place built from scratch by someone who felt exactly the way most of our students feel on day one: curious, slightly nervous, and not entirely sure what they were getting into.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

