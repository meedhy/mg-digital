"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";

const links = [
  { href: "#offres", label: "Offres" },
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
    <nav
      className={`sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-200 ${
        scrolled
          ? "bg-blue-night/97 backdrop-blur-md shadow-blue-sm"
          : "bg-transparent"
      }`}
    >
      <a href="#" className="flex items-baseline gap-1">
        <span className="font-display italic text-white text-xl">mehdi</span>
        <span className="font-handwriting text-sky-blue text-2xl">ghali</span>
        <span className="font-body text-white/40 text-sm">.digital</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="relative font-body text-sm text-white/80 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:bg-sky-blue after:scale-x-0 after:origin-left after:transition-transform after:duration-200 hover:text-white hover:after:scale-x-100"
          >
            {link.label}
          </a>
        ))}
        <Button variant="whatsapp" size="sm" href="https://wa.me/33786034629">
          WhatsApp
        </Button>
      </div>

      <button
        type="button"
        className="md:hidden text-white"
        aria-label="Menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {menuOpen ? (
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="fixed inset-0 top-[60px] z-40 flex flex-col items-center justify-center gap-8 bg-blue-night md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl text-white"
            >
              {link.label}
            </a>
          ))}
          <Button variant="whatsapp" size="md" href="https://wa.me/33786034629">
            WhatsApp
          </Button>
        </div>
      )}
    </nav>
  );
}
