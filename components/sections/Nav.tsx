"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#offres", label: "Offres" },
  { href: "#methode", label: "Méthode" },
  { href: "#apropos", label: "À propos" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-5 sm:px-8 lg:px-12 pt-4">
      <div
        className={`mx-auto flex h-14 max-w-7xl items-center justify-between rounded-lg border px-4 transition-all duration-200 md:px-5 ${
          scrolled
            ? "border-white/12 bg-blue-night/78 shadow-blue-lg backdrop-blur-xl"
            : "border-white/8 bg-white/[0.035] backdrop-blur-md"
        }`}
      >
      <a href="#" className="font-display text-lg font-bold text-white">
        Medhi<span className="font-handwriting text-xl text-sky-blue">Ghali</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-body text-[13px] font-medium text-white/55 transition-colors duration-150 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="https://wa.me/33786034629"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden min-h-9 items-center rounded-md bg-white px-4 font-body text-[13px] font-semibold text-blue-night transition duration-200 hover:bg-sky-blue hover:text-white md:inline-flex"
      >
        WhatsApp
      </a>

      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 text-white md:hidden"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          {menuOpen ? (
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="fixed inset-x-[5vw] top-20 z-40 flex flex-col gap-2 rounded-lg border border-white/12 bg-blue-night/96 p-3 shadow-blue-xl backdrop-blur-xl md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-md px-4 py-4 font-body text-base font-medium text-white/80 hover:bg-white/8 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/33786034629"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-md bg-white px-4 py-4 text-center font-body text-base font-semibold text-blue-night"
          >
            Discuter sur WhatsApp
          </a>
        </div>
      )}
      </div>
    </nav>
  );
}
