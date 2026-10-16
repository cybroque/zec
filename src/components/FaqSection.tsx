"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { defaultFaqs, WebsiteFaq } from "@/data/faqData";

interface FaqSectionProps {
  initialFaqs?: WebsiteFaq[];
}

export default function FaqSection({ initialFaqs }: FaqSectionProps) {
  const faqs = (initialFaqs && initialFaqs.length > 0 ? initialFaqs : defaultFaqs).slice(0, 5);

  // Closed by default to match the clean reference screenshot
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-[#FFF8E5] py-16 md:py-24 px-6 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        {/* Section Heading */}
        <Reveal>
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-[#85431E] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-heading font-medium tracking-wide uppercase leading-tight">
              YOU&apos;VE GOT QUESTIONS &amp; WE&apos;VE GOT ANSWERS.
            </h2>
          </div>
        </Reveal>

        {/* FAQ List */}
        <div className="space-y-3 sm:space-y-3.5">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={item._id || item.id || index} delay={index * 0.04}>
                <div
                  onClick={() => toggleItem(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggleItem(index);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  className="bg-[#F1EAD9] hover:bg-[#EAE2CF] transition-colors duration-200 rounded-lg px-6 sm:px-8 py-4 sm:py-4.5 cursor-pointer select-none group"
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* Question Title */}
                    <h3 className="text-[#DA7347] text-sm sm:text-base md:text-[17px] font-normal leading-snug tracking-normal">
                      {item.question}
                    </h3>

                    {/* Simple Down-Right Diagonal Arrow (↘) */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="shrink-0 text-[#DA7347]"
                      aria-label={isOpen ? "Collapse answer" : "Expand answer"}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-105"
                      >
                        <line x1="7" y1="7" x2="17" y2="17" />
                        <polyline points="17 7 17 17 7 17" />
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
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-[#85431E]/85 text-xs sm:text-sm md:text-base font-light leading-relaxed pt-3 mt-1 border-t border-[#DA7347]/15">
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
