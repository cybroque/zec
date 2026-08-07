import React from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import Link from 'next/link';

const TestimonialSection = () => {
  return (
    <section className="bg-[#FFF8E5] py-24 md:py-40 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Left Column: Heading */}
          <div className="flex flex-col">
            <Reveal>
              <h2 className="text-5xl md:text-[85px] max-md:text-4xl font-light leading-[1.1] text-[#85431E] mb-10 tracking-tight">
                Words from<br />
                the <span className="text-[#DA7347]">horseback</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-sm md:text-[18px] text-[#85431E]/60 max-w-[900px] leading-normal font-medium">
                Every rider at ZEC started exactly the same way: curious, a little nervous, and wondering if this was really for them. Here&apos;s what happened next.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Testimonial */}
          <div className="relative pt-12 max-md:pt-6">
            <div className="absolute md:top-10 md:left-0 -md:translate-x-8 -md:translate-y-4 max-md:translate-x-0">
              <Reveal delay={0.12}>
                <div className="relative w-8 h-6 md:w-16 md:h-12 opacity-80">
                  <Image loading="lazy"
                    src="/assets/images/quotationmark.png"
                    alt="Quotation Mark"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col">
              <Reveal delay={0.15}>
                <Link
                  href="/stories"
                  className="block text-2xl pl-4 md:text-[34px] font-light leading-[1.3] text-[#4A2D1B] hover:text-[#DA7347] mb-12 tracking-tight transition-colors cursor-pointer"
                >
                  <blockquote>
                    I booked a trial session thinking I&apos;d do it once. That was eight months ago. I&apos;m now in the Intermediate program and I can&apos;t imagine my weekends without it.
                  </blockquote>
                </Link>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="flex flex-wrap items-center gap-x-2 text-md md:text-[20px]">
                  <span className="font-bold text-[#1A1A1A]">Priya S</span>
                  <span className="text-[#1A1A1A]/40">·</span>
                  <span className="text-[#DA7347] font-medium">Bangalore</span>
                  <span className="text-[#1A1A1A]/40">·</span>
                  <span className="text-[#DA7347] font-light opacity-80">Started as a complete beginner</span>
                </div>
              </Reveal>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
