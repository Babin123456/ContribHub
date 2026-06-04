"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-5 left-1/2 z-50 -translate-x-1/2">
  <div className="flex items-center gap-3 rounded-full border-2 border-black bg-white/90 px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl">
    
    {/* Logo */}
    <Link href="/" className="group flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-black bg-black text-sm font-black text-white transition-all duration-300 group-hover:rotate-6">
        OS
      </div>

      <span className="hidden text-sm font-black tracking-tight text-black md:block">
        ContriHub
      </span>
    </Link>

    <div className="mx-2 h-8 w-px bg-zinc-200" />

    {/* Nav */}
    <nav className="hidden items-center gap-1 md:flex">
      {[
        "Programs",
        "Organizations",
        "Categories",
        "Resources",
        "Community",
      ].map((item) => (
        <Link
          key={item}
          href={`/${item.toLowerCase()}`}
          className="
            group
            relative
            overflow-hidden
            rounded-full
            px-5
            py-2
            text-sm
            font-semibold
            text-zinc-700
            transition-all
            duration-300
            hover:px-7
            hover:text-white
          "
        >
          <span className="relative z-10">{item}</span>

          <span
            className="
              absolute
              inset-0
              scale-x-0
              rounded-full
              bg-black
              transition-transform
              duration-300
              group-hover:scale-x-100
            "
          />
        </Link>
      ))}
    </nav>

    <div className="mx-2 hidden h-8 w-px bg-zinc-200 md:block" />

    {/* Actions */}
    <div className="hidden items-center gap-2 md:flex">
      <button
        className="
          rounded-full
          border-2
          border-black
          px-5
          py-2
          text-sm
          font-semibold
          transition-all
          duration-300
          hover:bg-black
          hover:text-white
        "
      >
        Login
      </button>

      <button
        className="
          rounded-full
          bg-black
          px-5
          py-2
          text-sm
          font-semibold
          text-white
          transition-all
          duration-300
          hover:scale-105
        "
      >
        Get Started
      </button>
    </div>

    {/* Mobile */}
    <button
      onClick={() => setOpen(!open)}
      className="
        rounded-full
        border-2
        border-black
        p-2
        md:hidden
      "
    >
      <Menu size={20} />
    </button>
  </div>
</header>
  );
}