"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * SiteLoader — branded full-screen splash shown only on the very first visit
 * this session. Once the hero image fires, it fades away and never reappears
 * (sessionStorage-gated). Always times out after 5 seconds as a safety net.
 */
export default function SiteLoader() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Skip on subsequent page navigations within the same session
    if (typeof sessionStorage !== "undefined" && sessionStorage.getItem("zec_loaded")) {
      return;
    }
    setVisible(true);

    const dismiss = () => {
      sessionStorage.setItem("zec_loaded", "1");
      setFading(true);
      setTimeout(() => setVisible(false), 700);
    };

    // Preload the hero image; dismiss when it's ready
    const img = new window.Image();
    img.src = "/assets/images/hero_main.webp";

    if (img.complete) {
      // Cached — still give a brief moment so the logo renders
      const brief = setTimeout(dismiss, 300);
      return () => clearTimeout(brief);
    }

    img.onload = dismiss;

    // Safety valve — never block for more than 5 seconds
    const timeout = setTimeout(dismiss, 5000);
    return () => {
      clearTimeout(timeout);
      img.onload = null;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading Zippy Equestrian Center"
      role="status"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF8E5]"
      style={{
        transition: "opacity 0.7s ease",
        opacity: fading ? 0 : 1,
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Logo */}
      <Image
        src="/assets/images/zippylogo-dark.svg"
        alt="Zippy Equestrian Center"
        width={160}
        height={80}
        priority
        className="mb-12 select-none"
      />

      {/* Animated loading bar */}
      <div className="w-48 h-[1px] bg-[#DA7347]/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#DA7347] rounded-full"
          style={{ animation: "zec-loader-bar 2s ease-in-out infinite" }}
        />
      </div>

      <style>{`
        @keyframes zec-loader-bar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 70%;  margin-left: 15%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
