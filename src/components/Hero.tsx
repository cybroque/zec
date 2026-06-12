"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {


  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center text-center font-sans">
      {/* Video Background Placeholder */}
      <div className="absolute inset-0 z-0 bg-[#FFF8E5]">
        <Image 
          src="/assets/images/hero_main.png" 
          alt="Zippy Equestrian Hero" 
          fill
          unoptimized
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center">
        <h1 className="text-[#F2EBD9] text-4xl md:text-7xl font-normal tracking-tight mb-8 mt-12 animate-slide-up">
          Real Riding.<br className="md:hidden" /> Real Feeling.
        </h1>

        <p className="text-[#F2EBD9]/90 text-md md:text-lg max-w-2xl mb-7 font-light leading-relaxed animate-slide-up [animation-delay:200ms]">
          Bangalore&apos;s riding center for anyone who&apos;s ever been curious about horses.<br className="hidden md:block" />
          No experience needed. Just show up.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 animate-slide-up [animation-delay:400ms]">
          <button className="px-10 py-5 bg-[#DA7347] text-[#F2EBD9] font-normal text-sm tracking-[0.15em] rounded-sm hover:bg-white hover:text-zippy-orange transition-all duration-300 shadow-2xl">
            Book a trial ride
          </button>
          <Link href="/programs" className="px-10 py-5 bg-white/10 backdrop-blur-md border border-white/30 text-[#F2EBD9] font-normal text-sm tracking-[0.15em] rounded-sm hover:bg-white/20 transition-all duration-300">
            Explore Programs
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
