"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from './ui/Reveal';
import HoverImage from './ui/HoverImage';

const slides = [
  {
    id: 1,
    section: "START HERE",
    title: "Trial Ride",
    description: "Never been on a horse? This is how you start. One 30-minute session. Guided, safe, and genuinely fun.",
    image: "/assets/images/HomePage/Webp/ridewithus1.webp",
    objectPosition: "50% 30%",
    bgColor: "#DA7347", // Orange
    buttonText: "Book a Trial",
    link: "/programs#programs-cards"
  },
  {
    id: 2,
    section: "FOR BEGINNERS",
    title: "Foundation Program",
    description: "Build strong riding fundamentals from posture and balance to walk, trot, and canter. Learn how to understand and work with your horse, both in and out of the saddle.",
    image: "/assets/images/HomePage/Webp/ridewithus2.webp",
    objectPosition: "30% 70%",
    scale: 1.30,
    bgColor: "#526FAE", // Dark Blue
    buttonText: "Book a Trial",
    link: "/programs#foundation"
  },
  {
    id: 3,
    section: "ALREADY RIDING?",
    title: "Development • Performance • Dressage • Showjumping",
    description: "Move beyond the basics with structured training that builds control, balance, and discipline-specific skills. Progress from refinement to performance, with a clear path towards competitive riding.",
    image: "/assets/images/HomePage/Webp/ridewithus3.webp",
    objectPosition: "50% 40%",
    scale: 1.32,
    bgColor: "#1C2245", // Light Blue
    buttonText: "See all Programs",
    link: "/programs#performance"
  }
];

const ScrollCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const { top, height } = containerRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          const totalScrollable = height - viewportHeight;
          if (totalScrollable > 0) {
            const currentScroll = -top;
            const progress = Math.max(0, Math.min(100, (currentScroll / totalScrollable) * 100));
            const index = Math.min(slides.length - 1, Math.floor(progress / (100 / slides.length)));
            setActiveIndex(index);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startAutoChange = () => {
      if (window.innerWidth < 768) {
        interval = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 3000);
      }
    };

    startAutoChange();

    const handleResize = () => {
      clearInterval(interval);
      startAutoChange();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[100dvh] md:h-[300vh] w-full bg-[#FFF8E5]">
      <div className="sticky top-0 h-screen w-full flex flex-col pb-6 md:pb-12">

        {/* Intro Section */}
        <Reveal>
          <div className="pt-20 md:pt-28 pb-8 px-6 text-center bg-[#FFF8E5]">
            <span className="text-sm md:text-lg uppercase  text-[#DA7347] font-medium mb-4 block">
              RIDE WITH US
            </span>
            <h2 className="text-4xl md:text-6xl font-normal text-[#85431E] mb-6 tracking-tight">
              Find Your Starting Point
            </h2>
            <p className="text-sm md:text-[18px] pb-5 text-[#85431E]/80 max-w-3xl mx-auto leading-relaxed font-light">
              We have programs for every level from your very first time in a saddle to riders who want to push
              further. New here? Start with a Trial Ride and we&apos;ll point you in the right direction.
            </p>
          </div>
        </Reveal>

        {/* Carousel Content */}
        <div className="flex-1 flex flex-col md:justify-center overflow-hidden w-full relative">

          <div
            className="w-full flex-1 md:flex-none flex flex-col md:flex-row transition-colors duration-700 relative"
            style={{ backgroundColor: slides[activeIndex].bgColor }}
          >
            {/* Left Side: Content */}
            <div className="w-full flex-1 md:flex-none md:w-[60%] md:h-full relative z-10">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 pl-6 pr-6 md:pl-6 lg:pl-24 md:pr-12 py-12 flex flex-col justify-center transition-all duration-700 ${index === activeIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 pointer-events-none'
                    }`}
                >
                  <div className="h-[20px] md:h-[24px] mb-2 md:mb-4">
                    <span className="text-xs md:text-sm uppercase  font-normal text-[#F2EBD9]/80">
                      {slide.section}
                    </span>
                  </div>
                  <div className="h-[70px] md:h-[80px] lg:h-[90px] mb-2 md:mb-4">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#F2EBD9] tracking-tight leading-snug">
                      {slide.title}
                    </h3>
                  </div>
                  <div className="h-[140px] md:h-[80px] lg:h-[96px] mb-6 md:mb-3 flex-shrink-0">
                    <p className="text-[15px] md:text-base font-extralight text-[#F2EBD9]/90 max-w-2xl leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-6 md:gap-8">
                    <Link
                      href={slide.link}
                      className="group flex items-center gap-4 px-8 py-3 border border-white/60 rounded-sm hover:bg-white hover:text-[#DA7347] transition-all duration-500 text-white"
                    >
                      <span className="text-sm font-light ">{slide.buttonText}</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="transition-transform duration-500 group-hover:translate-x-2"
                      >
                        <path d="M4 10H16M16 10L10 4M16 10L10 16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>

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
            <div className="hidden md:block w-[40%] relative z-10 overflow-visible">
              {/* Invisible spacer to dictate container height proportionally to image aspect ratio */}
              <Image loading="lazy"
                src="/assets/images/r2.webp"
                alt="spacer"
                width={744}
                height={497}
                className="w-full h-auto invisible"
              />
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === activeIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <HoverImage className="w-full h-full">
                    <Image loading="lazy"
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="40vw"
                      quality={100}
                      className="object-cover"
                      style={{
                        objectPosition: slide.objectPosition,
                        ...(slide.scale && {
                          transform: `scale(${slide.scale})`,
                          transformOrigin: slide.objectPosition
                        })
                      }}
                    />
                  </HoverImage>
                </div>
              ))}
            </div>

            {/* Mobile Image (shown only on mobile, placed between content and intro) */}
            <div className="md:hidden w-full aspect-video relative">
              <HoverImage className="w-full h-full">
                <Image loading="lazy"
                  src={slides[activeIndex].image}
                  alt={slides[activeIndex].title}
                  fill
                  sizes="100vw"
                  quality={100}
                  className="object-cover"
                  style={{
                    objectPosition: slides[activeIndex].objectPosition,
                    ...(slides[activeIndex].scale && {
                      transform: `scale(${slides[activeIndex].scale})`,
                      transformOrigin: slides[activeIndex].objectPosition
                    })
                  }}
                />
              </HoverImage>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollCarousel;

