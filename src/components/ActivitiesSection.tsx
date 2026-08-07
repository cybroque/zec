"use client";

import React from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import Link from 'next/link';

const ActivityCard = ({
  title,
  description,
  imageSrc,
  overlayColor,
  href
}: {
  title: string;
  description: string;
  imageSrc: string;
  overlayColor: string;
  href: string;
}) => {
  return (
    <Link href={href} className="relative group block overflow-hidden rounded-sm aspect-[423/556.5] w-[78vw] max-w-[320px] flex-shrink-0 snap-center md:w-full md:max-w-none md:flex-shrink md:snap-none cursor-pointer select-none [-webkit-touch-callout:none]">
      {/* Image */}
      <Image loading="lazy"
        src={imageSrc}
        alt={title}
        fill
        draggable={false}
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110 [-webkit-user-drag:none] pointer-events-none"
      />

      {/* Color Overlay */}
      <div
        className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-75"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white max-md:p-6">
        <h3 className="text-2xl md:text-[28px] font-light mb-2 leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-[13px] md:text-[15px] font-extralight opacity-90 max-w-[260px]">
          {description}
        </p>
      </div>
    </Link>
  );
};

const ActivitiesSection = () => {
  const activities = [
    {
      title: "Summer camps",
      description: "For kids who want more than a screen this summer.",
      imageSrc: "/assets/images/HomePage/Webp/summercamp.webp",
      overlayColor: "rgba(135, 28, 7, 0.90)", // #d67a5b with alpha
      href: "/beyond#summer-camps"
    },
    {
      title: "Parties and Venues",
      description: "Host your next get-together at the stables.",
      imageSrc: "/assets/images/HomePage/Webp/party.webp",
      overlayColor: "#2658C4", // #2e58b9 with alpha
      href: "/beyond#summer-camps"
    },
    {
      title: "Photoshoots",
      description: "The most beautiful backdrop in South Bangalore.",
      imageSrc: "/assets/images/HomePage/Webp/photoshoot.webp",
      overlayColor: "#DA7347", // #85431E with alpha
      href: "/beyond#summer-camps"
    }
  ];

  return (
    <section className="bg-[#FFF8E5] py-16 md:py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-12 md:mb-16">
          <Reveal>
            <h2 className="text-[42px] md:text-[54px] font-normal text-[#DA7347] mb-8 leading-[1.1] tracking-tight">
              For All Seasons & All Reasons
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-md md:text-md text-[#1a1a1a] max-w-3xl mx-auto leading-[1.6] font-normal opacity-90 px-4">
              ZEC is more than a riding school. From summer camps for kids to corporate experiences,
              photoshoots, and venue hire there&apos;s always something on at the stables.
            </p>
          </Reveal>
        </div>

        {/* Grid / Mobile scroll carousel */}
        <div className="flex overflow-x-auto snap-x snap-proximity no-scrollbar gap-4 touch-pan-x overscroll-x-contain [-webkit-overflow-scrolling:touch] md:grid md:grid-cols-3 md:gap-4 lg:gap-6 md:overflow-visible md:snap-none mb-12">
          {activities.map((activity, index) => (
            <Reveal key={index} delay={0.06 * (index + 1)} className="flex-shrink-0 snap-center md:flex-shrink md:snap-none">
              <ActivityCard {...activity} />
            </Reveal>
          ))}
        </div>

        {/* Call to Action */}
        <Reveal delay={0.2}>
          <div className="flex justify-center">
            <Link href="/beyond#summer-camps" className="group flex items-center gap-4 px-6 py-3 border border-[#DA7347] rounded-sm hover:bg-[#DA7347] hover:text-white transition-all duration-500">
              <span className="text-lg md:text-xl font-light text-[#DA7347] group-hover:text-inherit">
                See all activities
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-500 group-hover:translate-x-2 text-[#DA7347] group-hover:text-inherit"
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
        </Reveal>
      </div>
    </section>
  );
};

export default ActivitiesSection;
