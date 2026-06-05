"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    section: "START HERE",
    title: "Trial Ride",
    description: "Never been on a horse? This is how you start. One 30-minute session. Guided, safe, and genuinely fun.",
    image: "/assets/images/pic1.jpg",
    bgColor: "#DA7347", // Orange
    buttonText: "Book a Trial"
  },
  {
    id: 2,
    section: "FOR BEGINNERS",
    title: "Foundation Program",
    description: "Build strong riding fundamentals from posture and balance to walk, trot, and canter. Learn how to understand and work with your horse, both in and out of the saddle.",
    image: "/assets/images/pic2.jpg",
    bgColor: "#526FAE", // Dark Blue
    buttonText: "Book a Trial"
  },
  {
    id: 3,
    section: "ALREADY RIDING?",
    title: "Development • Performance • Dressage • Showjumping",
    description: "Move beyond the basics with structured training that builds control, balance, and discipline-specific skills. Progress from refinement to performance, with a clear path towards competitive riding.",
    image: "/assets/images/pic3.jpg",
    bgColor: "#1C2245", // Light Blue
    buttonText: "See all Programs"
  }
];

const ScrollCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const totalScrollable = height - viewportHeight;
      const currentScroll = -top;

      const progress = Math.max(0, Math.min(100, (currentScroll / totalScrollable) * 100));
      const index = Math.min(slides.length - 1, Math.floor(progress / (100 / slides.length)));
      setActiveIndex(index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-[#FFF8E5]">
      <div className="sticky top-0 h-screen w-full flex flex-col">

        {/* Intro Section */}
        <div className="pt-32 md:pt-40 pb-12 px-6 text-center bg-[#FFF8E5]">
          <span className="text-sm md:text-md uppercase tracking-[0.3em] text-[#DA7347] font-medium mb-4 block">
            RIDE WITH US
          </span>
          <h2 className="text-4xl md:text-6xl font-normal text-[#85431E] mb-6 tracking-tight">
            Find Your Starting Point
          </h2>
          <p className="text-sm md:text-md text-[#85431E]/80 max-w-3xl mx-auto leading-relaxed font-light">
            We have programs for every level from your very first time in a saddle to riders who want to push
            further. New here? Start with a Trial Ride and we&apos;ll point you in the right direction.
          </p>
        </div>

        {/* Carousel Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">

          {/* Left Side: Content */}
          <div
            className="w-full md:w-[60%] flex flex-col justify-center px-8 md:px-24 py-12 md:py-0 transition-colors duration-700 relative"
            style={{ backgroundColor: slides[activeIndex].bgColor }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 px-8 md:px-24 py-12 md:py-0 flex flex-col justify-center transition-all duration-700 ${index === activeIndex
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
              >
                <span className="text-xs md:text-sm uppercase tracking-[0.3em] font-normal text-[#F2EBD9]/80 mb-4">
                  {slide.section}
                </span>
                <h3 className="text-2xl md:text-5xl font-normal text-[#F2EBD9] mb-8 tracking-tight">
                  {slide.title}
                </h3>
                <p className="text-md md:text-lg font-extralight text-[#F2EBD9]/90 max-w-2xl mb-12">
                  {slide.description}
                </p>

                <div className="flex flex-col items-start gap-12">
                  <button className="group flex items-center gap-4 px-8 py-3 border border-white/60 rounded-sm hover:bg-white hover:text-[#DA7347] transition-all duration-500 text-white">
                    <span className="text-sm font-light uppercase tracking-widest">{slide.buttonText}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="transition-transform duration-500 group-hover:translate-x-2"
                    >
                      <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Indicators - Square Blocks */}
                  <div className="flex gap-3">
                    {slides.map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 transition-all duration-500 ${i === activeIndex ? 'bg-white/40' : 'border border-white/40'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Image */}
          <div className="hidden md:block w-[45%] h-full relative overflow-hidden bg-black/5">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Mobile Image (shown only on mobile, placed between content and intro) */}
          <div className="md:hidden w-full aspect-video relative">
            <Image
              src={slides[activeIndex].image}
              alt={slides[activeIndex].title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScrollCarousel;

