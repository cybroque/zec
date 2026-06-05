"use client";

import React, { useState, useEffect, useRef } from 'react';

const StatItem = ({ number, label }: { number: string, label: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  const targetNumber = parseInt(number.replace(/\D/g, ''));
  const suffix = number.replace(/[0-9]/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000;
    const increment = targetNumber / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        setCount(targetNumber);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, targetNumber]);

  return (
    <div ref={itemRef} className="flex flex-col items-center text-center group">
      <span className="text-5xl md:text-7xl font-light text-[#DA7347] mb-6 transition-transform duration-500 group-hover:scale-105">
        {count}{suffix}
      </span>
      <span className="text-[12px] md:text-lg text-[#DA7347] leading-[1.6] whitespace-pre-line font-light">
        {label}
      </span>
    </div>
  );
};

const AboutSection = () => {
  const stats = [
    { number: "5+", label: "Years of riding in\nBangalore" },
    { number: "250+", label: "Riders trained and\ncounting" },
    { number: "45", label: "Horses at the\ncenter" },
    { number: "6", label: "Structured riding\nprograms" },
  ];

  return (
    <section className="bg-[#FFF8E5] py-20 md:py-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-24 md:mb-48">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-start">
          {/* Left Column */}
          <div className="flex flex-col items-start max-w-xl">
            <span className="text-[15px] md:text-2xl uppercase  text-[#DA7347] font-normal mb-8">
              WELCOME TO ZEC
            </span>
            <h2 className="text-5xl md:text-[75px] font-normal text-[#85431E] leading-[1.2] mb-12 tracking-[-0.03em]">
              Horses, People<br />
              Good Time
            </h2>
            <button className="group flex items-center gap-8 px-8 py-5 border border-[#DA7347]/40 rounded-sm hover:bg-[#DA7347] hover:text-[#FFF8E5] transition-all duration-500 shadow-sm">
              <span className="text-lg font-light text-[#DA7347] transition-colors group-hover:text-inherit">Read our story</span>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-500 group-hover:translate-x-2 text-[#DA7347] group-hover:text-inherit"
              >
                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10 text-[#85431E]/80 max-w-2xl">
            <p className="text-md md:text-md font-light tracking-tight">
              Zippy Equestrian Center is Bangalore&apos;s riding center built for people who are
              curious about horses. Located in JP Nagar, right in the heart of the city, we&apos;ve
              been putting first-timers, families and serious riders on horseback ever since
              we opened our gates.
            </p>
            <p className="text-md md:text-lg font-light tracking-tight">
              Whether you&apos;re booking a single trial session to tick something off your list, or
              you&apos;re looking to ride every week and actually get good at it, you&apos;ve come to
              the right place. Everyone starts somewhere and most of our riders started
              exactly where you are now.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
