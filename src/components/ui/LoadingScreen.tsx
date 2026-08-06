"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { routeForPath, imagesForRoute } from "@/lib/images";

const MIN_VISIBLE_MS = 1200;
const PRELOAD_TIMEOUT_MS = 8000;
const SAFETY_TIMEOUT_MS = 6000;

type Phase = "hidden" | "loading" | "fading";

/**
 * LoadingScreen — branded full-screen splash (logo + animated bar).
 *
 * Shows on the first load / refresh and on every client-side page change.
 * While visible it eagerly preloads every image on the target route so the
 * page only appears once its images are fully fetched. It always stays
 * visible for at least MIN_VISIBLE_MS so the loading state is noticeable,
 * and never blocks beyond SAFETY_TIMEOUT_MS.
 */
export default function LoadingScreen() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("loading");

  const routeRef = useRef<string | null>(null);
  const arrivedRef = useRef(false);
  const preloadDoneRef = useRef(false);
  const completedRef = useRef(false);
  const startedAtRef = useRef(0);
  const firstRunRef = useRef(true);
  const pendingNavRef = useRef<string | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const fade = () => {
    setPhase("fading");
    timersRef.current.push(setTimeout(() => setPhase("hidden"), 700));
  };

  const complete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    const elapsed = Date.now() - startedAtRef.current;
    const delay = Math.max(0, MIN_VISIBLE_MS - elapsed);
    timersRef.current.push(setTimeout(fade, delay));
  };

const loadedImages = new Set<string>();

const preload = (route: string): Promise<void> => {
  const urls = imagesForRoute(route);
  return Promise.all(
    urls.map((url) => {
      if (loadedImages.has(url)) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const img = new window.Image();
        const t = setTimeout(() => resolve(), PRELOAD_TIMEOUT_MS);
        img.onload = () => {
          clearTimeout(t);
          resolve();
        };
        img.onerror = () => {
          clearTimeout(t);
          resolve();
        };
        img.src = url;
      }).then(() => {
        loadedImages.add(url);
      });
    })
  ).then(() => undefined);
};

  const beginNav = (route: string) => {
    clearTimers();
    routeRef.current = route;
    arrivedRef.current = false;
    preloadDoneRef.current = false;
    completedRef.current = false;
    startedAtRef.current = Date.now();
    setPhase("loading");
    preload(route).then(() => {
      preloadDoneRef.current = true;
      if (routeRef.current === route && arrivedRef.current) complete();
    });
    timersRef.current.push(setTimeout(() => complete(), SAFETY_TIMEOUT_MS));
  };

  // Intercept same-origin link clicks → start loading before navigation
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || anchor.getAttribute("target") === "_blank") return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const target = routeForPath(url.pathname);
      if (target === routeForPath(window.location.pathname)) return;
      pendingNavRef.current = target;
      beginNav(target);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Route arrival → mark arrived, complete when preloads are done
  useEffect(() => {
    const route = routeForPath(pathname);
    const pending = pendingNavRef.current;
    pendingNavRef.current = null;

    if (firstRunRef.current) {
      firstRunRef.current = false;
      // Initial load / refresh — content is already rendered underneath
      beginNav(route);
      arrivedRef.current = true;
      if (preloadDoneRef.current) complete();
      return;
    }

    if (pending && pending === route) {
      arrivedRef.current = true;
    } else {
      // Back / forward / address-bar navigation
      beginNav(route);
      arrivedRef.current = true;
    }
    if (preloadDoneRef.current) complete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (phase === "hidden") return null;

  return (
    <div
      aria-label="Loading Zippy Equestrian Center"
      role="status"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF8E5]"
      style={{
        transition: "opacity 0.7s ease",
        opacity: phase === "fading" ? 0 : 1,
        pointerEvents: phase === "fading" ? "none" : "all",
      }}
    >
      <div className="relative w-40 h-20 mb-12">
        <Image
          src="/assets/images/zippylogo-dark.svg"
          alt="Zippy Equestrian Center"
          fill
          priority
          className="object-contain select-none"
        />
      </div>

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
