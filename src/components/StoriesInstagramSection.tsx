/* 4 cards — alternating high/low wave, solid warm fill */
const CARD_HEIGHT = 360;
const waveOffsets = [0, 28, 0, 28]; // cards 1&3 high, 2&4 lower
const rotations = ["-2deg", "2deg", "-2deg", "2deg"]; // alternating tilts

const socialLinks = [
  { 
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {   
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    )
  },
  { 
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  {  
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    )
  },
];

import Reveal from "@/components/ui/Reveal";

interface StoriesInstagramSectionProps {
  bgColor?: string;
  hideFooter?: boolean;
}

export default function StoriesInstagramSection({ bgColor = "#FFF8E5", hideFooter = false }: StoriesInstagramSectionProps) {
  return (
    <section 
      className={`w-full ${bgColor === "#FFF8E5" ? "bg-[#FFF8E5]" : ""}`} 
      style={bgColor !== "#FFF8E5" ? { backgroundColor: bgColor } : undefined}
    >

      {/* ── Heading ── */}
      <div className="container mx-auto max-w-6xl px-10 pt-24 pb-12 text-center">
        <Reveal>
          <h2
            className="text-[#6B3213] uppercase leading-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", letterSpacing: "0.1em" }}
          >
            Follow Their Journey on Instagram
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-[#85431E]/80 text-base md:text-lg font-medium">
            Real moments from the stables, every week.
          </p>
        </Reveal>
      </div>

      {/* ── SVG band — edge to edge ── */}
      <div
        style={{
          width:            "100%",
          backgroundColor:  "transparent",
          backgroundImage:  "url('/assets/images/insta-bg.svg')",
          backgroundSize:   "100% 100%",
          backgroundRepeat: "no-repeat",
          paddingTop:       44,
          paddingBottom:    48,
          overflow:         "visible",
        }}
      >
        {/* 4 cards spanning most of the full width */}
        <div style={{ width: "100%", paddingLeft: "3%", paddingRight: "3%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            {waveOffsets.map((offset, i) => (
              <Reveal key={i} delay={0.1 * i} className="flex-1">
                <div
                  style={{
                    flex:            "1 1 0",
                    height:          CARD_HEIGHT,
                    marginTop:       offset,
                    marginLeft:      i > 0 ? "-1%" : "0",
                    position:        "relative",
                    zIndex:          i + 1,
                    transform:       `rotate(${rotations[i]})`,
                    backgroundColor: "#E5DCC8",
                    border:          "none",
                    display:         "flex",
                    alignItems:      "center",
                    justifyContent:  "center",
                    padding:         "12px 14px",
                    cursor:          "pointer",
                  }}
                >
                  <span style={{ fontSize: 11, color: "#2C1A0E", fontWeight: 500, letterSpacing: "0.02em" }}>
                    Instagram posts
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── "Follow us" + social links ── */}
      {!hideFooter && (
        <div className="container mx-auto max-w-5xl px-10 pt-20 pb-24">
          <div className="text-center mb-16 md:mb-20">
            <Reveal>
              <p
                className="text-[#85431E] font-medium"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                Follow us for stable updates and rider stories.
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-stretch gap-12 md:gap-24 max-w-4xl mx-auto">
            <div className="flex-1 max-w-[720px] md:text-left">
              <Reveal delay={0.2}>
                <p className="text-[#85431E] text-[15px] md:text-base leading-[1.6] md:text-left inline-block max-w-[340px]">
                  Learn about Horses and get the best tips on riding, taking care, competitions, and most importantly having fun!
                </p>
              </Reveal>
            </div>

            <div className="w-[1px] bg-black hidden md:block" />

            <div className="flex-1 max-w-[320px]">
              <Reveal delay={0.4}>
                <p
                  className="font-bold text-[#000000] mb-5"
                  style={{ fontSize: "0.9rem", letterSpacing: "0.05em", textTransform: "uppercase" }}
                >
                  Follow Us On
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="flex items-center gap-2.5 text-[15px] md:text-base font-medium text-[#85431E] group transition-all w-fit"
                    >
                      <span className="flex-shrink-0 text-[#85431E]">{link.icon}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
