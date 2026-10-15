"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { ChatFaq } from "@/data/chatFaqs";
import { findBestMatch } from "./matcher";

const WHATSAPP_NUMBER = "919882988267";

type Message = {
  id: string;
  from: "bot" | "user";
  text: string;
  link?: { label: string; url: string };
  isFallback?: boolean;
};

/* ------------------------------------------------------------------ */
/* Icons                                                              */
/* ------------------------------------------------------------------ */

const HorseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.5 7.05c-.47-.79-1.2-1.39-2.07-1.72l-2.93-1.1c-.65-.24-1.37-.17-1.96.2L10.2 6.1c-.34.22-.76.32-1.17.27L6.8 6.09c-.9-.12-1.74.37-2.06 1.22l-.76 2.01c-.13.34-.06.72.18.99.24.27.62.37.97.26l1.45-.45c.42-.13.88.01 1.17.35l2.25 2.65c.34.4.52.92.52 1.45v5.43c0 .55.45 1 1 1h1.5c.55 0 1-.45 1-1v-4.5c0-.28.22-.5.5-.5h.5c.28 0 .5.22.5.5v4.5c0 .55.45 1 1 1H19c.55 0 1-.45 1-1v-8c0-1.04-.42-2.05-1.17-2.79l.67-.91z" />
  </svg>
);

const WhatsAppIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const GREETING =
  "Hello there! 👋 Welcome to Zippy Equestrian Center. How can I help you today? You can ask me about our riding lessons, trial rides, timings, membership fees, or locations.";

const FALLBACK =
  "I don't have an exact answer for that yet. Our team replies quickly on WhatsApp — tap below to chat directly with us!";

