"use client";

import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function BeyondHero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] max-md:h-[80vh] max-md:min-h-[520px] overflow-hidden bg-[#FFF8E5]">
      <div className="absolute -top-[1.5%] left-0 right-0 h-[101.5%]">
        <Image
          src="/assets/images/BeyondRide/Webp/beyond-hero.webp"
          alt="The Equestrian Center for All Seasons and All Reasons"
          fill
          priority
          sizes="(max-width: 768px) 300vw, 100vw"
          quality={90}
          className="object-cover object-top max-md:object-[55%_top]"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 px-8 md:px-16 pb-16 md:pb-24 max-md:px-6 max-md:pb-10 max-w-5xl">
        <Reveal>
          <p className="text-[20px]  text-[#FFF8E5] uppercase font-medium mb-3">
            The Equestrian Center
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="text-5xl md:text-7xl max-md:text-4xl max-sm:text-3xl font-light text-[#FFF8E5] leading-[1.05] mb-5">
            For All Seasons &amp; All Reasons.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="text-[#FFF8E5] text-sm md:text-base leading-relaxed font-light max-w-xl">
            Whether you&apos;re looking to spend a weekend differently, find the right activity
            for your child, host an event at the stables or explore equestrian sport from a
            professional angle. There&apos;s something here for you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

