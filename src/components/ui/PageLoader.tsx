"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/lib/LoadingContext";

/**
 * PageLoader — thin orange progress bar at the top of the screen.
 *
 * Completes when:
 *   a) the hero image's onLoad fires (via LoadingContext.stopLoading), OR
 *   b) a 3-second safety timeout elapses — so it NEVER stays stuck.
 *
 * The `isLoading` guard uses a ref-based "session" counter so that an
 * isLoading=false left over from the previous page doesn't immediately
 * dismiss the bar before the new hero even mounts.
 */
export default function PageLoader() {
  const { isLoading } = useLoading();
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  // Track whether we've seen startLoading() at least once this navigation
  const loadingStartedRef = useRef(false);

  const dismiss = (delay = 400) => {
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, delay);
  };

  // New route → show bar, ramp to 85%, arm a 3s safety timeout
  useEffect(() => {
    loadingStartedRef.current = false; // reset for new page
    setProgress(0);
    setVisible(true);
    const ramp = setTimeout(() => setProgress(85), 80);

    // Safety valve — never stay stuck beyond 3 seconds
    const safety = setTimeout(() => dismiss(300), 3000);

    return () => {
      clearTimeout(ramp);
      clearTimeout(safety);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Hero image done → complete immediately (but only after startLoading was called)
  useEffect(() => {
    if (isLoading) {
      loadingStartedRef.current = true; // hero called startLoading
    }
    if (!isLoading && loadingStartedRef.current && visible) {
      dismiss();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

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

