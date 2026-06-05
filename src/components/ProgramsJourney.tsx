"use client";

import { useState } from "react";
import Image from "next/image";

const journeyItems = [
  {
    id: 0,
    title: "Never ridden before?",
    description: (
      <>
        Start with the <span className="text-[#DA7347]">Trial Ride</span>. One
        session, no commitment.
      </>
    ),
    image: "/assets/images/pic2.jpg",
  },
  {
    id: 1,
    title: "Ridden before, but want to improve?",
    description: (
      <>
        The <span className="text-[#DA7347]">Beginners Program</span> is built
        for you.
      </>
    ),
    image: "/assets/images/pic3.jpg",
  },
  {
    id: 2,
    title: "Already riding and want to push further?",
    description:
      "Join our intermediate programs designed to refine your technique and build confidence in the saddle.",
    image: "/assets/images/pic5.jpg",
  },
];

export default function ProgramsJourney() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-[#FFF8E5] py-20 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col">
            <h2 className="text-5xl md:text-[65px] font-ultra leading-[1.1] tracking-tight mb-16">
              <span className="text-[#85431E]">Find your place</span>
              <br />
              <span className="text-[#DA7347]">in the saddle:</span>
            </h2>

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
                      <span className="text-lg md:text-[22px] font-sans text-[#1A1A1A] font-medium transition-colors">
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
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative w-full aspect-[4/3] lg:aspect-[1.2/1] overflow-hidden rounded-sm">
            {journeyItems.map((item, index) => (
              <Image
                key={item.id}
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover transition-opacity duration-700 ease-in-out ${
                  activeIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
