"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useInView, motion } from 'framer-motion';

const PaintingLogo = ({ src, className, delay = 0 }: { src: string; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const maskStyle = {
    maskImage: `url(${src})`,
    maskSize: 'contain',
    maskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskImage: `url(${src})`,
    WebkitMaskSize: 'contain',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Left-to-right reveal that also slides in from the left — matches the
          site loader's letters (power4.out feel, ~0.8s). */}
      <motion.div
        className="relative w-full h-full bg-[#7A4027]"
        style={maskStyle}
        initial={{ clipPath: 'inset(0 100% 0 0)', x: -28 }}
        animate={isInView
          ? { clipPath: 'inset(0 0% 0 0)', x: 0 }
          : { clipPath: 'inset(0 100% 0 0)', x: -28 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};

const Footer = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.5 }); // triggers when 50% in view

  useEffect(() => {
    if (isInView) {
      document.body.classList.add('footer-active');
    } else {
      document.body.classList.remove('footer-active');
    }
    
    // Cleanup
    return () => {
      document.body.classList.remove('footer-active');
    };
  }, [isInView]);

  const textColor = isInView ? "text-[#F2EBD9]" : "text-[#DA7347]";
  const borderColor = isInView ? "border-[#F2EBD9]" : "border-[#DA7347]";
  const buttonHover = isInView 
    ? "hover:bg-[#F2EBD9] hover:text-[#D27C55]" 
    : "hover:bg-[#DA7347] hover:text-[#FFF8E5]";
  const underlineColor = isInView ? "decoration-[#F2EBD9]/60" : "decoration-[#DA7347]/60";

  return (
    <footer
      ref={ref}
      className="relative w-full pt-48 pb-8 md:pt-64 md:pb-10 transition-colors duration-300 bg-[#FFF8E5]"
    >
      <div className="container mx-auto max-w-7xl px-4 md:px-16 lg:px-20">

        {/* Main Grid: Left for Logos, Right for Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 lg:gap-16 mb-24 md:mb-32 max-md:gap-10 max-md:mb-16">

          {/* Left Column: Logos */}
          <div className="flex flex-col justify-center h-full">
            {/* Horse Rider Logo — aligns with CTA section */}
            <div className="flex justify-start mb-16 md:mb-20 max-md:mb-10">
              <PaintingLogo src="/assets/images/zippyfooter1.svg" className="w-56 h-56 md:w-[280px] md:h-[280px] lg:w-[280px] lg:h-[280px]" />
            </div>
            {/* Zippy Equestrian Center — aligns with nav links */}
            <div className="flex items-start justify-start">
              <PaintingLogo
                src="/assets/images/zippyfooter2.svg"
                className="w-48 h-16 md:w-[240px] md:h-[68px] lg:w-[280px] lg:h-[80px]"
                delay={0.15}
              />
            </div>
          </div>

          {/* Right Column: CTA and Links */}
          <div className="flex flex-col justify-center h-full max-w-lg mx-auto md:mx-0 md:pl-8 lg:pl-16">

            {/* Top CTA Section */}
            <div className={`text-center md:text-left mb-16 md:mb-20 max-md:mb-10 ${textColor}`}>
              <h2 className="text-[40px] md:text-[48px] lg:text-[56px] font-medium leading-[1.15] mb-6 tracking-tight max-md:text-[32px] max-md:mb-4">
                The rider in you is<br />just a ride away.
              </h2>
              <p className="text-base md:text-lg opacity-90 mb-10 font-light leading-relaxed max-md:text-sm max-md:mb-6">
                Your first ride is 30 minutes away. Call us<br />and let&apos;s get you started.
              </p>
              <Link href="/contact" className={`group flex items-center justify-center md:justify-start gap-4 px-8 py-4 border rounded transition-all duration-300 mx-auto md:mx-0 w-fit ${borderColor} ${buttonHover}`}>
                <span className="text-lg font-light">Book your trial ride</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* Bottom Links Section */}
            <div className={`grid grid-cols-2 gap-x-10 md:gap-x-16 gap-y-5 ${textColor}`}>
              <Link href="/" className={`text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline underline-offset-4 ${underlineColor}`}>Zippy Home</Link>
              <Link href="/about" className={`text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline underline-offset-4 ${underlineColor}`}>About ZEC</Link>
              <Link href="/programs" className={`text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline underline-offset-4 ${underlineColor}`}>Riding programs</Link>
              <Link href="/contact" className={`text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline underline-offset-4 ${underlineColor}`}>Contact Zippy</Link>
              <Link href="/beyond" className={`text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline underline-offset-4 ${underlineColor}`}>Beyond the ride</Link>
              <Link href="/stories" className={`text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline underline-offset-4 ${underlineColor}`}>Rider Stories</Link>
            </div>

          </div>
        </div>

        {/* Copyright Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#7A4027] text-xs lg:text-sm font-medium ">
          <p>© 2026 Zippy Equestrian Pvt Ltd.</p>
          <p className="text-center md:text-right">All Rights Reserved. ZEC and Zippy is a registered trademark of Zippy Equestrian Pvt Ltd.</p>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;
