"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceMeta {
  forWho?: string;
  season?: string;
  duration?: string;
}

interface Service {
  id?: string;
  title: string;
  description: string;
  color: string;
  image: string;
  meta?: ServiceMeta;
  cta: string;
}

const services: Service[] = [
  {
    id: "summer-camps",
    title: "Summer Camps",
    description:
      "Give your child a summer they'll actually remember. Our summer camp programs introduce kids to horse riding, stable care, and equestrian life in a safe, supervised, and genuinely fun environment. Suitable for children with no prior riding experience.",
    color: "#DA7347",
    image: "/assets/images/BeyondRide/Webp/summer-camp.webp",
    meta: {
      forWho: "School students",
      season: "During summer vacation",
      duration: "3 Weeks to 6 weeks",
    },
    cta: "Book for next season",
  },
  {
    id: "horse-training",
    title: "Horse Training",
    description:
      "Professional training services for horses conducted by our experienced instructors. Whether you're looking to train a young horse or work on specific skills, our team brings the same structured, patient approach we use with our riders.",
    color: "#526FAE",
    image: "/assets/images/BeyondRide/Webp/horse-training.webp",
    meta: {
      forWho: "All types of horses",
      season: "Any time of the year",
      duration: "As per the requirement",
    },
    cta: "Book your slot",
  },
  {
    id: "buy-a-horse",
    title: "Buy a Horse",
    description:
      "Looking to own a horse? We have horses available for sale which are well-trained, healthy, and suited to riders at different levels. Speak to us directly to find out what's currently available and what would be the right match for you.",
    color: "#85431E",
    image: "/assets/images/BeyondRide/Webp/buy.webp",
    cta: "Find available horses",
  },
  {
    id: "parties-and-venues",
    title: "Venue for Parties",
    description:
      "Our grounds are available for private events, birthday parties, and group get-togethers. There's no venue in South Bangalore quite like it; an equestrian center with open space, a warm atmosphere, and an experience your guests won't forget.",
    color: "#AE5834",
    image: "/assets/images/BeyondRide/Webp/venue.webp",
    meta: {
      forWho: "All types of events",
      season: "Any time of the year",
      duration: "As per the requirement",
    },
    cta: "Book your slot",
  },
  {
    id: "equestrian-consultation",
    title: "Equestrian Consultation",
    description:
      "Planning to start your own equestrian facility? Looking for guidance on horse management, program design, or facility setup? We offer professional consultation services drawing on years of hands-on experience running a successful riding center in Bangalore.",
    color: "#1C2245",
    image: "/assets/images/BeyondRide/Webp/eque.webp",
    cta: "Book a meeting",
  },
  {
    id: "horse-rent-lease",
    title: "Horse Rent / Lease",
    description:
      "Not ready to own, but want regular access to a specific horse? Our rent and lease arrangements give riders a consistent partnership with a horse; ideal for riders who want to train more seriously without the full commitment of ownership.",
    color: "#85431E",
    image: "/assets/images/BeyondRide/Webp/horse.webp",
    cta: "Find available horses",
  },
  {
    id: "photoshoots",
    title: "Photoshoots",
    description:
      "Our stables at Zippy make for a stunning photoshoot location: natural light, beautiful horses, and an environment that photographs unlike anything in the city. Available for personal shoots, brand shoots, and professional productions. Horses can be included with prior arrangement.",
    color: "#526FAE",
    image: "/assets/images/BeyondRide/Webp/photo.webp",
    cta: "Book a meeting",
  },
  {
    id: "franchise",
    title: "Franchise",
    description:
      "Interested in bringing the Zippy Equestrian Center model to your city? We're open to conversations about franchise opportunities with people who share our commitment to accessible, high-quality equestrian experiences.",
    color: "#DA7347",
    image: "/assets/images/BeyondRide/Webp/franchise.webp",
    cta: "Talk to our manager",
  },
  {
    id: "horse-boarding",
    title: "Horse Boarding",
    description:
      "We provide boarding facilities for privately-owned horses: safe stabling, daily care, feeding, and regular exercise under professional supervision. Ideal for horse owners who want their animal in experienced hands within the city.",
    color: "#1C2245",
    image: "/assets/images/BeyondRide/Webp/boarding.webp",
    cta: "Find your horse a home",
  },
];

