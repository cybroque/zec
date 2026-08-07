"use client";

import React from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

const ZippyFamilySection = () => {
  return (
    <section className="bg-[#FFF8E5] py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">

          {/* Left Column: Text */}
          <Reveal>
            <div className="flex flex-col text-center md:text-left">
              <h2 className="text-[36px] md:text-6xl font-light leading-[1.05] tracking-tight">
                <span className="text-[#85431E] block">Part of the</span>
                <span className="text-[#DA7347]">Zippy Family</span>
              </h2>
            </div>
          </Reveal>
            {/* <p className="text-lg md:text-2xl text-[#85431E]/80 mt-3 font-medium tracking-tight">
              Wherever you&apos;re there&apos;s a Zippy
            </p> */}

          {/* Right Column: Logos */}
          <Reveal delay={0.2}>
            <div className="flex items-center gap-6 md:gap-12 pr-32 max-md:pr-0 max-md:gap-4">
              <a
                href="https://broncosequestrianclub.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-24 h-24 md:w-32 md:h-32 block hover:scale-105 transition-transform duration-300 max-sm:w-20 max-sm:h-20"
              >
                <Image loading="lazy"
                  src="/assets/images/zippybroncos.svg"
                  alt="Zippy Broncos Logo"
                  fill
                  sizes="160px"
                  className="object-contain"
                />
              </a>

              <div className="h-12 md:h-36 w-[2px] bg-[#85431E]" aria-hidden="true" />

              <div className="relative w-34 h-34 md:w-52 md:h-52 mt-2 hover:scale-105 transition-transform duration-300 max-sm:w-28 max-sm:h-28">
                <h1 className='uppercase text-[#641C17] text-md md:pl-10 md:pt-8 '>Coming Soon</h1>
                <Image loading="lazy"
                  src="/assets/images/zippypremier.svg"
                  alt="Zippy Premier Logo"
                  fill
                  sizes="(max-width: 768px) 112px, 240px"
                  className="object-contain"
                />
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default ZippyFamilySection;
