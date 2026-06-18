"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const journeyItems = [
  {
    id: 0,
    title: "Never ridden before?",
    renderDescription: (scrollToCard: (index: number) => void) => (
      <>
        Start with the <button onClick={(e) => { e.stopPropagation(); scrollToCard(0); }} className="text-[#DA7347] font-medium hover:underline focus:outline-none">Trial Ride</button>. One
        session, no commitment.
      </>
    ),
    image: "/assets/images/program-img.svg",
  },
  {
    id: 1,
    title: "Ridden before, but want to improve?",
    renderDescription: (scrollToCard: (index: number) => void) => (
      <>
        The <button onClick={(e) => { e.stopPropagation(); scrollToCard(1); }} className="text-[#DA7347] font-medium hover:underline focus:outline-none">Beginners Program</button> is built
        for you.
      </>
    ),
    image: "/assets/images/program-img.svg",
  },
  {
    id: 2,
    title: "Already riding and want to push further?",
    renderDescription: (scrollToCard: (index: number) => void) => (
      <>
        Join our <button onClick={(e) => { e.stopPropagation(); scrollToCard(2); }} className="text-[#DA7347] font-medium hover:underline focus:outline-none">Intermediate Programs</button> designed to refine your technique and build confidence in the saddle.
      </>
    ),
    image: "/assets/images/program-img.svg",
  },
];

export default function ProgramsJourney() {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToCard = (index: number) => {
    const section = document.getElementById("programs-cards");
    if (section) {
      const rect = section.getBoundingClientRect();
      const absoluteTop = window.scrollY + rect.top;
      
      const scrollableDistance = window.innerHeight * 2; // 200vh since total is 300vh and sticky takes 100vh
      const targetScroll = absoluteTop + (index / 6) * scrollableDistance;
      
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="bg-[#FFF8E5] py-20 md:py-32">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start pt-8 lg:pt-12">
          {/* Left Column - Content */}
          <div className="flex flex-col">
            <Reveal>
              <h2 className="text-5xl md:text-[65px] leading-[1.1] tracking-tight mb-16">
                <span className="text-[#85431E]">Find your place</span>
                <br />
                <span className="text-[#DA7347]">in the saddle:</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col w-full border-t border-[#85431E]/20">
              {journeyItems.map((item, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={item.id}
                    className="border-b border-[#85431E]/20 flex flex-col"
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <button
                      onClick={() => setActiveIndex(index)}
                      className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                    >
                      <span className="text-lg md:text-[18px] font-sans text-[#1A1A1A] font-medium transition-colors">
                        {item.title}
                      </span>
                      <span className="ml-4 flex-shrink-0 text-[#1A1A1A] transition-transform duration-300">
                        {isActive ? (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 7l10 10" />
                            <path d="M17 7v10H7" />
                          </svg>
                        ) : (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                          </svg>
                        )}
                      </span>
                    </button>

                    <div
                      className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-6 text-[#1A1A1A]/80 text-base md:text-lg leading-relaxed pr-8">
                          {item.renderDescription(scrollToCard)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            </Reveal>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[1.2/1] overflow-hidden rounded-sm">
            <Reveal delay={0.3} className="w-full h-full">
              <div className="w-full h-full relative">
                <Image
                  src="/assets/images/program-img.svg"
                  alt="Program level"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
