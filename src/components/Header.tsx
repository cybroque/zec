"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface HeaderProps {
  theme?: "dark" | "light";
  disableThemeChangeOnScroll?: boolean;
  navVariant?: "default" | "cream";
}

export default function Header({ theme = "dark", disableThemeChangeOnScroll = false, navVariant = "default" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      
      // Switch to light theme when scrolling past the hero section (~100vh)
      // Minus 80px to transition smoothly right as it crosses the boundary
      setIsPastHero(currentY > window.innerHeight - 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = theme === "light" || (!disableThemeChangeOnScroll && isPastHero);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans bg-transparent ${isScrolled ? "py-4" : "py-8"}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-36 h-16 md:w-56 md:h-24 transition-transform group-hover:scale-105 duration-500">
            <Image
              src={isLight ? "/assets/images/zippylogo-dark.svg" : "/assets/images/zippylogo2.svg"}
              alt="Zippy Equestrian Logo"
              fill
              unoptimized
              sizes="(max-width: 768px) 144px, 224px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Navigation - Desktop */}
        <nav className={`hidden lg:flex items-center backdrop-blur-md rounded-md overflow-hidden h-14 shadow-xl border ${navVariant === 'cream' ? 'bg-[#FFF8E5]/90 border-[#85431E]/10' : (isLight ? 'bg-[#85431E]/80 border-white/20' : 'bg-[#DA7347]/70 border-white/10')}`}>
          <Link href="/" className={`px-6 py-2 text-[11px] font-medium transition-colors ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#F2EBD9] hover:text-white'}`}>HOME</Link>
          <Link href="/about" className={`px-6 py-2 text-[11px] font-medium transition-colors ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#F2EBD9] hover:text-white'}`}>ABOUT</Link>
          <Link href="/programs" className={`px-6 py-2 text-[11px] font-medium transition-colors ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#F2EBD9] hover:text-white'}`}>PROGRAMS</Link>
          <Link href="/stories" className={`px-6 py-2 text-[11px] font-medium transition-colors ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#F2EBD9] hover:text-white'}`}>RIDERS STORIES</Link>
          <Link href="/beyond" className={`px-6 py-2 text-[11px] font-medium transition-colors ${navVariant === 'cream' ? 'text-[#85431E] hover:text-[#DA7347]' : 'text-[#F2EBD9] hover:text-white'}`}>BEYOND THE RIDE</Link>
          <Link href="/contact" className={`px-8 py-2 h-full flex items-center font-black text-xs transition-all ${navVariant === 'cream' ? 'bg-[#85431E] text-[#FFF8E5] hover:bg-[#DA7347]' : 'bg-white text-[#DA7347]'}`}>JOIN ZIPPY</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className={`lg:hidden p-2 ${isLight ? 'text-[#85431E]' : 'text-[#F2EBD9]'}`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
