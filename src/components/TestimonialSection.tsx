import React from 'react';
import Image from 'next/image';

const TestimonialSection = () => {
  return (
    <section className="bg-[#FFF8E5] py-24 md:py-40 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">

          {/* Left Column: Heading */}
          <div className="flex flex-col">
            <h2 className="text-5xl md:text-[85px] font-light leading-[1.1] text-[#85431E] mb-12 tracking-tight">
              Words from<br />
              the <span className="text-[#DA7347]">horseback</span>
            </h2>
            <p className="text-sm md:text-[13px] text-[#85431E]/60 max-w-md leading-relaxed tracking-wider font-medium">
              Every rider at ZEC started exactly the same way: curious, a little nervous, and wondering if this was really for them. Here&apos;s what happened next.
            </p>
          </div>

          {/* Right Column: Testimonial */}
          <div className="relative pt-12">
            <div className="absolute top-0 left-0 -translate-x-8 -translate-y-4">
              <div className="relative w-16 h-12 opacity-80">
                <Image
                  src="/assets/images/quotationmark.png"
                  alt="Quotation Mark"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <blockquote className="text-2xl md:text-[42px] font-light leading-[1.3] text-[#4A2D1B] mb-12 tracking-tight">
                I booked a trial session thinking I&apos;d do it once. That was eight months ago. I&apos;m now in the Intermediate program and I can&apos;t imagine my weekends without it.
              </blockquote>

              <div className="flex flex-wrap items-center gap-x-2 text-md md:text-lg">
                <span className="font-bold text-[#1A1A1A]">Priya S</span>
                <span className="text-[#1A1A1A]/40">·</span>
                <span className="text-[#DA7347] font-medium">Bangalore</span>
                <span className="text-[#1A1A1A]/40">·</span>
                <span className="text-[#DA7347] font-light opacity-80">Started as a complete beginner</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
