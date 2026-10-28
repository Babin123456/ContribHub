"use client";

import { Caveat } from "next/font/google";
import { useState, useEffect } from "react";
import { Quote as QuoteIcon, ChevronRight } from "lucide-react";

const hand = Caveat({
  subsets: ["latin"],
  weight: ["600"],
});

interface InspirationQuote {
  quote: string;
  author: string;
  role: string;
}

const INSPIRATIONAL_QUOTES: InspirationQuote[] = [
  {
    quote: "Connect, contribute, elevate. Open source software is built by people who simply chose to show up.",
    author: "ContribHub Manifesto",
    role: "Community Motto",
  },
  {
    quote: "The best way to get started in open source is to fix the documentation for the thing you just struggled with.",
    author: "Dan Abramov",
    role: "Co-creator of Redux & React Core Contributor",
  },
  {
    quote: "Open source is not just code; it is people coming together across borders to build digital public infrastructure.",
    author: "Nadia Eghbal",
    role: "Author of Working in Public",
  },
  {
    quote: "In open source, the best way to innovate is to empower contributors with clear paths to meaningful impact.",
    author: "Linus Torvalds",
    role: "Creator of Linux & Git",
  },
];

export default function Quote() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle quotes every 8 seconds unless hovered
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % INSPIRATIONAL_QUOTES.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const current = INSPIRATIONAL_QUOTES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % INSPIRATIONAL_QUOTES.length);
  };

  return (
    <section
      aria-label="Open Source Inspiration"
      className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 text-center md:pt-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-zinc-100/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700 backdrop-blur-sm">
        <QuoteIcon size={14} className="text-zinc-900" />
        <span>Open Source Inspiration</span>
      </div>

      <div
        aria-live="polite"
        className="min-h-[140px] flex flex-col items-center justify-center transition-opacity duration-300 md:min-h-[180px]"
      >
        <h1
          className={`${hand.className} max-w-4xl text-4xl leading-tight text-zinc-900 sm:text-5xl md:text-6xl`}
        >
          &ldquo;{current.quote}&rdquo;
        </h1>

        <div className="mt-4 flex flex-col items-center gap-1">
          <p className="text-base font-bold text-zinc-900 md:text-lg">
            — {current.author}
          </p>
          <p className="text-xs font-medium text-zinc-500 md:text-sm">
            {current.role}
          </p>
        </div>
      </div>

      {/* Quote Navigation Dots & Next Button */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Quote Selector">
          {INSPIRATIONAL_QUOTES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={currentIndex === idx}
              aria-label={`Show quote ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-black"
                  : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next inspiration quote"
          className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:border-black hover:text-black"
        >
          <span>Next</span>
          <ChevronRight size={12} />
        </button>
      </div>
    </section>
  );
}
