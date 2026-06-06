import Image from "next/image";

export default function StoriesHero() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      {/* Background image */}
      <Image
        src="/assets/images/riders-hero.png"
        alt="Zippy riders group photo"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Gradient overlay — strong at bottom, fades upward */}
      <div 
        className="absolute inset-0" 
        style={{
          background: "linear-gradient(to top, #53321eff 0%, rgba(29, 17, 11, 0.47) 40%)"
        }}
      />

      {/* Bottom-left content */}
      <div className="absolute bottom-12 left-0 px-8 md:px-16 pb-16 md:pb-24 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-normal text-white leading-none mb-4">
          Rider Stories
        </h1>
        <p className="text-[16px] text-[#F2EBD9] font-gt-ultra  tracking-[0.3em] uppercase font-bold mb-3">
          Featured Stories
        </p>
        <p className="text-white/85 text-sm md:text-base leading-relaxed">
          Every rider at Zippy Equestrian Center has a before and an after.
          Here&apos;s what that journey looks like — in their own words. These
          are real people who showed up not knowing what to expect,
          and kept coming back.
        </p>
      </div>
    </section>
  );
}
