"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatWidget from "@/components/chat/ChatWidget";
import type { ChatFaq } from "@/data/chatFaqs";

const WHATSAPP_NUMBER = "919882988267";

const WhatsAppIcon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ChatIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 11.5a8.38 8.38 0 01-9 8.34 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.1A8.38 8.38 0 0112.5 3.5 8.38 8.38 0 0121 11.5z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function FloatingWidgets({ faqs }: { faqs: ChatFaq[] }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Hold the dock back until the intro loader has cleared, then slide it in.
  useEffect(() => {
    const revealTimer = setTimeout(() => setIsVisible(true), 2600);
    return () => clearTimeout(revealTimer);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-4 z-[45] flex flex-col items-end gap-3 transition-opacity duration-500 sm:right-6 sm:bottom-6 ${
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <AnimatePresence>
        {!isChatOpen && (
          <motion.a
            key="floating-whatsapp"
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.18 }}
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="group relative flex items-center justify-center rounded-md bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2"
            style={{ height: "3.25rem", width: "3.25rem" }}
          >
            <WhatsAppIcon />
            <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-[#85431E] px-3 py-1.5 text-xs font-light text-[#F2EBD9] opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 md:block">
              Chat on WhatsApp
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsChatOpen((open) => !open)}
        aria-expanded={isChatOpen}
        aria-label={isChatOpen ? "Close chat assistant" : "Open chat assistant"}
        className="relative flex items-center justify-center rounded-md text-[#F2EBD9] shadow-[0_8px_24px_rgba(26,26,26,0.3)] transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DA7347]/60 focus-visible:ring-offset-2"
        style={{ height: "3.25rem", width: "3.25rem", backgroundColor: "#DA7347" }}
      >
        {!isChatOpen && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-ping rounded-md bg-[#DA7347] opacity-60"
          />
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isChatOpen ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.18 }}
            className="relative z-10 flex items-center justify-center"
          >
            {isChatOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <ChatIcon />
            )}
          </motion.span>
        </AnimatePresence>
      </button>

      <ChatWidget
        faqs={faqs}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}
