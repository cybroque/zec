"use client";

import React from 'react';
import Image from 'next/image';

const ZippyFamilySection = () => {
  return (
    <section className="bg-[#FFF8E5] py-16 md:py-24 px-6 border-t border-[#85431E]/5">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">

          {/* Left Column: Text */}
          <div className="flex flex-col text-center md:text-left">
            <h2 className="text-[36px] md:text-6xl font-light leading-[1.05] tracking-tight">
              <span className="text-[#85431E] block">Part of the</span>
              <span className="text-[#DA7347]">Zippy Family</span>
            </h2>
            {/* <p className="text-lg md:text-2xl text-[#85431E]/80 mt-3 font-medium tracking-tight">
              Wherever you&apos;re there&apos;s a Zippy
            </p> */}
          </div>

          {/* Right Column: Logos */}
          <div className="flex items-center gap-6 md:gap-12 pr-32">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <Image
                src="/assets/images/zippybroncos.svg"
                alt="Zippy Broncos Logo"
                fill
                sizes="160px"
                className="object-contain"
                loading="eager"
              />
            </div>

            <div className="h-12 md:h-30 w-[2px] bg-[#85431E]" aria-hidden="true" />

            <div className="relative w-34 h-34 md:w-52 md:h-52">
              <Image
                src="/assets/images/zippypremier.svg"
                alt="Zippy Premier Logo"
                fill
                sizes="(max-width: 768px) 112px, 240px"
                className="object-contain"
                loading="eager"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ZippyFamilySection;
