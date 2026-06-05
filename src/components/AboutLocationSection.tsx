import Image from "next/image";

export default function AboutLocationSection() {
  return (
    <section className="relative w-full bg-[#85431E] py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="flex flex-col gap-8">
            <h2 className="text-[#FFF8E5] font-sans text-4xl md:text-6xl font-normal leading-[1.1]">
              The Center That&apos;s<br />Right in the City.
            </h2>
            <p className="text-[#FFF8E5]/80 text-base md:text-lg font-light leading-relaxed max-w-md">
              Zippy Equestrian Center is located in JP Nagar, 7th Phase, right in the heart of South
              Bangalore with a well-maintained arena, proper stabling for our horses and everything
              you need to show up, ride and leave with a smile.
            </p>
            <p className="text-[#FFF8E5] text-base md:text-lg font-light leading-relaxed max-w-md">
              No lengthy commute, no remote farm, zero fuss. Just a fully equipped riding center
              that is minutes away from where you are.
            </p>
          </div>

          {/* Right: Map */}
          <div className="relative w-full max-w-[640px] ml-auto aspect-square">
            <Image
              src="/assets/images/about-map.svg"
              alt="ZEC Location Map"
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-contain"
            />
            {/* Address card */}
            <div className="absolute bottom-8 right-4 md:bottom-12 md:right-8 bg-[#FFF8E5]/90 backdrop-blur-sm p-4 md:p-5 max-w-[210px] shadow-lg">
              <p className="text-[#85431E] text-[9px] uppercase tracking-widest font-bold mb-2">
                ZIPPY EQUESTRIAN CENTER
              </p>
              <p className="text-[#85431E]/80 text-[11px] font-light leading-relaxed">
                102/2, next to Sports Drome,<br />
                Opposite Jain Public School, Puttenahalli,<br />
                JP Nagar 7th Phase, Bengaluru – 560078
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
