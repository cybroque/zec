import Image from "next/image";

export default function BeyondHero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <Image
        src="/assets/images/beyond-hero.png"
        alt="The Equestrian Center for All Seasons and All Reasons"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 px-8 md:px-16 pb-16 md:pb-24 max-w-5xl">
        <p className="text-[20px] tracking-[0.3em] text-[#FFF8E5] uppercase font-medium mb-3">
          The Equestrian Center
        </p>
        <h1 className="text-5xl md:text-7xl font-light text-[#FFF8E5] leading-[1.05] mb-5">
          For All Seasons &amp; All Reasons.
        </h1>
        <p className="text-[#FFF8E5] text-sm md:text-base leading-relaxed font-light max-w-xl">
          Whether you&apos;re looking to spend a weekend differently, find the right activity
          for your child, host an event at the stables or explore equestrian sport from a
          professional angle. There&apos;s something here for you.
        </p>
      </div>
    </section>
  );
}
