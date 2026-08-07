export const IMAGES_BY_ROUTE: Record<string, string[]> = {
  "/": [
    "/assets/images/HomePage/Webp/Hero.webp",
    "/assets/images/HomePage/Webp/ridewithus1.webp",
    "/assets/images/HomePage/Webp/ridewithus2.webp",
    "/assets/images/HomePage/Webp/ridewithus3.webp",
    "/assets/images/HomePage/Webp/summercamp.webp",
    "/assets/images/HomePage/Webp/party.webp",
    "/assets/images/HomePage/Webp/photoshoot.webp",
    "/assets/images/zippybroncos.svg",
    "/assets/images/zippypremier.svg",
    "/assets/images/quotationmark.png",
  ],
  "/about": [
    "/assets/images/About/Webp/hero.webp",
    "/assets/images/About/Webp/Founding_Partner.webp",
    "/assets/images/aboutpattern.svg",
    "/assets/images/About/Webp/about-p1.webp",
    "/assets/images/About/Webp/about-p2.webp",
    "/assets/images/About/Webp/about-p3.webp",
    "/assets/images/About/Webp/about-p4.webp",
    "/assets/images/aboutpattern2.svg",
    "/assets/images/About/Webp/about-img2.webp",
    "/assets/images/map2.svg",
    "/assets/images/About/Webp/people-c.webp",
    "/assets/images/About/Webp/herd0.webp",
    "/assets/images/About/Webp/herd1.webp",
    "/assets/images/About/Webp/herd2.webp",
    "/assets/images/About/Webp/herd3.webp",
    "/assets/images/About/Webp/herd4.webp",
    "/assets/images/About/Webp/herd5.webp",
    "/assets/images/About/Webp/herd6.webp",
    "/assets/images/about-map.svg",
  ],
  "/programs": [
    "/assets/images/Programs/Webp/Hero.webp",
    "/assets/images/Programs/Webp/p1.webp",
    "/assets/images/Programs/Webp/r1.webp",
    "/assets/images/Programs/Webp/r2.webp",
    "/assets/images/Programs/Webp/r3.webp",
    "/assets/images/Programs/Webp/r4.webp",
    "/assets/images/Programs/Webp/r5.webp",
    "/assets/images/Programs/Webp/r6.webp",
    "/assets/images/Programs/Webp/r7.webp",
  ],
  "/beyond": [
    "/assets/images/BeyondRide/Webp/beyond-hero.webp",
    "/assets/images/beyond.svg",
    "/assets/images/BeyondRide/Webp/boarding.webp",
    "/assets/images/BeyondRide/Webp/buy.webp",
    "/assets/images/BeyondRide/Webp/eque.webp",
    "/assets/images/BeyondRide/Webp/franchise.webp",
    "/assets/images/BeyondRide/Webp/horse-training.webp",
    "/assets/images/BeyondRide/Webp/horse.webp",
    "/assets/images/BeyondRide/Webp/photo.webp",
    "/assets/images/BeyondRide/Webp/summer-camp.webp",
    "/assets/images/top.svg",
    "/assets/images/BeyondRide/Webp/venue.webp",
  ],
  "/stories": [
    "/assets/images/Rider_stories/Webp/riders-hero.webp",
    "/assets/images/Contact/Webp/g1.webp",
    "/assets/images/Contact/Webp/g2.webp",
    "/assets/images/Contact/Webp/g3.webp",
    "/assets/images/Contact/Webp/g4.webp",
    "/assets/images/Contact/Webp/g5.webp",
    "/assets/images/Contact/Webp/g6.webp",
    "/assets/images/Contact/Webp/g7.webp",
  ],
  "/contact": [
    "/assets/images/Contact/Webp/g1.webp",
    "/assets/images/Contact/Webp/g2.webp",
    "/assets/images/Contact/Webp/g3.webp",
    "/assets/images/Contact/Webp/g4.webp",
    "/assets/images/Contact/Webp/g5.webp",
    "/assets/images/Contact/Webp/g6.webp",
    "/assets/images/Contact/Webp/g7.webp",
    "/assets/images/insta-bg.svg",
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
