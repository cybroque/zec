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
        className="max-w-5xl mx-auto flex flex-col md:flex-row overflow-hidden rounded-xl shadow-sm"
      >
        {/* Left: image */}
        <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[450px] shrink-0">
          <Image
            src="/assets/images/know-more.png"
            alt="Know more about Zippy Equestrian Center"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Right: CTA rows */}
        <div className="w-full md:w-1/2 flex flex-col">
          {/* Top CTA */}
          <div className="flex-1 bg-[#1A1F3D] p-10 md:p-14 flex flex-col justify-between group cursor-pointer transition-colors hover:bg-[#161B35]">
            <h3 className="text-white text-lg md:text-xl font-normal uppercase tracking-wide leading-snug mb-16">
              FOR GENERAL ENQUIRIES
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-white font-light text-base md:text-lg">Give us a call</span>
              <svg className="w-6 h-6 text-white font-light group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="flex-1 bg-[#5A74A8] p-10 md:p-14 flex flex-col justify-between group cursor-pointer transition-colors hover:bg-[#4E6593]">
            <h3 className="text-white text-lg md:text-xl font-normal uppercase tracking-wide leading-snug mb-16">
              FOR FRANCHISE/<br />COLLABORATIONS
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-white font-light text-base md:text-lg">Book a meeting</span>
              <svg className="w-6 h-6 text-white font-light group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
