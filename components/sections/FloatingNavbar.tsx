"use client";

import { Menu, X } from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";
import BrandMark from "@/components/ui/BrandMark";
import TrackedLink from "@/components/ui/TrackedLink";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact";

const links = [
  { href: "#services", label: "Services", shortLabel: "Services" },
  { href: "#realisations", label: "Réalisations", shortLabel: "Réalisations" },
  { href: "#offres", label: "Formules", shortLabel: "Formules" },
  { href: "#methode", label: "Méthode", shortLabel: "Méthode" },
  { href: "#contact", label: "Lancer votre projet", shortLabel: "Votre projet" },
];

const chatButtonClassName =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/18 bg-white py-2 text-xs font-semibold text-[#09090d] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f4f4f6]";

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(links[0].href);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const panel = menuPanelRef.current;
    const getFocusableElements = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => !element.hasAttribute("disabled"));

    const focusFrame = window.requestAnimationFrame(() => getFocusableElements()[0]?.focus());

    const handleMenuKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);
      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleMenuKeys);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleMenuKeys);
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 840px)");
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktopQuery.addEventListener("change", closeMenuOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const section = document.querySelector<HTMLElement>(href);
    if (!section) return;

    event.preventDefault();
    setMenuOpen(false);
    setActiveHref(href === "#accueil" ? links[0].href : href);
    window.history.replaceState(null, "", href);

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.requestAnimationFrame(() => section.scrollIntoView({ behavior, block: "start" }));
  }

  const activeLink = links.find((link) => link.href === activeHref) ?? links[0];

  return (
    <>
      <header className="pointer-events-none fixed left-1/2 top-3 z-50 w-[min(94vw,1180px)] -translate-x-1/2 md:top-5">
        <nav
          aria-label="Navigation principale"
          className={`glass-nav pointer-events-auto flex items-center justify-between rounded-full transition-all duration-300 ease-premium ${
            scrolled ? "min-h-14 scale-[0.985] px-3.5 md:px-5" : "min-h-16 px-4 md:px-6"
          }`}
        >
          <a
            href="#accueil"
            className="shrink-0 rounded-full"
            onClick={(event) => handleNavigation(event, "#accueil")}
          >
            <span className="hidden sm:inline-flex"><BrandMark /></span>
            <span className="inline-flex sm:hidden"><BrandMark compact /></span>
          </a>

          <span className="ml-auto mr-1 hidden max-w-20 truncate text-[10px] font-semibold text-[#b4adff] min-[360px]:block sm:max-w-none sm:text-[11px] min-[840px]:hidden">
            {activeLink.shortLabel}
          </span>

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

        <div className="flex items-center gap-2 min-[840px]:hidden">
          <TrackedLink
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            eventName="navbar_cta_click"
            secondaryEvent="whatsapp_click"
            eventPayload={{ source: "mobile_navbar" }}
            aria-label="Ouvrir le chat WhatsApp"
            className={`${chatButtonClassName} px-3`}
          >
            <WhatsAppIcon size={16} className="text-[#19a957]" />
            Chat
          </TrackedLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        </nav>
      </header>

      <button
        type="button"
        aria-label="Fermer le menu en cliquant à l’extérieur"
        tabIndex={-1}
        onClick={() => {
          setMenuOpen(false);
          menuButtonRef.current?.focus();
        }}
        className={`fixed inset-0 z-40 bg-black/72 backdrop-blur-sm transition-opacity duration-500 min-[840px]:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={menuPanelRef}
        id="mobile-navigation"
        role="dialog"
        aria-label="Menu principal"
        aria-modal={menuOpen || undefined}
        aria-hidden={!menuOpen}
        style={{ right: "calc(100% - 100vw)" }}
        className={`fixed top-0 z-[45] flex h-dvh w-[min(88vw,420px)] flex-col border-l border-white/10 bg-[#09090d]/98 px-7 pb-8 pt-28 shadow-2xl transition-transform duration-500 ease-premium min-[840px]:hidden ${
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              tabIndex={menuOpen ? 0 : -1}
              onClick={(event) => handleNavigation(event, link.href)}
              aria-current={activeHref === link.href ? "location" : undefined}
              className={`relative border-b border-white/10 py-5 pl-4 text-2xl font-medium transition-colors ${
                activeHref === link.href ? "text-white" : "text-white/52 hover:text-[#b9b3ff]"
              }`}
              style={{ transitionDelay: menuOpen ? `${index * 45}ms` : "0ms" }}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1/2 h-8 w-0.5 -translate-y-1/2 bg-gradient-to-b from-accent to-accent-secondary transition-transform duration-300 ${
                  activeHref === link.href ? "scale-y-100" : "scale-y-0"
                }`}
              />
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-auto border-t border-white/10 pt-6">
          <p className="text-xs font-semibold uppercase text-white/42">Kinshasa · À distance</p>
          <a
            className="mt-3 block text-sm text-white/64"
            href="mailto:hello@medhighali.com"
            tabIndex={menuOpen ? 0 : -1}
          >
            hello@medhighali.com
          </a>
          <TrackedLink
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={menuOpen ? 0 : -1}
            eventName="whatsapp_click"
            eventPayload={{ source: "mobile_menu" }}
            onClick={() => setMenuOpen(false)}
            className="button-accent mt-6 w-full"
          >
            <WhatsAppIcon size={17} />
            Chat WhatsApp
          </TrackedLink>
        </div>
      </div>
    </>
  );
}
