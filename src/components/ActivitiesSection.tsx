"use client";

import React from 'react';
import Image from 'next/image';

const ActivityCard = ({
  title,
  description,
  imageSrc,
  overlayColor
}: {
  title: string;
  description: string;
  imageSrc: string;
  overlayColor: string;
}) => {
  return (
    <div className="relative group overflow-hidden rounded-sm aspect-[4/5] w-full">
      {/* Image */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Color Overlay */}
      <div
        className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-75"
        style={{ backgroundColor: overlayColor }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
        <h3 className="text-2xl md:text-[28px] font-light mb-2 leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-[13px] md:text-[15px] font-extralight opacity-90 max-w-[260px]">
          {description}
        </p>
      </div>
    </div>
  );
};

const ActivitiesSection = () => {
  const activities = [
    {
      title: "Summer camps",
      description: "For kids who want more than a screen this summer.",
      imageSrc: "/assets/images/pic4.jpg",
      overlayColor: "rgba(214, 122, 91, 0.65)" // #d67a5b with alpha
    },
    {
      title: "Parties and Venues",
      description: "Host your next get-together at the stables.",
      imageSrc: "/assets/images/pic5.jpg",
      overlayColor: "rgba(46, 88, 185, 0.65)" // #2e58b9 with alpha
    },
    {
      title: "Photoshoots",
      description: "The most beautiful backdrop in South Bangalore.",
      imageSrc: "/assets/images/pic6.jpg",
      overlayColor: "rgba(133, 67, 30, 0.65)" // #85431E with alpha
    }
  ];

  return (
    <section className="bg-[#FFF8E5] py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-20 md:mb-28">
          <h2 className="text-[42px] md:text-[60px] font-normal text-[#DA7347] mb-8 leading-[1.1] tracking-tight">
            For All Seasons & All Reasons
          </h2>
          <p className="text-md md:text-md text-[#1a1a1a] max-w-3xl mx-auto leading-[1.6] font-normal opacity-90 px-4">
            ZEC is more than a riding school. From summer camps for kids to corporate experiences,
            photoshoots, and venue hire there&apos;s always something on at the stables.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-6 mb-20">
          {activities.map((activity, index) => (
            <ActivityCard key={index} {...activity} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="flex justify-center">
          <button className="group flex items-center gap-4 px-8 py-4 border border-[#DA7347] rounded-sm hover:bg-[#DA7347] hover:text-white transition-all duration-500">
            <span className="text-xl md:text-2xl font-light text-[#DA7347] group-hover:text-inherit">
              See all activities
            </span>
            <svg
              width="32"
              height="32"
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
          </button>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;
