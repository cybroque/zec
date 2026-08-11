"use client";

import Reveal from "@/components/ui/Reveal";

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
    <section className="contact-directory w-full bg-transparent pt-2 md:pt-4 pb-16 md:pb-20 max-md:pt-6 max-md:pb-12">
      <div className="container mx-auto px-6 md:px-12 max-sm:px-4">

        {/* Heading — sits on top, spanning */}
        <Reveal>
          <h2 className="text-[#85431E] text-2xl md:text-3xl font-light tracking-[0.08em] uppercase leading-tight mb-12 lg:mb-16">
            Contact<br />Directory
          </h2>
        </Reveal>

        {/* Contact entries — two columns below the heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-md:gap-8">
          {contacts.map((contact, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div>
                <p className="text-[#DA7347] text-base font-light mb-2">
                  {contact.phone}
                </p>
                <div className="dir-divider w-full h-px mb-3" style={{ backgroundColor: "#85431E33" }} />
                <p className="text-[#DA7347] text-[10px] tracking-[0.2em] uppercase font-medium mb-1">
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
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
