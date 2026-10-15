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
/* Component                                                           */
/* ------------------------------------------------------------------ */

const GREETING =
  "Hi there 👋 Welcome to Zippy Equestrian Center. Ask me anything about lessons, programs or booking a trial ride.";

const FALLBACK =
  "I don't have a quick answer for that one. Our team replies on WhatsApp faster than anyone — tap below and we'll get back to you.";

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

  const suggestions = useMemo(() => faqs.slice(0, 4), [faqs]);

  const toLink = (faq: ChatFaq) =>
    faq.linkLabel && faq.linkUrl
      ? { label: faq.linkLabel, url: faq.linkUrl }
      : undefined;

  const pushBotMessage = useCallback(
    (message: Omit<Message, "id" | "from">) => {
      replyTimer.current = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { ...message, id: makeId(), from: "bot" }]);
      }, 520);
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

      // Chips send their exact question string, so match those directly and
      // skip the matcher for anything the visitor types themselves.
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
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Chat with Zippy Equestrian Center"
            className="fixed bottom-[136px] right-4 left-4 z-[45] sm:left-auto sm:w-[368px] flex flex-col overflow-hidden bg-[#FFFBF2] shadow-[0_18px_50px_rgba(26,26,26,0.28)] border border-[#7A4027]/15"
            style={{ maxHeight: "min(560px, calc(100dvh - 180px))" }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between gap-3 px-4 py-3.5 text-[#F2EBD9] shrink-0"
              style={{ backgroundColor: "#85431E" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2EBD9]/15 text-[#F2EBD9] text-sm font-medium">
                    Z
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#85431E] bg-[#25D366]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">Zippy Assistant</p>
                  <p className="text-[11px] font-light opacity-75">Typically replies instantly</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                className="shrink-0 rounded-full p-1.5 opacity-80 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F2EBD9]/70"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              aria-live="polite"
              className="no-scrollbar flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed font-light ${
                      message.from === "user"
                        ? "bg-[#DA7347] text-[#FFF8E5]"
                        : "bg-[#F2EBD9] text-[#3D2214]"
                    }`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>

                    {message.link && (
                      <Link
                        href={message.link.url}
                        onClick={onClose}
                        className="mt-2.5 inline-flex items-center gap-1.5 border-b border-[#7A4027]/25 pb-0.5 text-[12px] font-medium text-[#85431E] transition-colors hover:border-[#85431E]"
                      >
                        {message.link.label}
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M5 12H19M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    )}

                    {message.isFallback && (
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="mt-2.5 flex items-center justify-center gap-2 bg-[#25D366] px-3 py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-90"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Chat on WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 bg-[#F2EBD9] px-3.5 py-3">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="h-1.5 w-1.5 rounded-full bg-[#85431E]/50"
                        style={{ animation: "chat-typing 1.2s ease-in-out infinite", animationDelay: `${delay}ms` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            {showSuggestions && (
              <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 shrink-0">
                {suggestions.map((faq) => (
                  <button
                    key={faq.id}
                    type="button"
                    onClick={() => send(faq.question)}
                    className="shrink-0 border border-[#85431E]/25 bg-transparent px-3 py-1.5 text-left text-[12px] font-light text-[#85431E] transition-colors hover:bg-[#85431E] hover:text-[#F2EBD9] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#85431E]/40"
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
              className="flex items-center gap-2 border-t border-[#7A4027]/15 bg-[#F2EBD9]/50 px-3 py-3 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your question…"
                aria-label="Type your question"
                className="min-w-0 flex-1 bg-transparent px-1 py-1 text-[13px] font-light text-[#3D2214] placeholder:text-[#7A4027]/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#DA7347] text-[#FFF8E5] transition-opacity disabled:opacity-35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#85431E]/40"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 12L20 4L14 20L12 13L4 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
