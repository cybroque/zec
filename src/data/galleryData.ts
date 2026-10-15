export interface GalleryItem {
  _id?: string;
  title: string;
  image: string;
  alt?: string;
  category?: string;
  instagramUrl?: string;
  order?: number;
}

const INSTA_LINK =
  "https://www.instagram.com/zippy.equestrian?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

export const defaultGalleryItems: GalleryItem[] = [
  {
    title: "Morning Arena Warm-up",
    image: "/assets/images/Contact/Webp/g1.webp",
    alt: "Morning arena riding lesson at Zippy Equestrian Center",
    category: "stables",
    instagramUrl: INSTA_LINK,
    order: 1,
  },
  {
    title: "Paddock Connection",
    image: "/assets/images/Contact/Webp/g2.webp",
    alt: "Gentle horse grooming and bonding at the stables",
    category: "horses",
    instagramUrl: INSTA_LINK,
    order: 2,
  },
  {
    title: "Canter Stride Focus",
    image: "/assets/images/Contact/Webp/g3.webp",
    alt: "Young rider training canter stride in outdoor arena",
    category: "riders",
    instagramUrl: INSTA_LINK,
    order: 3,
  },
  {
    title: "Showjumping Clear Round",
    image: "/assets/images/Contact/Webp/g4.webp",
    alt: "Equestrian jumping obstacle during training session",
    category: "competitions",
    instagramUrl: INSTA_LINK,
    order: 4,
  },
  {
    title: "Golden Hour Trail",
    image: "/assets/images/Contact/Webp/g5.webp",
    alt: "Sunset horse riding experience in South Bangalore",
    category: "stables",
    instagramUrl: INSTA_LINK,
    order: 5,
  },
  {
    title: "Stable Grounds & Courtyard",
    image: "/assets/images/Contact/Webp/g6.webp",
    alt: "Stable walkways and equine facilities at ZEC",
    category: "stables",
    instagramUrl: INSTA_LINK,
    order: 6,
  },
  {
    title: "Cadence & Trot Rhythm",
    image: "/assets/images/Contact/Webp/g7.webp",
    alt: "Rider practicing trot rhythm in the morning light",
    category: "riders",
    instagramUrl: INSTA_LINK,
    order: 7,
  },
];
