"use client";

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer 
      className="relative w-full px-6 pt-48 pb-8 md:pt-64 md:pb-10"
      style={{
        background: 'linear-gradient(to bottom, #FFF8E5 0%, #D27C55 150px, #D27C55 100%)'
      }}
    >
      <div className="container mx-auto max-w-7xl">
          
          {/* Main Grid: Left for Logos, Right for Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-stretch mb-16 md:mb-20">
            
            {/* Left Column: Logos */}
            <div className="md:col-span-5 flex flex-col items-center md:items-start justify-between h-full">
              {/* Horse Rider Logo */}
              <div 
                className="relative w-56 h-56 md:w-[300px] md:h-[300px] bg-[#7A4027]"
                style={{
                  maskImage: 'url(/assets/images/zippyfooter1.svg)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: 'url(/assets/images/zippyfooter1.svg)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center'
                }}
              />

              {/* Zippy Equestrian Center */}
              <div 
                className="relative w-48 h-16 md:w-[240px] md:h-[68px] bg-[#7A4027] mt-16 md:mt-0"
                style={{
                  maskImage: 'url(/assets/images/zippyfooter2.svg)',
                  maskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskImage: 'url(/assets/images/zippyfooter2.svg)',
                  WebkitMaskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center'
                }}
              />
            </div>

            {/* Right Column: CTA and Links */}
            <div className="md:col-span-7 flex flex-col justify-between h-full">
              
              {/* Top CTA Section */}
              <div className="text-[#F2EBD9] text-center md:text-left mb-20 md:mb-24">
                <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.15] mb-6 tracking-tight max-w-lg mx-auto md:mx-0">
                  The rider in you is<br />just a ride away.
                </h2>
                <p className="text-base md:text-lg opacity-90 mb-10 max-w-md mx-auto md:mx-0 font-light leading-relaxed">
                  Your first ride is 30 minutes away. Call us<br />and let&apos;s get you started.
                </p>
                <button className="group flex items-center justify-center md:justify-start gap-4 px-8 py-4 border border-[#F2EBD9] rounded hover:bg-[#F2EBD9] hover:text-[#D27C55] transition-all duration-300 mx-auto md:mx-0 w-fit">
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
                </button>
              </div>

              {/* Bottom Links Section */}
              <div className="grid grid-cols-2 gap-x-10 md:gap-x-20 gap-y-5 max-w-lg mx-auto md:mx-0 text-[#F2EBD9] md:pb-4">
                <Link href="/" className="text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline decoration-[#F2EBD9]/60 underline-offset-4">Zippy Home</Link>
                <Link href="/about" className="text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline decoration-[#F2EBD9]/60 underline-offset-4">About ZEC</Link>
                <Link href="/programs" className="text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline decoration-[#F2EBD9]/60 underline-offset-4">Riding programs</Link>
                <Link href="/contact" className="text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline decoration-[#F2EBD9]/60 underline-offset-4">Contact Zippy</Link>
                <Link href="/beyond" className="text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline decoration-[#F2EBD9]/60 underline-offset-4">Beyond the ride</Link>
                <Link href="/stories" className="text-sm md:text-[15px] font-light hover:opacity-80 transition-opacity underline decoration-[#F2EBD9]/60 underline-offset-4">Rider Stories</Link>
              </div>
            </div>
          </div>

          {/* Copyright Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#7A4027] text-xs font-medium tracking-wide">
            <p>© 2026 Zippy Equestrian Pvt Ltd.</p>
            <p className="text-center md:text-right">All Rights Reserved. ZEC and Zippy is a registered trademark of Zippy Equestrian Pvt Ltd.</p>
          </div>

        </div>
    </footer>
  );
};

export default Footer;
