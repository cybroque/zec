"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

interface HeaderProps {
  theme?: "dark" | "light";
}

export default function Header({ theme = "dark" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 50);
      setIsVisible(currentY < 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isLight = theme === "light";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${isScrolled ? "bg-black/20 backdrop-blur-md py-4" : "bg-transparent py-8"} ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
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
        <nav className="hidden lg:flex items-center bg-[#F2EBD9] backdrop-blur-sm rounded-md overflow-hidden h-14 shadow-xl">
          <Link href="/" className="px-6 py-2 text-[11px] font-medium tracking-widest text-[#85431E] hover:text-[#DA7347] transition-colors">HOME</Link>
          <Link href="/about" className="px-6 py-2 text-[11px] font-medium tracking-widest text-[#85431E] hover:text-[#DA7347] transition-colors">ABOUT</Link>
          <Link href="/programs" className="px-6 py-2 text-[11px] font-medium tracking-widest text-[#85431E] hover:text-[#DA7347] transition-colors">PROGRAMS</Link>
          <Link href="/stories" className="px-6 py-2 text-[11px] font-medium tracking-widest text-[#85431E] hover:text-[#DA7347] transition-colors">RIDERS STORIES</Link>
          <Link href="/beyond" className="px-6 py-2 text-[11px] font-medium tracking-widest text-[#85431E] hover:text-[#DA7347] transition-colors">BEYOND THE RIDE</Link>
          <Link href="/contact" className="px-8 py-2 h-full flex items-center bg-[#F2EBD9] text-[#85431E] font-black text-xs tracking-widest hover:bg-[#DA7347] hover:text-[#F2EBD9] transition-all">JOIN ZIPPY</Link>
          
          {/* Hamburger menu inside nav block for light theme */}
          {isLight && (
            <button className="px-4 h-full flex items-center text-[#85431E] border-l border-[#85431E]/20 hover:bg-[#DA7347] hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          )}
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
