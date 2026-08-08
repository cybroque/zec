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
    <section className="contact-directory w-full bg-transparent py-16 md:py-20 max-md:py-12">
      <div className="container mx-auto px-8 md:px-16 max-w-6xl max-sm:px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-md:gap-8">

          {/* Left: Heading */}
          <div>
            <Reveal>
              <h2 className="text-[#1a1a1a] text-3xl md:text-4xl font-light tracking-[0.08em] uppercase leading-tight">
                Contact<br />Directory
              </h2>
            </Reveal>
          </div>

          {/* Right: Contact entries */}
          <div className="flex flex-col gap-8 max-md:gap-6">
            {contacts.map((contact, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div>
                  <p className="text-[#DA7347] text-base font-light  mb-2">
                  {contact.phone}
                </p>
                <div className="dir-divider w-full h-px mb-3" style={{ backgroundColor: "#85431E33" }} />
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
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
