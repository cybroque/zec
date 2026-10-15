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
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(" ")
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));

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
  let best: ChatFaq | null = null;
  let bestScore = 0;

  for (const faq of faqs) {
    const score = scoreFaq(query, faq);
    if (score > bestScore) {
      bestScore = score;
      best = faq;
    }
  }

  return bestScore >= MATCH_THRESHOLD ? best : null;
}
