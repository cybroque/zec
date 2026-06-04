import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] flex items-center overflow-hidden bg-[#9eb9da]">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/assets/images/aboutimg.png" // The image used in the mockup
          alt="Woman in riding gear"
          fill
          className="object-cover object-[70%_20%] md:object-[90%_20%]"
          priority
          sizes="100vw"
        />

      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col justify-center h-full pt-32">
        <div className="w-full max-w-[100%] lg:max-w-[1000px] mt-10 md:mt-20">
          <h1 className="font-gt-ultra text-[32px] sm:text-[40px] md:text-[54px] lg:text-[72px] leading-[1.1] tracking-tight text-[#FBEECC] mb-8 drop-shadow-sm md:whitespace-nowrap">
            It Started as a Bucket List.<br />
            It Became a Riding Center.
          </h1>
          <p className="font-sans text-[15px] md:text-[17px] text-[#FBEECC] leading-[1.6] max-w-3xl font-medium opacity-95">
            Zippy Equestrian Center is Bangalore&apos;s home for horse riding — a place built from scratch by someone who felt exactly the way most of our students feel on day one: curious, slightly nervous, and not entirely sure what they were getting into.
          </p>
        </div>
      </div>
    </section>
  );
}
