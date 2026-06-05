import Image from "next/image";

export default function ProgramsHero() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center overflow-hidden bg-[#1c263a]">
      {/* Background Image overlay to create the tinted effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/programsimg.svg" // Using programsimg.svg as requested
          alt="Horse and rider"
          fill
          className="object-cover object-center mix-blend-luminosity opacity-40"
          priority
        />
        {/* Dark gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1522] via-[#0f1522]/30 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col justify-end pb-20 md:pb-32 h-full">
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end max-w-[1400px] mx-auto">
          {/* Left Heading */}
          <div className="md:col-span-7 lg:col-span-7">
            <h1 className="text-white font-ultra text-[50px] md:text-[65px] lg:text-[85px] leading-[1.05] tracking-tight mb-4 md:mb-0">
              Your equestrian<br />
              journey starts here.
            </h1>
          </div>

          {/* Right Description */}
          <div className="md:col-span-5 lg:col-span-4 lg:col-start-9 md:pb-3">
            <p className="text-white/90 text-sm md:text-[15px] font-sans leading-relaxed">
              At Zippy Equine India Pvt Ltd, our programs are designed to guide riders
              through a structured journey from their very first interaction with a
              horse to competing at national and international levels. Every program
              is 45 minutes per session and built around real skill development at a
              pace that works for you. Not sure which one to pick? Start with the
              Discovery Ride, our instructors will guide you from there.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
