export interface ChatFaq {
  id: string;
  question: string;
  answer: string;
  keywords?: string[];
  linkLabel?: string;
  linkUrl?: string;
}

/**
 * Fallback Q&A used until a matching "Chatbot Q&A" document is published in
 * the Sanity Studio. Order here is the order shown in the quick-reply chips.
 */
export const chatFaqs: ChatFaq[] = [
  {
    id: "faq-beginner",
    question: "I've never ridden before. Can I still join?",
    answer:
      "Absolutely — most of our riders arrive as complete beginners. Your first session is a private assessment where we match you with a calm schoolmaster horse and a coach who works at your pace. No prior experience or fitness level required.",
    keywords: ["beginner", "new", "first time", "never ridden", "start", "experience"],
    linkLabel: "See beginner programs",
    linkUrl: "/programs",
  },
  {
    id: "faq-book",
    question: "How do I book a trial ride?",
    answer:
      "Message us on WhatsApp or call the centre and we'll slot you into a 30-minute trial ride. It usually runs from 30 minutes away, and there's no obligation to continue afterwards.",
    keywords: ["book", "trial", "reserve", "appointment", "demo", "session"],
    linkLabel: "Book via contact page",
    linkUrl: "/contact",
  },
  {
    id: "faq-own-horse",
    question: "Do I need my own horse?",
    answer:
      "No. We have a full herd of schoolmasters, sport horses and ponies here, and the horse is included in your lesson. If you do own a horse, we also offer lessons on your own mount once you're riding confidently.",
    keywords: ["own horse", "horse provided", "buy horse", "lease", "stable", "stall"],
  },
  {
    id: "faq-fees",
    question: "What are the fees?",
    answer:
      "Fees depend on whether you ride in a group or private session, and on the program. Trial rides and monthly plans are the most common starting points. Send us a WhatsApp message with the program you're eyeing and we'll share the exact pricing.",
    keywords: ["price", "cost", "fee", "fees", "charges", "rate", "pricing", "membership", "how much"],
    linkLabel: "Browse programs",
    linkUrl: "/programs",
  },
  {
    id: "faq-timings",
    question: "What are your timings?",
    answer:
      "We run sessions across the day, with morning and evening slots being the busiest. Weekday slots are usually easier to book, and weekends fill up fastest. Message us for the next available time.",
    keywords: ["timing", "timings", "hours", "open", "slot", "schedule", "morning", "evening", "when"],
  },
  {
    id: "faq-kids",
    question: "Do you coach children?",
    answer:
      "Yes. We run dedicated junior programs built around correct fundamentals and plenty of fun — ponies, games and confidence-building. Children can typically start from around 5 or 6 years old.",
    keywords: ["child", "children", "kid", "kids", "junior", "juniors", "young", "age", "son", "daughter"],
  },
  {
    id: "faq-gear",
    question: "What should I wear or bring?",
    answer:
      "Wear trousers or leggings and closed shoes with a small heel — no sandals or trainers. Helmets are provided and are mandatory on the arena. Bring water and a hat if it's a sunny afternoon.",
    keywords: ["wear", "dress", "clothes", "gear", "helmet", "shoes", "boots", "bring", "kit"],
  },
  {
    id: "faq-location",
    question: "Where exactly are you located?",
    answer:
      "We're on Chikkanayakanahalli, off Sarjapur Road, near Carmelaram Railway Station in Bengaluru. We have ample parking, and the yard is fully shaded.",
    keywords: ["location", "where", "address", "directions", "map", "far", "distance", "address"],
    linkLabel: "Get directions",
    linkUrl: "/contact",
  },
  {
    id: "faq-competition",
    question: "Can you coach me for competitions?",
    answer:
      "Yes. Our instructors prepare riders for local and national level events, and we also compete on the centre's own horses. Tell us which discipline you're aiming for and we'll talk through a plan.",
    keywords: ["competition", "compete", "competitive", "events", "showjumping", "dressage", "level", "test"],
    linkLabel: "Meet the instructors",
    linkUrl: "/about",
  },
  {
    id: "faq-other",
    question: "What else do you offer besides lessons?",
    answer:
      "Beyond coaching we run birthday experiences, corporate team sessions, horse photography and content shoots, plus stalls and events from the yard. Tell us what you have in mind and we'll build something around it.",
    keywords: ["other", "else", "extra", "birthday", "corporate", "events", "photography", "shoot", "party"],
    linkLabel: "Beyond the ride",
    linkUrl: "/beyond",
  },
];
