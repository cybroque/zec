import type { ChatFaq } from "@/data/chatFaqs";

const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "am", "do", "does", "did", "i", "my", "me",
  "we", "you", "your", "can", "could", "of", "to", "in", "for", "on", "at",
  "and", "or", "what", "how", "be", "it", "this", "that", "please", "would",
  "like", "have", "has", "had", "with", "any", "there", "want", "need", "get",
  "tell", "about", "know", "s", "im", "ive", "u", "wanna", "got",
]);

export const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/(.)\1{2,}/g, "$1$1") // collapse 3+ repeated characters (e.g. hiiiii -> hii)
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));

export const CONVERSATIONAL_INTENTS: Record<string, ChatFaq> = {
  greeting: {
    id: "intent-greeting",
    question: "Hello / Hi",
    answer:
      "Hello there! 👋 Welcome to Zippy Equestrian Center. How can I help you today? You can ask me about our riding lessons, trial rides, timings, membership fees, or locations!",
    linkLabel: "Book a trial ride",
    linkUrl: "/contact",
  },
  howAreYou: {
    id: "intent-how-are-you",
    question: "How are you?",
    answer:
      "I'm doing great, thank you for asking! 🐴 Ready to assist you with everything related to horses, lessons, and riding at ZEC. What would you like to know?",
    linkLabel: "Explore programs",
    linkUrl: "/programs",
  },
  whoAreYou: {
    id: "intent-who-are-you",
    question: "Who are you?",
    answer:
      "I'm ZEC's AI Concierge! I'm here to answer your questions about horse riding programs, trial ride bookings, coaching for adults & kids, and visits to our Sarjapur center.",
    linkLabel: "About our center",
    linkUrl: "/about",
  },
  thanks: {
    id: "intent-thanks",
    question: "Thank you",
    answer:
      "You're very welcome! 😊 Feel free to ask if there's anything else you'd like to know, or reach out to our team directly on WhatsApp.",
    linkLabel: "Contact Us",
    linkUrl: "/contact",
  },
  goodbye: {
    id: "intent-goodbye",
    question: "Goodbye",
    answer:
      "Goodbye! 🐎 We look forward to seeing you at the stables soon. Have a wonderful day ahead!",
  },
  humanContact: {
    id: "intent-human-contact",
    question: "Can I speak to someone?",
    answer:
      "Our team is always happy to speak with you directly! You can call or chat with us on WhatsApp at +91 98829 88267.",
    linkLabel: "Chat on WhatsApp",
    linkUrl: "https://wa.me/919882988267",
  },
};

/**
 * Detects common conversational expressions like "hi", "hii", "hello", "hey",
 * "good morning", "how are you", "who are you", "thanks", "bye", etc.
 */
export function detectConversationalIntent(query: string): ChatFaq | null {
  const norm = normalize(query);
  if (!norm) return null;

  // 1. Greetings: "hi", "hii", "hiii", "hello", "hey", "heyy", "hola", "namaste", "good morning", etc.
  if (
    /^(hi+|hey+|hello+|hola|namaste|howdy|yo|sup|wassup|good (morning|afternoon|evening|day))(\s+(there|zippy|zec|team|bot|friend|sir|mam|all))?$/i.test(
      norm
    )
  ) {
    return CONVERSATIONAL_INTENTS.greeting;
  }

  // 2. How are you / status
  if (
    /^(how are you|how r u|how are u|how do you do|how is it going|hows it going|how are you doing|hope you are well)/i.test(
      norm
    )
  ) {
    return CONVERSATIONAL_INTENTS.howAreYou;
  }

  // 3. Who are you / identity
  if (
    /^(who are you|who r u|who are u|what are you|what is this|what can you do|your name|what is your name)/i.test(
      norm
    )
  ) {
    return CONVERSATIONAL_INTENTS.whoAreYou;
  }

  // 4. Appreciation / thanks
  if (
    /^(thanks|thank you|thankyou|thx|ty|thank you so much|thanks a lot|great|awesome|perfect|cool|ok|okay|got it|sounds good)(\s.*)?$/i.test(
      norm
    )
  ) {
    return CONVERSATIONAL_INTENTS.thanks;
  }

  // 5. Goodbyes / farewells
  if (
    /^(bye|goodbye|good bye|cya|see you|see ya|take care|have a good day|good night)$/i.test(
      norm
    )
  ) {
    return CONVERSATIONAL_INTENTS.goodbye;
  }

  // 6. Speak to a human / WhatsApp / phone
  if (
    /(talk to (a )?(human|person|agent|team)|call (me|you|us)|phone number|contact number|speak to someone|customer care)/i.test(
      norm
    )
  ) {
    return CONVERSATIONAL_INTENTS.humanContact;
  }

  return null;
}

/**
 * Ranks a FAQ against what the visitor typed. Deliberately simple — no model,
 * just keyword and token overlap. Anything below MATCH_THRESHOLD falls through
 * to a "ask a human on WhatsApp" reply rather than guessing.
 */
export function scoreFaq(query: string, faq: ChatFaq): number {
  const normalizedQuery = normalize(query);
  const tokens = tokenize(query);
  if (tokens.length === 0) return 0;

  const question = normalize(faq.question);
  const keywords = (faq.keywords ?? []).map(normalize);

  let score = 0;

  if (normalizedQuery === question) score += 10;
  else if (normalizedQuery.length >= 4 && question.includes(normalizedQuery)) score += 6;

  for (const keyword of keywords) {
    if (keyword && normalizedQuery.includes(keyword)) score += 5;
  }

  for (const token of tokens) {
    if (keywords.some((k) => k.includes(token) || token.includes(k))) score += 3;
    else if (question.includes(token)) score += 2;
  }

  // Reward consecutive word pairs so multi-word questions outrank single words.
  for (let i = 0; i < tokens.length - 1; i += 1) {
    if (question.includes(`${tokens[i]} ${tokens[i + 1]}`)) score += 4;
  }

  return score;
}

export const MATCH_THRESHOLD = 4;

export function findBestMatch(query: string, faqs: ChatFaq[]): ChatFaq | null {
  // 1. Check if it matches an FAQ with strong confidence
  let best: ChatFaq | null = null;
  let bestScore = 0;

  for (const faq of faqs) {
    const score = scoreFaq(query, faq);
    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }

  if (best && bestScore >= MATCH_THRESHOLD) {
    return best;
  }

  // 2. Check conversational greetings and pleasantries
  const conversationalMatch = detectConversationalIntent(query);
  if (conversationalMatch) {
    return conversationalMatch;
  }

  return null;
}

