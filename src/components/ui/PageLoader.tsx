"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/lib/LoadingContext";

/**
 * PageLoader — thin orange progress bar at the top of the screen.
 * Runs on every route change and completes when the page's hero image
 * fires its onLoad event (via LoadingContext.stopLoading).
 */
export default function PageLoader() {
  const { isLoading } = useLoading();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // New route → reset and animate to 85%
  useEffect(() => {
    setProgress(0);
    setVisible(true);
    const ramp = setTimeout(() => setProgress(85), 80);
    return () => clearTimeout(ramp);
  }, [pathname]);

  // Hero image done → complete the bar, then hide
  useEffect(() => {
    if (!isLoading && visible) {
      setProgress(100);
      const hide = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(hide);
    }
  }, [isLoading, visible]);

  if (!visible) return null;

  return (
    <div
      role="progressbar"
      aria-label="Page loading"
      className="fixed top-0 left-0 right-0 z-[9998] h-[2px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-[#DA7347]"
        style={{
          width: `${progress}%`,
          transition:
            progress === 0
              ? "none"
              : progress === 100
              ? "width 0.2s ease"
              : "width 0.8s ease",
        }}
      />
    </div>
  );
}
