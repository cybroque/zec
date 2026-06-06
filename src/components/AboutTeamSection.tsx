"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const teamMembers = [
  { name: "Narasimha Murthy", role: "Chief Advisor", image: "/assets/images/about-p1.png" },
  { name: "Dilip Kirani", role: "Founder & CEO", image: "/assets/images/about-p2.png" },
  { name: "Nouman", role: "Operational Head", image: "/assets/images/about-p3.png" },
  { name: "Barath Manoharan", role: "Chief of Training", image: "/assets/images/about-p4.png" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" as const } },
};

export default function AboutTeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative w-full bg-[#1C2245] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-[#FFF8E5] font-sans text-3xl md:text-5xl font-normal tracking-wide text-center mb-16 md:mb-24">
          Meet the people behind
        </h2>

        <div className="relative max-w-[1800px] mx-auto">
          {/* Background Pattern */}
          <div className="absolute top-[-30px] md:top-[-60px] left-0 w-full h-[120px] md:h-[160px] z-0 pointer-events-none flex justify-center">
            <div className="relative w-full h-full max-w-[900px] mx-auto">
              <Image src="/assets/images/aboutpattern2.svg" alt="" fill sizes="(max-width: 900px) 100vw, 900px" className="object-contain object-top" />
            </div>
          </div>

          {/* Desktop: 4-column grid with hover scale */}
          <motion.div
            ref={ref}
            className="hidden md:grid grid-cols-4 gap-5 relative z-10 items-end"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {teamMembers.map((member, index) => {
              const isHovered = hoveredIndex === index;
              const anyHovered = hoveredIndex !== null;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="flex flex-col items-center text-center cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Only the image scales — text stays fixed */}
                  <div
                    className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-xl mb-4"
                    style={{
                      transform: isHovered
                        ? "scale(1.06) translateY(-5px)"
                        : anyHovered
                        ? "scale(0.95)"
                        : "scale(1)",
                      transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
                      willChange: "transform",
                    }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 250px"
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="text-[#FFF8E5] text-[18px] font-normal tracking-wide mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#FFF8E5]/70 text-[10px] uppercase tracking-[0.15em] font-light">
                    {member.role}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Mobile: 2-column grid */}
          <motion.div
            className="grid md:hidden grid-cols-2 gap-6 relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={cardVariants} className="flex flex-col items-center text-center">
                <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-xl mb-3">
                  <Image src={member.image} alt={member.name} fill sizes="50vw" className="object-cover object-center" />
                </div>
                <h3 className="text-[#FFF8E5] text-[15px] font-normal tracking-wide mb-0.5">{member.name}</h3>
                <p className="text-[#FFF8E5]/70 text-[9px] uppercase tracking-[0.15em] font-light">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
