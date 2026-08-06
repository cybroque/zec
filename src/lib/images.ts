export const IMAGES_BY_ROUTE: Record<string, string[]> = {
  "/": [
    "/assets/images/hero_main.webp",
    "/assets/images/r2.webp",
    "/assets/images/r3.webp",
    "/assets/images/r4.webp",
    "/assets/images/season1.webp",
    "/assets/images/season2.webp",
    "/assets/images/season3.webp",
    "/assets/images/zippybroncos.svg",
    "/assets/images/zippypremier.svg",
    "/assets/images/quotationmark.png",
  ],
  "/about": [
    "/assets/images/about-hero.webp",
    "/assets/images/about-main.webp",
    "/assets/images/aboutpattern.svg",
    "/assets/images/about-p1.png",
    "/assets/images/about-p2.png",
    "/assets/images/about-p3.png",
    "/assets/images/about-p4.png",
    "/assets/images/aboutpattern2.svg",
    "/assets/images/about-img2.png",
    "/assets/images/map2.svg",
    "/assets/images/people-c.webp",
    "/assets/images/herd0.webp",
    "/assets/images/herd1.webp",
    "/assets/images/herd2.webp",
    "/assets/images/herd3.webp",
    "/assets/images/herd4.webp",
    "/assets/images/herd5.webp",
    "/assets/images/herd6.webp",
    "/assets/images/about-map.svg",
  ],
  "/programs": [
    "/assets/images/pro-hero.webp",
    "/assets/images/program-img.svg",
    "/assets/images/d1.webp",
    "/assets/images/d2.webp",
    "/assets/images/d3.webp",
    "/assets/images/d4.webp",
    "/assets/images/d5.svg",
    "/assets/images/d6.webp",
    "/assets/images/d7.webp",
  ],
  "/beyond": [
    "/assets/images/beyond-hero.webp",
    "/assets/images/beyond.svg",
    "/assets/images/boarding.webp",
    "/assets/images/buy.webp",
    "/assets/images/eque.webp",
    "/assets/images/franchise.webp",
    "/assets/images/horse-training.webp",
    "/assets/images/horse.webp",
    "/assets/images/photo.webp",
    "/assets/images/summer-camp.webp",
    "/assets/images/top.svg",
    "/assets/images/venue.webp",
    "/assets/images/know-more.png",
  ],
  "/stories": [
    "/assets/images/riders-hero.webp",
    "/assets/images/rider1.webp",
    "/assets/images/rider2.webp",
    "/assets/images/rider3.webp",
    "/assets/images/rider4.webp",
    "/assets/images/rider5.webp",
    "/assets/images/rider6.webp",
    "/assets/images/rider7.webp",
    "/assets/images/rider8.webp",
    "/assets/images/rider9.webp",
    "/assets/images/g1.webp",
    "/assets/images/g2.webp",
    "/assets/images/g3.webp",
    "/assets/images/g4.webp",
    "/assets/images/g5.webp",
    "/assets/images/g6.webp",
    "/assets/images/g7.webp",
  ],
  "/contact": [
    "/assets/images/g1.webp",
    "/assets/images/g2.webp",
    "/assets/images/g3.webp",
    "/assets/images/g4.webp",
    "/assets/images/g5.webp",
    "/assets/images/g6.webp",
    "/assets/images/g7.webp",
    "/assets/images/contact-map.svg",
  ],
};

const COMMON_IMAGES = [
  "/assets/images/zippylogo-dark.svg",
  "/assets/images/zippylogo2.svg",
  "/assets/images/zippyfooter1.svg",
  "/assets/images/zippyfooter2.svg",
];

const ROUTES = Object.keys(IMAGES_BY_ROUTE);

export function routeForPath(pathname: string): string {
  for (const route of ROUTES) {
    if (pathname === route) return route;
    if (route !== "/" && pathname.startsWith(route)) return route;
  }
  return "/";
}

export function imagesForRoute(route: string): string[] {
  const page = IMAGES_BY_ROUTE[route] ?? [];
  return Array.from(new Set([...COMMON_IMAGES, ...page]));
}