export default function ChatWidget({
  faqs,
  isOpen,
  onClose,
}: {
  faqs: ChatFaq[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: "greeting", from: "bot", text: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // Quick suggestions: prioritize helpful questions, filter out greeting intents
  const suggestions = useMemo(() => {
    return faqs
      .filter((faq) => {
        const id = faq?.id || (faq as { _id?: string })?._id || "";
        return !id.startsWith("intent-");
      })
      .slice(0, 4);
  }, [faqs]);

  const toLink = (faq: ChatFaq) =>
    faq.linkLabel && faq.linkUrl
      ? { label: faq.linkLabel, url: faq.linkUrl }
      : undefined;

  const pushBotMessage = useCallback(
    (message: Omit<Message, "id" | "from">) => {
      replyTimer.current = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { ...message, id: makeId(), from: "bot" }]);
      }, 480);
    },
    []
  );

  const answerWith = useCallback(
    (faq: ChatFaq) => {
      setIsTyping(true);
      pushBotMessage({ text: faq.answer, link: toLink(faq) });
    },
    [pushBotMessage]
  );

  const respond = useCallback(
    (rawQuery: string) => {
      const match = findBestMatch(rawQuery, faqs);

      if (match) {
        answerWith(match);
      } else {
        setIsTyping(true);
        pushBotMessage({ text: FALLBACK, isFallback: true });
      }
    },
    [faqs, answerWith, pushBotMessage]
  );

  const send = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      const chip = suggestions.find((faq) => faq.question === trimmed);
      setMessages((prev) => [...prev, { id: makeId(), from: "user", text: trimmed }]);
      setInput("");

      if (chip) answerWith(chip);
      else respond(trimmed);
    },
    [isTyping, suggestions, answerWith, respond]
  );

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    return () => {
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(focusTimer);
    }
  }, [isOpen]);

  const lastMessage = messages[messages.length - 1];
  const showSuggestions = isOpen && lastMessage?.from === "bot" && !isTyping;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="chat-panel"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Chat with Zippy Equestrian Center"
          className="fixed bottom-[84px] right-3 left-3 z-[55] sm:left-auto sm:right-6 sm:bottom-[88px] sm:w-[380px] flex flex-col overflow-hidden rounded-md bg-[#FFFDF9] shadow-[0_20px_50px_rgba(26,26,26,0.28)] border border-[#85431E]/20"
          style={{ maxHeight: "min(500px, calc(100dvh - 120px))" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-gradient-to-r from-[#85431E] via-[#753917] to-[#5C2B10] text-[#FFF8F0] shrink-0 border-b border-[#F2EBD9]/10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-to-br from-[#DA7347] to-[#85431E] text-white shadow-sm ring-1 ring-[#F2EBD9]/25">
                  <HorseIcon />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 border border-[#85431E] bg-[#25D366]" />
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold tracking-wide">ZEC Concierge</p>
                  <span className="rounded bg-white/20 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider text-[#FFF8F0] border border-white/20">
                    AI
                  </span>
                </div>
                <p className="text-[11px] font-normal text-[#F2EBD9]/80 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
                  <span>Typically replies instantly</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Direct WhatsApp"
                title="Chat with team on WhatsApp"
                className="rounded-md p-1.5 text-[#FFF8F0]/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
              >
                <WhatsAppIcon size={16} />
              </a>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                className="rounded-md p-1.5 text-[#FFF8F0]/80 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F2EBD9]/70"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            aria-live="polite"
            className="no-scrollbar flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#FFFDF9]"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed rounded-md ${
                    message.from === "user"
                      ? "bg-gradient-to-r from-[#DA7347] to-[#C96337] text-[#FFFDF9] font-normal shadow-xs"
                      : "bg-[#F2EADF] text-[#3D2214] font-normal shadow-xs border border-[#85431E]/10"
                  }`}
                >
                  <p className="whitespace-pre-line">{message.text}</p>

                  {message.link && (
                    <Link
                      href={message.link.url}
                      onClick={onClose}
                      className="mt-2.5 inline-flex items-center gap-1.5 rounded-md bg-[#85431E] px-3 py-1.5 text-[11.5px] font-medium text-[#FFF8F0] shadow-xs transition-colors hover:bg-[#6D3415]"
                    >
                      {message.link.label}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}

                  {message.isFallback && (
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onClose}
                      className="mt-2.5 flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-3.5 py-2 text-[12px] font-medium text-white shadow-xs transition-all hover:bg-[#20ba59]"
                    >
                      <WhatsAppIcon size={15} />
                      Chat on WhatsApp
                    </a>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-md bg-[#F2EADF] px-3.5 py-2.5 shadow-xs border border-[#85431E]/10 w-fit">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-2 w-2 rounded-full bg-[#DA7347]"
                      style={{ animation: "chat-typing 1.2s ease-in-out infinite", animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick replies */}
          {showSuggestions && (
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2.5 shrink-0 bg-[#F6F0E4]/70 border-t border-[#85431E]/8">
              {suggestions.map((faq, index) => (
                <button
                  key={faq.id || (faq as { _id?: string })._id || `faq-chip-${index}`}
                  type="button"
                  onClick={() => send(faq.question)}
                  className="shrink-0 rounded-md border border-[#DA7347]/30 bg-white/95 px-3 py-1.5 text-left text-[11.5px] font-medium text-[#85431E] shadow-xs transition-all hover:border-[#DA7347] hover:bg-[#DA7347] hover:text-white active:scale-95 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#DA7347]/40"
                >
                  {faq.question}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-[#85431E]/10 bg-[#FBF7F0] px-3 py-2.5 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything about riding lessons, visits…"
              aria-label="Ask anything about riding lessons, visits"
              className="min-w-0 flex-1 rounded-md border border-[#85431E]/20 bg-white px-3.5 py-2 text-[13px] font-normal text-[#3D2214] placeholder:text-[#85431E]/45 focus:border-[#DA7347] focus:outline-none focus:ring-1 focus:ring-[#DA7347]/30 transition-all shadow-inner-xs"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-to-r from-[#DA7347] to-[#C96337] text-white shadow-xs transition-all hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:shadow-none focus:outline-none focus-visible:ring-1 focus-visible:ring-[#DA7347]/40"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12L20 4L14 20L12 13L4 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          {/* Powered by Cybroque Badge */}
          <div className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#F4EFE5] border-t border-[#85431E]/8 text-[10.5px] tracking-wider uppercase text-[#85431E]/70 font-medium select-none">
            <span>Powered by</span>
            <a
              href="https://cybroque.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#85431E] hover:text-[#DA7347] transition-colors group"
            >
              <span>Cybroque</span>
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                aria-hidden="true"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

