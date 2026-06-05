"use client";

import { motion } from "framer-motion";

const contacts = [
  {
    phone: "+91 99017 94713",
    role: "FRONT OFFICE",
    name: null,
    description: "For bookings, general enquiries, and program information",
  },
  {
    phone: "+91 98829 88267",
    role: "MOHAMED NOUMAN",
    name: "Director",
    description: "For events, activities, franchise and consultation enquiries",
  },
];

export default function ContactDirectorySection() {
  return (
    <section className="w-full bg-[#F5F1E8] py-16 md:py-20">
      <div className="container mx-auto px-8 md:px-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: Heading */}
          <div>
            <h2 className="text-[#1a1a1a] text-3xl md:text-4xl font-light tracking-[0.08em] uppercase leading-tight">
              Contact<br />Directory
            </h2>
          </div>

          {/* Right: Contact entries */}
          <div className="flex flex-col gap-8">
            {contacts.map((contact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <p className="text-[#DA7347] text-base font-light tracking-wide mb-2">
                  {contact.phone}
                </p>
                <div className="w-full h-px mb-3" style={{ backgroundColor: "#85431E33" }} />
                <p className="text-[#85431E] text-[10px] tracking-[0.2em] uppercase font-medium mb-1">
                  {contact.role}
                </p>
                {contact.name && (
                  <p className="text-[#1a1a1a] text-sm font-medium mb-1">
                    {contact.name}
                  </p>
                )}
                <p className="text-[#1a1a1a]/55 text-sm font-light leading-relaxed">
                  {contact.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