export default function BeyondServicesSection() {
  return (
    <section className="relative w-full bg-[#F5F1E8]">
      {/* Background SVGs wrapped in overflow-hidden to not break sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src="/assets/images/top.svg"
          alt=""
          className="absolute top-0 pointer-events-none"
          style={{
            left: "-28%",
            width: "100%",
            height: "140px",
          }}
        />

        <img
          src="/assets/images/beyond.svg"
          alt=""
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "134px",
            height: "60%",
          }}
        />
        <img
          src="/assets/images/beyond.svg"
          alt=""
          className="absolute left-0 bottom-0 pointer-events-none transform -scale-x-100"
          style={{
            width: "134px",
            height: "70%",
          }}
        />
      </div>

      {/* Anchor for summer-camps — placed at the top of the sticky section */}
      <div id="summer-camps" className="absolute top-0 left-0 h-0 w-0 pointer-events-none" />

      {/* Service cards — spaced out so they scroll up and stick */}
      <div className="relative z-10 pt-[200px] pb-24 md:pb-36 px-2 md:px-2 lg:px-2 max-w-7xl mx-auto flex flex-col gap-16 md:gap-32">
        {services.map((service, index) => {
          let staggerClass = "";
          if (index % 3 === 1) staggerClass = "md:ml-[1%]";
          else if (index % 3 === 2) staggerClass = "md:ml-[2%]";

          let rotateClass = "";
          if (index % 3 === 1) rotateClass = "md:-rotate-[0.5deg]";
          else if (index % 3 === 2) rotateClass = "md:rotate-[0.5deg]";

          const isDarkText = service.title === "Summer Camps";
          const tableTextColor = isDarkText ? "text-black/70" : "text-white/90";
          const tableBorderColor = isDarkText ? "border-black/15" : "border-white/30";

          return (
            <div
              key={service.title}
              className={`sticky w-full md:w-[98%] ${staggerClass}`}
              style={{ 
                top: `calc(20vh + ${index * 12}px)`,
                zIndex: index 
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col md:flex-row w-full mb-0 shadow-2xl ${rotateClass}`}
              >
                {/* Left: image */}
                <div
                  className="relative w-full md:w-[40%] shrink-0 max-md:!min-h-[220px]"
                  style={{ minHeight: "340px" }}
                >
                  <Image loading="lazy"
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>

                {/* Right: content */}
                <div
                  className="flex-1 flex flex-col justify-between px-8 md:px-12 py-10 md:py-12 max-md:px-6 max-md:py-8"
                  style={{ backgroundColor: service.color }}
                >
                  <div>
                    <h2 className="text-3xl md:text-[34px]  uppercase text-[#FFF8E5] font-medium mb-4">
                      {service.title}
                    </h2>
                    <p className="text-white text-[14px] md:text-[15px] leading-relaxed font-light max-w-2xl">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                    {service.meta ? (
                      <div className="w-full sm:w-auto flex-1 max-w-sm">
                        {service.meta.forWho && (
                          <div className={`flex border-b ${tableBorderColor} py-2.5 text-[13px] ${tableTextColor}`}>
                            <span className="w-28 shrink-0 font-medium">For who</span>
                            <span>{service.meta.forWho}</span>
                          </div>
                        )}
                        {service.meta.season && (
                          <div className={`flex border-b ${tableBorderColor} py-2.5 text-[13px] ${tableTextColor}`}>
                            <span className="w-28 shrink-0 font-medium">Season</span>
                            <span>{service.meta.season}</span>
                          </div>
                        )}
                        {service.meta.duration && (
                          <div className={`flex border-b ${tableBorderColor} py-2.5 text-[13px] ${tableTextColor}`}>
                            <span className="w-28 shrink-0 font-medium">Duration</span>
                            <span>{service.meta.duration}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex-1" />
                    )}

                    <Link
                      href="/contact"
                      className="mt-6 sm:mt-0 self-end bg-[#FFF8E5] px-5 py-3 text-[13px] text-[#DA7347] font-medium flex items-center gap-3 hover:bg-[#FFF8E5]/90 transition-colors shrink-0 rounded-sm max-md:w-full max-md:justify-center max-md:self-stretch"
                    >
                      {service.cta}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
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
