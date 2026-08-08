"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function BeyondContactSection() {
  return (
    <section className="bg-[#F5F1E8] py-16 md:py-20 px-6 md:px-16">
      <Reveal>
        <p className="beyond-contact-text text-center text-[#85431E] text-2xl md:text-3xl font-light mb-10">
          Know more what Zippy has to offer
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row overflow-hidden rounded-xl shadow-sm">
        {/* Left: image */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[450px] shrink-0">
          <Image loading="eager" fetchPriority="low"
            src="/assets/images/BeyondRide/Webp/franchise.webp"
            alt="Know more about Zippy Equestrian Center"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right: CTA rows */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Top CTA */}
          <div className="flex-1 bg-[#1A1F3D] p-10 md:p-14 max-md:p-6 flex flex-col justify-between group cursor-pointer transition-colors hover:bg-[#161B35]">
            <h3 className="text-white text-lg md:text-xl font-normal uppercase  leading-snug mb-16 max-md:mb-8">
              FOR GENERAL ENQUIRIES
            </h3>
            <div className="flex items-center gap-3">
              <a href="tel:+919901794713" className="text-white font-light text-base md:text-lg">Give us a call</a>
              <svg className="w-6 h-6 text-white font-light group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex-1 bg-[#5A74A8] p-10 md:p-14 max-md:p-6 flex flex-col justify-between group cursor-pointer transition-colors hover:bg-[#4E6593]">
            <h3 className="text-white text-lg md:text-xl font-normal uppercase  leading-snug mb-16 max-md:mb-8">
              FOR FRANCHISE/<br />COLLABORATIONS
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-white font-light text-base md:text-lg">Book a meeting</span>
              <svg className="w-6 h-6 text-white font-light group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
        </div>
      </Reveal>
    </section>
  );
}
