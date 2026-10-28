"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  "Programs",
  "Organizations",
  "Categories",
  "Resources",
  "Community",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2">
      <div className="relative flex items-center justify-between rounded-full border-2 border-black bg-white/95 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl md:justify-center md:gap-3">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-black text-sm font-black text-white transition-all duration-300 group-hover:rotate-6">
            OS
          </div>

          <span className="text-sm font-black tracking-tight text-black">
            ContribHub
          </span>
        </Link>

        <div className="mx-2 hidden h-8 w-px bg-zinc-200 md:block" />

        {/* Desktop Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="group relative overflow-hidden rounded-full px-5 py-2 text-sm font-semibold text-zinc-700 transition-all duration-300 hover:px-7 hover:text-white"
            >
              <span className="relative z-10">{item}</span>

              <span
                className="absolute inset-0 scale-x-0 rounded-full bg-black transition-transform duration-300 group-hover:scale-x-100"
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <div className="mx-2 hidden h-8 w-px bg-zinc-200 md:block" />

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            className="rounded-full border-2 border-black px-5 py-2 text-sm font-semibold transition-all duration-300 hover:bg-black hover:text-white"
          >
            Login
          </button>

          <button
            type="button"
            className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black text-black transition-colors hover:bg-black hover:text-white md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown & Backdrop */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-0 left-0 -z-10 h-screen w-screen bg-black/30 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-nav-menu"
            className="mt-3 overflow-hidden rounded-3xl border-2 border-black bg-white p-5 shadow-[0_16px_48px_rgba(0,0,0,0.2)] md:hidden"
          >
            <nav
              aria-label="Mobile Navigation"
              className="flex flex-col gap-1 pb-4"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 active:bg-zinc-200"
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="border-t border-zinc-200 pt-4">
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-full border-2 border-black py-3 text-sm font-semibold text-black transition-colors hover:bg-zinc-100"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full rounded-full bg-black py-3 text-sm font-semibold text-white transition-transform hover:opacity-90 active:scale-95"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
