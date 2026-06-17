"use client";

import React, { ReactNode } from "react";

interface HoverImageProps {
  children: ReactNode;
  className?: string;
}

export default function HoverImage({ children, className = "" }: HoverImageProps) {
  return (
    <div className={`group overflow-hidden ${className}`}>
      <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
        {children}
      </div>
    </div>
  );
}
