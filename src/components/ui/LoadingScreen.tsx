"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { routeForPath, imagesForRoute } from "@/lib/images";

gsap.registerPlugin(SplitText);

const WORD = "ZIPPY";

const MIN_VISIBLE_MS = 1200;
const PRELOAD_TIMEOUT_MS = 8000;
const SAFETY_TIMEOUT_MS = 6000;

type Phase = "hidden" | "loading" | "fading";

/**
 * LoadingScreen — branded full-screen splash: full-bleed "ZIPPY" whose
 * characters slide up from behind a mask (GSAP SplitText) with a 0%→100%
 * counter top-right; on exit the word slides off to the right.
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

  const rootRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null);

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

  // Intro reveal — replays every time the loader (re)enters the loading phase.
  // Each ZIPPY character slides in from the left, one after another, into its
  // slot (GSAP SplitText masks each letter).
  useEffect(() => {
    if (phase !== "loading") return;
    const word = wordRef.current;
    if (!word) return;

    splitRef.current?.revert();

    // Fit the word to the full viewport width (edge to edge) before splitting
    // so each letter mask is sized at the final scale. The 0.99 keeps the end
    // glyphs from clipping at the screen edges.
    const box = word.parentElement;
    const parentW = box?.clientWidth ?? window.innerWidth;
    const naturalW = word.getBoundingClientRect().width;
    if (naturalW > 0) {
      const curPx = parseFloat(getComputedStyle(word).fontSize);
      word.style.fontSize = `${(curPx * parentW * 0.99) / naturalW}px`;
    }

    const split = new SplitText(word, { type: "chars", mask: "chars" });
    splitRef.current = split;

    // Reveal only once the word has been fitted + split, so the un-fitted
    // clamp-size text never flashes on screen first.
    gsap.set(word, { autoAlpha: 1 });
    const tl = gsap.timeline();
    tl.from(split.chars, {
      xPercent: -140,
      duration: 0.7,
      ease: "power4.out",
      stagger: 0.11,
    });

    return () => {
      tl.kill();
    };
  }, [phase]);

  // Exit — each letter slides off to the right and vanishes, one after another.
  useEffect(() => {
    if (phase !== "fading") return;
    const chars = splitRef.current?.chars;
    if (chars) {
      gsap.to(chars, {
        xPercent: 140,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.07,
      });
    }
  }, [phase]);

  // Free the SplitText DOM wrappers when the loader unmounts for good.
  useEffect(() => () => splitRef.current?.revert(), []);

  if (phase === "hidden") return null;

  return (
    <div
      ref={rootRef}
      aria-label="Loading Zippy Equestrian Center"
      role="status"
      className="site-loader fixed inset-0 z-[9999] overflow-hidden bg-[#85431E]"
      style={{
        transition: "opacity 0.7s ease",
        opacity: phase === "fading" ? 0 : 1,
        pointerEvents: phase === "fading" ? "none" : "all",
      }}
    >
      <div className="absolute inset-x-0 bottom-0 h-1/2 flex items-center justify-center">
        <div
          ref={wordRef}
          aria-hidden
          className="whitespace-nowrap opacity-0 font-[family-name:var(--font-ultra)] font-black uppercase leading-[0.8] tracking-normal text-[#DA7347] text-[clamp(6rem,27vw,26rem)]"
        >
          {WORD}
        </div>
      </div>
    </div>
  );
}
