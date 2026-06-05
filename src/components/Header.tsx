"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${isScrolled ? "bg-black/20 backdrop-blur-md py-4" : "bg-transparent py-8"}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-32 h-16 md:w-48 md:h-20 transition-transform group-hover:scale-105 duration-500">
            <Image
              src="/assets/images/zippylogo2.svg"
              alt="Zippy Equestrian Logo"
              fill
              unoptimized
              sizes="(max-width: 768px) 128px, 192px"
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center bg-[#F2EBD9] backdrop-blur-sm rounded-md overflow-hidden h-14 shadow-xl">
          <Link href="/" className="px-6 py-2 text-[11px] font-medium tracking-widest text-[#85431E] hover:text-zippy-orange transition-colors">HOME</Link>
          <Link href="/about" className="px-6 py-2 text-[11px] font-medium tracking-widest text-[#85431E] hover:text-zippy-orange transition-colors">ABOUT</Link>
          <Link href="/programs" className="px-6 py-2 text-[11px] font-medium tracking-widest text-[#85431E] hover:text-zippy-orange transition-colors">PROGRAMS</Link>
          <Link href="/stories" className="px-6 py-2 text-[11px] font-medium tracking-widest text-[#85431E] hover:text-zippy-orange transition-colors">RIDERS STORIES</Link>
          <Link href="/beyond" className="px-6 py-2 text-[11px] font-medium tracking-widest text-[#85431E] hover:text-zippy-orange transition-colors">BEYOND THE RIDE</Link>
          <Link href="/join" className="px-8 py-2 h-full flex items-center bg-[#F2EBD9] text-[#85431E] font-black text-xs tracking-widest  hover:bg-zippy-orange hover:text-[#F2EBD9] transition-all">JOIN ZIPPY</Link>
        </nav>

        {/* Mobile Menu Toggle - Simplified for now */}
        <button className="lg:hidden text-[#F2EBD9] p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </header>
  );
}
