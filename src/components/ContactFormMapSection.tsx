"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const INTEREST_OPTIONS = [
  "Riding Programs",
  "Children's camps",
  "Horse boarding",
  "Buy a horse",
  "Book a venue",
  "Consultation",
  "Photoshoot",
  "Horse Rent / Lease",
  "Franchise"
];

export default function ContactFormMapSection() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Riding Programs");

  return (
    <section className="w-full bg-[#F5F1E8] py-16 md:py-24">
      {/* Aligned with Header container */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* LEFT: Form + Location text */}
          <div className="flex flex-col gap-12">

            {/* Form */}
            <div>
              <h1 className="text-[#85431E] text-4xl md:text-5xl font-light leading-tight mb-10">
                Time to take action
              </h1>

              <div className="p-6 md:p-8" style={{ backgroundColor: "#F2EBD9" }}>
                <div className="mb-5">
                  <label className="text-[#85431E]/70 text-xs tracking-widest uppercase mb-2 block font-light">
                    Your name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none border-0 focus:ring-1 focus:ring-[#DA7347]/30"
                  />
                </div>

                <div className="mb-5">
                  <label className="text-[#85431E]/70 text-xs tracking-widest uppercase mb-2 block font-light">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    className="w-full bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none border-0 focus:ring-1 focus:ring-[#DA7347]/30"
                    placeholder="+91"
                  />
                </div>

                <div className="mb-7 relative">
                  <label className="text-[#85431E]/70 text-xs tracking-widest uppercase mb-2 block font-light">
                    I&apos;m interested in:
                  </label>
                  <div 
                    className="w-full bg-white px-4 py-3 text-sm text-[#85431E] flex justify-between items-center cursor-pointer border-0 outline-none"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>{selectedOption}</span>
                    <svg width="11" height="7" viewBox="0 0 11 7" fill="none" className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                      <path d="M1 1L5.5 5.5L10 1" stroke="#85431E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 z-20 shadow-xl rounded-sm overflow-hidden" style={{ backgroundColor: "#CFCDBC", border: "1px solid rgba(0,0,0,0.05)" }}>
                      <div className="flex flex-col">
                        {INTEREST_OPTIONS.map((opt, i) => (
                          <div 
                            key={i}
                            className="px-4 py-3 text-sm text-[#93451E] cursor-pointer hover:bg-black/5"
                            style={{ borderBottom: i < INTEREST_OPTIONS.length - 1 ? "1px solid #D2AA96" : "none" }}
                            onClick={() => {
                              setSelectedOption(opt);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button className="flex items-center gap-3 text-white text-[11px] tracking-widest uppercase px-6 py-3 hover:opacity-90 transition-opacity" style={{ backgroundColor: "#DA7347" }}>
                    Send Enquiry
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Location text */}
            <div>
              <p className="text-[#1a1a1a] text-2xl md:text-3xl font-light leading-snug">
                We&apos;re in JP Nagar, 7th Phase<br />
                In the heart of South Bangalore.<br />
                <span className="text-[#DA7347]">Easy to find, easy to get to.</span>
              </p>
            </div>
          </div>

          {/* RIGHT: Info + WhatsApp + Map */}
          <div className="flex flex-col gap-5">

            <p className="text-[#1a1a1a]/60 text-sm leading-relaxed font-light max-w-xs">
              Call us or find us when you are ready or when you feel like you need to know more.
              We&apos;re ready to assist you to experience the fun of being around horses.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919901794713"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 text-white text-sm tracking-[0.12em] uppercase px-5 py-4 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#DA7347" }}
            >
              <div className="flex items-center gap-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>Text us now</span>
              </div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M12 5L19 12L12 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Map — container locked to SVG's 733×982 aspect ratio so % positions are exact */}
            <div
              className="relative w-full cursor-pointer mt-4"
              style={{ aspectRatio: "733/982" }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Image
                src="/assets/images/contact-map.svg"
                alt="ZEC Location Map"
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />

              {/* Dot: cx=250.313 cy=557.88 in 733×982 → 34.1% left, 56.8% top */}
              <div
                className="absolute pointer-events-none"
                style={{ left: "calc(34.1% - 10px)", top: "calc(56.8% - 10px)", width: 20, height: 20 }}
              >
                <div
                  className={`w-full h-full rounded-full border-2 border-[#DA7347] transition-opacity duration-300 ${
                    showTooltip ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
              <div
                className="absolute pointer-events-none rounded-full bg-[#DA7347]"
                style={{ left: "calc(34.1% - 5px)", top: "calc(56.8% - 5px)", width: 10, height: 10 }}
              />

              {/* Address card — fades in on hover */}
              <motion.div
                initial={false}
                animate={showTooltip ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="absolute pointer-events-none"
                style={{ left: "34.65%", top: "57.43%", width: "52%" }}
              >
                <div
                  className="backdrop-blur-[3px] rounded-[4px] p-4"
                  style={{ backgroundColor: "rgba(218,115,71,0.88)" }}
                >
                  <p className="text-white text-[9px] uppercase tracking-widest font-bold mb-2">
                    Zippy Equestrian Center
                  </p>
                  <p className="text-white/90 text-[11px] font-light leading-relaxed">
                    102/2, next to Sports Drome,<br />
                    Opposite Jain Public School, Puttenahalli,<br />
                    JP Nagar 7th Phase, Bengaluru – 560078
                  </p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
