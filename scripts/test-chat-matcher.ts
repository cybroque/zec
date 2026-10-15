import { chatFaqs } from "../src/data/chatFaqs.ts";
import { findBestMatch, scoreFaq } from "../src/components/chat/matcher.ts";

const EXPECTED: Array<[query: string, expectedId: string | null]> = [
  // Should match
  ["I have never ridden before", "faq-beginner"],
  ["how much does it cost", "faq-fees"],
  ["what are your fees", "faq-fees"],
  ["pricing", "faq-fees"],
  ["i want to book a trial ride", "faq-book"],
  ["booking", "faq-book"],
  ["do i need my own horse", "faq-own-horse"],
  ["what time do you open", "faq-timings"],
  ["timings", "faq-timings"],
  ["do you teach kids", "faq-kids"],
  ["my child wants to ride", "faq-kids"],
  ["what should i wear", "faq-gear"],
  ["do i need boots", "faq-gear"],
  ["where are you located", "faq-location"],
  ["address please", "faq-location"],
  ["can i compete", "faq-competition"],
  ["do you do birthday parties", "faq-other"],
  ["corporate events", "faq-other"],
  ["I've never ridden before. Can I still join?", "faq-beginner"],
  ["show me programs", null], // no program FAQ -> fallback
  // Should NOT match (fallback to WhatsApp)
  ["what is the capital of france", null],
  ["zzzz qqqq", null],
  ["asdfgh", null],
];

let failures = 0;

for (const [query, expectedId] of EXPECTED) {
  const match = findBestMatch(query, chatFaqs);
  const actualId = match?.id ?? null;
  const ok = actualId === expectedId;

  if (!ok) {
    failures += 1;
    const top = chatFaqs
      .map((faq) => ({ id: faq.id, score: scoreFaq(query, faq) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    console.log(
      `FAIL  "${query}"\n      expected ${expectedId ?? "null"}, got ${actualId ?? "null"}\n      top: ${JSON.stringify(top)}`
    );
  } else {
    console.log(`pass  "${query}" -> ${actualId ?? "null"}`);
  }
}

console.log(failures === 0 ? "\nAll matcher tests passed." : `\n${failures} test(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
