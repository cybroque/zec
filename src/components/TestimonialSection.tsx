"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "I booked a trial session thinking I'd do it once. That was eight months ago. I'm now in the Intermediate program and I can't imagine my weekends without it.",
    name: "Priya S",
    location: "Bangalore",
    level: "Started as a complete beginner"
  },
  {
    quote: "Being a part of Zippy has been one of the happiest experiences of my life. What I love most about Zippy is the warm, welcoming environment. Every visit feels special, and I always leave feeling more confident, responsible, and connected to the horses. I’m truly grateful to the trainers and team for making my riding journey so memorable.",
    name: "Anagha",
    location: "Bangalore",
    level: "Competitive Rider"
  },
  {
    quote: "There has always been something about horses and riding that I’ve loved. As a child, I would paint horses, though I never had the opportunity to ride. I finally started riding close to 40, but struggled physically and was almost ready to quit after a difficult experience elsewhere. Finding Zippy about a year ago changed that journey completely. I’ve grown in confidence, learned to understand and care for horses, and even competed in dressage.",
    name: "AV Aravindh",
    location: "Bangalore",
    level: "Dressage Rider"
  },
  {
    quote: "Learning to ride here has been an incredible journey. The instructors are supportive and motivating, helping riders progress at their own pace. The horses are well cared for, and the positive atmosphere makes every visit enjoyable. I look forward to every lesson and have gained both confidence and valuable riding skills.",
    name: "Shaurya Subramanian",
    location: "Bangalore",
    level: "Rider"
  },
  {
    quote: "I’ve been riding for a while now, and it has become my favourite place to spend my evening. It feels calm, friendly, and easygoing. It’s not just about riding; I enjoy hanging around after lessons, spending time with the horses, talking with other riders, and just being around the stable.",
    name: "Ira Singal",
    location: "Bangalore",
    level: "Rider"
  },
  {
    quote: "I love that it doesn’t feel like just another commitment, it’s a space where I can slow down, ride, spend time with the horses, and simply unwind. The atmosphere is relaxed and welcoming, and the trainers are supportive without making the experience feel overly serious.",
    name: "Salma Salim",
    location: "Bangalore",
    level: "Rider"
  }
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Shuffle every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="bg-[#FFF8E5] py-24 md:py-40 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">

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
          <div className="relative pt-12 max-md:pt-6 h-full flex flex-col justify-center min-h-[550px] md:min-h-[450px] lg:min-h-[380px]">
            <div className="absolute md:top-10 md:left-0 -md:translate-x-8 -md:translate-y-4 max-md:translate-x-0 z-0">
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

            <div className="flex flex-col relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    href="/stories"
                    className="block text-lg pl-4 md:text-2xl font-light leading-[1.4] md:leading-[1.4] text-[#4A2D1B] hover:text-[#DA7347] mb-8 md:mb-10 tracking-tight transition-colors cursor-pointer"
                  >
                    <blockquote>
                      {current.quote}
                    </blockquote>
                  </Link>

                  <div className="flex flex-wrap items-center gap-x-2 text-md md:text-[20px] pl-4">
                    <span className="font-bold text-[#1A1A1A]">{current.name}</span>
                    <span className="text-[#1A1A1A]/40">·</span>
                    <span className="text-[#DA7347] font-medium">{current.location}</span>
                    <span className="text-[#1A1A1A]/40">·</span>
                    <span className="text-[#DA7347] font-light opacity-80">{current.level}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
