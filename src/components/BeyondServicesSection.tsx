"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ServiceMeta {
  forWho?: string;
  season?: string;
  duration?: string;
}

interface Service {
  title: string;
  description: string;
  color: string;
  image: string;
  meta?: ServiceMeta;
  cta: string;
}

const services: Service[] = [
  {
    title: "Summer Camps",
    description:
      "Give your child a summer they'll actually remember. Our summer camp programs introduce kids to horse riding, stable care, and equestrian life in a safe, supervised, and genuinely fun environment. Suitable for children with no prior riding experience.",
    color: "#C4724A",
    image: "/assets/images/about-img1.png",
    meta: {
      forWho: "School students",
      season: "During summer vacation",
      duration: "3 Weeks to 6 weeks",
    },
    cta: "Book for next season",
  },
  {
    title: "Horse Training",
    description:
      "Professional training services for horses conducted by our experienced instructors. Whether you're looking to train a young horse or work on specific skills, our team brings the same structured, patient approach we use with our riders.",
    color: "#3E5278",
    image: "/assets/images/pic2.jpg",
    meta: {
      forWho: "All types of horses",
      season: "Any time of the year",
      duration: "As per the requirement",
    },
    cta: "Book your slot",
  },
  {
    title: "Buy a Horse",
    description:
      "Looking to own a horse? We have horses available for sale which are well-trained, healthy, and suited to riders at different levels. Speak to us directly to find out what's currently available and what would be the right match for you.",
    color: "#7A4A2A",
    image: "/assets/images/pic3.jpg",
    cta: "Find available horses",
  },
  {
    title: "Venue for Parties",
    description:
      "Our grounds are available for private events, birthday parties, and group get-togethers. There's no venue in South Bangalore quite like it; an equestrian center with open space, a warm atmosphere, and an experience your guests won't forget.",
    color: "#3E5278",
    image: "/assets/images/pic4.jpg",
    meta: {
      forWho: "All types of events",
      season: "Any time of the year",
      duration: "As per the requirement",
    },
    cta: "Book your slot",
  },
  {
    title: "Equestrian Consultation",
    description:
      "Planning to start your own equestrian facility? Looking for guidance on horse management, program design, or facility setup? We offer professional consultation services drawing on years of hands-on experience running a successful riding center in Bangalore.",
    color: "#3E5278",
    image: "/assets/images/pic5.jpg",
    cta: "Book a meeting",
  },
  {
    title: "Horse Rent / Lease",
    description:
      "Not ready to own, but want regular access to a specific horse? Our rent and lease arrangements give riders a consistent partnership with a horse; ideal for riders who want to train more seriously without the full commitment of ownership.",
    color: "#3E5278",
    image: "/assets/images/pic6.jpg",
    cta: "Find available horses",
  },
  {
    title: "Photoshoots",
    description:
      "Our stables at Zippy make for a stunning photoshoot location: natural light, beautiful horses, and an environment that photographs unlike anything in the city. Available for personal shoots, brand shoots, and professional productions. Horses can be included with prior arrangement.",
    color: "#3E5278",
    image: "/assets/images/about-img2.png",
    cta: "Book a meeting",
  },
  {
    title: "Franchise",
    description:
      "Interested in bringing the Zippy Equestrian Center model to your city? We're open to conversations about franchise opportunities with people who share our commitment to accessible, high-quality equestrian experiences.",
    color: "#3E5278",
    image: "/assets/images/about-img3.png",
    cta: "Talk to our manager",
  },
  {
    title: "Horse Boarding",
    description:
      "We provide boarding facilities for privately-owned horses: safe stabling, daily care, feeding, and regular exercise under professional supervision. Ideal for horse owners who want their animal in experienced hands within the city.",
    color: "#3E5278",
    image: "/assets/images/pic1.jpg",
    cta: "Find your horse a home",
  },
];

export default function BeyondServicesSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#F5F1E8",
      }}
    >
      {/* Top Left SVG (Pre-rotated Pattern) */}
      <img
        src="/assets/images/top.svg"
        alt=""
        className="absolute top-0 pointer-events-none z-0"
        style={{
          left: "-28%",
          width: "100%",
          height: "140px",
        }}
      />

      {/* Middle Right SVG (Vertical) */}
      <img
        src="/assets/images/beyond.svg"
        alt=""
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0"
        style={{
          width: "134px",
          height: "60%",
        }}
      />

      {/* Service cards — inset with horizontal padding, pushed below SVG strip */}
      <div className="relative z-10 pt-[200px] pb-16 px-2 md:px-2 lg:px-2 max-w-7xl mx-auto flex flex-col">
        {services.map((service, index) => {
          let staggerClass = "";
          if (index % 3 === 1) staggerClass = "md:ml-[1%]";
          else if (index % 3 === 2) staggerClass = "md:ml-[2%]";

          let rotateClass = "";
          if (index % 3 === 1) rotateClass = "md:-rotate-[0.5deg]";
          else if (index % 3 === 2) rotateClass = "md:rotate-[0.5deg]";

          return (
            <div
              key={service.title}
              className={`relative w-full md:w-[98%] ${index > 0 ? "-mt-2 md:-mt-[1%]" : ""} ${staggerClass}`}
              style={{ zIndex: services.length - index }}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className={`flex flex-col md:flex-row w-full mb-0 shadow-2xl ${rotateClass}`}
              >
            {/* Left: image */}
            <div
              className="relative w-full md:w-[40%] shrink-0"
              style={{ minHeight: "280px" }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Right: content */}
            <div
              className="flex-1 flex flex-col justify-between px-8 md:px-12 py-10 md:py-12"
              style={{ backgroundColor: service.color }}
            >
              <div>
                <h2 className="text-xl md:text-2xl tracking-[0.15em] uppercase text-white font-light mb-5">
                  {service.title}
                </h2>
                <p className="text-white/80 text-sm leading-relaxed font-light max-w-lg">
                  {service.description}
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
                {service.meta ? (
                  <div className="space-y-2">
                    {service.meta.forWho && (
                      <div className="flex gap-5 text-xs">
                        <span className="tracking-widest uppercase text-white/50 w-20 shrink-0">
                          For who
                        </span>
                        <span className="text-white/80">{service.meta.forWho}</span>
                      </div>
                    )}
                    {service.meta.season && (
                      <div className="flex gap-5 text-xs">
                        <span className="tracking-widest uppercase text-white/50 w-20 shrink-0">
                          Season
                        </span>
                        <span className="text-white/80">{service.meta.season}</span>
                      </div>
                    )}
                    {service.meta.duration && (
                      <div className="flex gap-5 text-xs">
                        <span className="tracking-widest uppercase text-white/50 w-20 shrink-0">
                          Duration
                        </span>
                        <span className="text-white/80">{service.meta.duration}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div />
                )}

                <button className="self-start sm:self-auto border border-white/40 text-white text-[11px] tracking-widest uppercase px-5 py-2.5 hover:bg-white/10 transition-colors whitespace-nowrap">
                  {service.cta} →
                </button>
              </div>
            </div>
          </motion.div>
        </div>
          );
        })}
      </div>
    </section>
  );
}
