"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

// Map of route → hero image to silently prefetch when the user hovers the link
const ROUTE_PREFETCH: Record<string, string> = {
  "/about":    "/assets/images/About/Webp/hero.webp",
  "/programs": "/assets/images/Programs/Webp/Hero.webp",
  "/beyond":   "/assets/images/BeyondRide/Webp/beyond-hero.webp",
  "/stories":  "/assets/images/Rider_stories/Webp/riders-hero.webp",
};

/** Kicks off a background download so the image is cached before navigation. */
function prefetchImage(src: string) {
  if (typeof window === "undefined") return;
  const img = new window.Image();
  img.src = src;
}

interface HeaderProps {
  theme?: "dark" | "light";
  disableThemeChangeOnScroll?: boolean;
  navVariant?: "default" | "cream";
}

export default function Header({ theme = "dark", disableThemeChangeOnScroll = false, navVariant = "default" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const NAV_LINKS: [string, string][] = [
    ["/", "HOME"],
    ["/about", "ABOUT"],
    ["/programs", "PROGRAMS"],
    ["/stories", "RIDERS STORIES"],
    ["/beyond", "BEYOND THE RIDE"],
    ["/contact", "JOIN ZIPPY"],
  ];

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setIsScrolled(currentY > 50);
          
          // Switch to light theme when scrolling past the hero section (~100vh)
          // Minus 80px to transition smoothly right as it crosses the boundary
          setIsPastHero(currentY > window.innerHeight - 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = theme === "light" || (!disableThemeChangeOnScroll && isPastHero);

  const handleNavHover = useCallback((href: string) => {
    if (ROUTE_PREFETCH[href]) {
      prefetchImage(ROUTE_PREFETCH[href]);
    }
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans bg-transparent ${isScrolled ? "py-4" : "py-8"} max-md:py-4`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-36 h-16 md:w-56 md:h-24 transition-transform group-hover:scale-105 duration-500">
            <Image
              src={isLight ? "/assets/images/zippylogo-dark.svg" : "/assets/images/zippylogo2.svg"}
              alt="Zippy Equestrian Logo"
              fill
              sizes="(max-width: 768px) 144px, 224px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Navigation - Desktop */}
        <nav className={`hidden lg:flex items-center backdrop-blur-md rounded-md overflow-hidden h-12 shadow-xl border ${navVariant === 'cream' ? 'bg-[#FFF8E5]/90 border-[#85431E]/10' : (isLight ? 'bg-[#85431E]/80 border-white/20' : 'bg-[#DA7347]/70 border-white/10')}`}>
          <Link href="/" className={`px-6 py-2 text-[11px] font-medium transition-colors ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#F2EBD9] hover:text-white'}`}>HOME</Link>
          <Link href="/about" onMouseEnter={() => handleNavHover("/about")} className={`px-6 py-2 text-[11px] font-medium transition-colors ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#F2EBD9] hover:text-white'}`}>ABOUT</Link>
          <Link href="/programs" onMouseEnter={() => handleNavHover("/programs")} className={`px-6 py-2 text-[11px] font-medium transition-colors ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#F2EBD9] hover:text-white'}`}>PROGRAMS</Link>
          <Link href="/stories" onMouseEnter={() => handleNavHover("/stories")} className={`px-6 py-2 text-[11px] font-medium transition-colors ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#F2EBD9] hover:text-white'}`}>RIDERS STORIES</Link>
          <Link href="/beyond" onMouseEnter={() => handleNavHover("/beyond")} className={`px-6 py-2 text-[11px] font-medium transition-colors ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#F2EBD9] hover:text-white'}`}>BEYOND THE RIDE</Link>
          <Link href="/contact" className={`px-8 py-2 h-full flex items-center font-black text-xs transition-all ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#FFEF60]'}`}>JOIN ZIPPY</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className={`lg:hidden p-2 ${isLight ? 'text-[#85431E]' : 'text-[#F2EBD9]'}`}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile slide-in side menu (hidden on desktop) */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] ${menuOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
        />

        {/* Panel */}
        <nav
          className={`absolute top-0 right-0 h-full w-[82%] max-w-sm bg-[#85431E] text-[#F2EBD9] flex flex-col px-8 pt-7 pb-10 shadow-2xl transition-transform duration-300 ease-out ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="self-end p-2 -mr-2 mb-10 text-[#F2EBD9]"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="6" y1="6" x2="18" y2="18"></line>
              <line x1="18" y1="6" x2="6" y2="18"></line>
            </svg>
          </button>

          <div className="flex flex-col">
            {NAV_LINKS.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                onMouseEnter={() => handleNavHover(href)}
                className={`py-4 border-b border-[#F2EBD9]/15 text-lg font-medium tracking-wide transition-colors hover:text-white ${label === "JOIN ZIPPY" ? "text-[#FFEF60] font-black" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

