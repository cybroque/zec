"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { defaultFaqs, WebsiteFaq } from "@/data/faqData";

interface FaqSectionProps {
  initialFaqs?: WebsiteFaq[];
}

export default function FaqSection({ initialFaqs }: FaqSectionProps) {
  const faqs = initialFaqs && initialFaqs.length > 0 ? initialFaqs : defaultFaqs;

  // First item open by default, matching Image 1
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-[#FFF8E5] py-20 md:py-28 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl">
        {/* Section Heading matching Image 1 */}
        <Reveal>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[#85431E] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-heading font-medium tracking-wide uppercase leading-tight">
              YOU&apos;VE GOT QUESTIONS &amp; WE&apos;VE GOT ANSWERS.
            </h2>
          </div>
        </Reveal>

        {/* FAQ List */}
        <div className="space-y-4 md:space-y-5">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={item._id || item.id || index} delay={index * 0.05}>
                <div
                  onClick={() => toggleItem(index)}
                  className="bg-[#ECD3BA] hover:bg-[#E8CDB2] transition-colors duration-200 rounded-xl p-5 sm:p-6 md:p-7 cursor-pointer shadow-sm border border-[#85431E]/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Question Title */}
                    <h3 className="text-[#85431E] text-base sm:text-lg md:text-xl font-medium tracking-tight leading-snug">
                      {item.question}
                    </h3>

                    {/* Terracotta Button with Rotating Arrow (↗ when closed, ↙ when open) */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md bg-[#9C4328] text-white flex items-center justify-center shrink-0 shadow-sm"
                      aria-label={isOpen ? "Collapse answer" : "Expand answer"}
                    >
                      {/* Diagonal Arrow matching Image 1 */}
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Expandable Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#85431E]/90 text-sm sm:text-base font-light leading-relaxed pt-4 border-t border-[#85431E]/15 mt-3">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
