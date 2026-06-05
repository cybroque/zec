import Image from "next/image";

export default function AboutStorySection() {
  return (
    <section className="relative w-full bg-[#1C2245] py-20 md:py-32 overflow-hidden">
      {/* Top right pattern */}
      <div className="absolute top-0 right-0 w-[70%] md:w-[50%] lg:w-[40%] max-w-[600px] aspect-square opacity-60 pointer-events-none">
        <Image
          src="/assets/images/aboutpattern.svg"
          alt="Decorative pattern"
          fill
          sizes="(max-width: 768px) 70vw, (max-width: 1024px) 50vw, 40vw"
          className="object-contain object-top object-right"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-white font-sans text-xl md:text-2xl font-bold tracking-[0.1em] uppercase mb-12 md:mb-16">
            Where it all began
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-16 items-start">
            {/* Left Column: Top 3 Paragraphs */}
            <div className="lg:col-span-7 flex flex-col gap-8 text-[#FFF8E5] font-extralight text-[15px] md:text-[17px] leading-[1.4]">
              <p>
                After finishing his engineering degree, Dilip Kirani (Founding Partner) wanted to try something he&apos;d always meant to get around to, &apos;Horse riding&apos;.
              </p>
              <p>
                He and a friend booked a session at a riding center in Bangalore. It wasn&apos;t what he&apos;d hoped for. The experience felt rushed, the instruction wasn&apos;t right and they left feeling like they&apos;d missed something.
              </p>
              <p>
                Taking matters into his own hands, he bought a horse and set up a small facility in South Bangalore just to ride, enjoy and maintain his own horses. There was no grand plan. It was a passion project.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[240px] sm:max-w-[260px] lg:max-w-[280px] aspect-[4/5] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/aboutimg1.svg"
                  alt="Dilip Kirani - Founding Partner"
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 260px, 280px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Bottom Paragraph */}
            <div className="lg:col-span-12 text-[#FFF8E5] font-extralight text-[15px] md:text-[17px] leading-[1.4] max-w-[1000px]">
              <p>
                Over time, word spread. Friends came to ride. Then friends of friends. Then families with children and adults ticking riding off their list, and people who just wanted to spend their weekend somewhere different. The small setup became something real, a proper equestrian center, built entirely on the idea that horse riding should be open to everyone. That&apos;s still what Zippy Equestrian Center is today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
