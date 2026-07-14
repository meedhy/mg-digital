"use client";

import { MouseEvent, useEffect, useState } from "react";
import BrandMark from "@/components/ui/BrandMark";
import TrackedLink from "@/components/ui/TrackedLink";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact";

const links = [
  { href: "#services", label: "Services" },
  { href: "#realisations", label: "Réalisations" },
  { href: "#offres", label: "Formules" },
  { href: "#methode", label: "Méthode" },
  { href: "#contact", label: "Votre projet" },
];

const chatButtonClassName =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/18 bg-white py-2 text-xs font-semibold text-[#09090d] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f4f4f6]";

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState(links[0].href);

  useEffect(() => {
    let animationFrame = 0;

    const updateNavigationState = () => {
      animationFrame = 0;
      setScrolled(window.scrollY > 56);

      const marker = window.scrollY + Math.min(window.innerHeight * 0.36, 300);
      let nextHref = links[0].href;

      links.forEach((link) => {
        const section = document.querySelector<HTMLElement>(link.href);
        if (!section) return;
        const sectionTop = window.scrollY + section.getBoundingClientRect().top;
        if (marker >= sectionTop) nextHref = link.href;
      });

      setActiveHref((current) => (current === nextHref ? current : nextHref));
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateNavigationState);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const section = document.querySelector<HTMLElement>(href);
    if (!section) return;

    event.preventDefault();
    setActiveHref(href === "#accueil" ? links[0].href : href);
    window.history.replaceState(null, "", href);

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.requestAnimationFrame(() => section.scrollIntoView({ behavior, block: "start" }));
  }

  return (
    <header className="pointer-events-none fixed left-1/2 top-2 z-50 w-[min(96vw,1180px)] -translate-x-1/2 min-[840px]:top-5 min-[840px]:w-[min(94vw,1180px)]">
      <nav
        aria-label="Navigation principale"
        className={`glass-nav mobile-nav-surface pointer-events-auto flex items-center justify-between rounded-t-[20px] rounded-b-none border-b-0 transition-all duration-300 ease-premium min-[840px]:rounded-full min-[840px]:border ${
          scrolled
            ? "min-h-14 px-3 min-[840px]:min-h-14 min-[840px]:scale-[0.985] min-[840px]:px-5"
            : "min-h-14 px-3 min-[840px]:px-6"
        }`}
      >
        <a
          href="#accueil"
          aria-label="Revenir à l’accueil"
          className="shrink-0 rounded-full"
          onClick={(event) => handleNavigation(event, "#accueil")}
        >
          <span className="hidden sm:inline-flex">
            <BrandMark />
          </span>
          <span className="inline-flex sm:hidden">
            <BrandMark compact />
          </span>
        </a>

        <div className="hidden items-center gap-3 min-[840px]:flex lg:gap-5 xl:gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavigation(event, link.href)}
              aria-current={activeHref === link.href ? "location" : undefined}
              className={`group relative flex min-h-10 items-center px-1 text-xs font-medium transition-colors duration-200 lg:text-[13px] ${
                activeHref === link.href ? "text-white" : "text-white/44 hover:text-white/78"
              }`}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={`absolute bottom-0 left-1 right-1 h-px origin-center bg-gradient-to-r from-accent to-accent-secondary transition-transform duration-300 ${
                  activeHref === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                }`}
              />
            </a>
          ))}
        </div>

        <div className="hidden shrink-0 min-[840px]:block">
          <TrackedLink
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            eventName="navbar_cta_click"
            secondaryEvent="whatsapp_click"
            eventPayload={{ source: "navbar" }}
            aria-label="Ouvrir le chat WhatsApp"
            className={`${chatButtonClassName} px-3.5`}
          >
            <WhatsAppIcon size={16} className="text-[#19a957]" />
            Chat
          </TrackedLink>
        </div>

        <div className="ml-auto min-[840px]:hidden">
          <TrackedLink
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            eventName="navbar_cta_click"
            secondaryEvent="whatsapp_click"
            eventPayload={{ source: "mobile_navbar" }}
            aria-label="Ouvrir le chat WhatsApp"
            className={`${chatButtonClassName} min-h-10 px-3.5`}
          >
            <WhatsAppIcon size={16} className="text-[#19a957]" />
            Chat
          </TrackedLink>
        </div>
      </nav>
    </header>
  );
}
