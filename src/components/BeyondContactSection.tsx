"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BeyondContactSection() {
  return (
    <section className="bg-[#F5F1E8] py-16 md:py-20 px-6 md:px-16">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-[#85431E] text-2xl md:text-3xl font-light mb-10"
      >
        Know more what Zippy has to offer
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mx-auto flex flex-col md:flex-row overflow-hidden"
        style={{ backgroundColor: "#1C2245" }}
      >
        {/* Left: image */}
        <div
          className="relative w-full md:w-[42%] shrink-0"
          style={{ minHeight: "220px" }}
        >
          <Image
            src="/assets/images/pic1.jpg"
            alt="Zippy Equestrian Center"
            fill
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover"
          />
        </div>

        {/* Right: CTA rows */}
        <div className="flex-1 flex flex-col divide-y divide-white/10">
          <div className="group flex items-center justify-between px-8 py-8 hover:bg-white/5 transition-colors cursor-pointer">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-2">
                For General Enquiries
              </p>
              <p className="text-white text-base font-light">Give us a call</p>
            </div>
            <span className="text-[#DA7347] text-xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>

          <div className="group flex items-center justify-between px-8 py-8 hover:bg-white/5 transition-colors cursor-pointer">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-2">
                For Franchise / Collaborations
              </p>
              <p className="text-white text-base font-light">Book a meeting</p>
            </div>
            <span className="text-[#DA7347] text-xl group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
