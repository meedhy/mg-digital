"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { ClipboardList } from "lucide-react";
import BrandMark from "@/components/ui/BrandMark";
import TrackedLink from "@/components/ui/TrackedLink";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact";

const links = [
  { href: "#realisations", label: "Réalisations" },
  { href: "#services", label: "Services" },
  { href: "#offres", label: "Formules" },
  { href: "#methode", label: "Méthode" },
  { href: "#contact", label: "Votre projet" },
];

const chatButtonClassName =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/18 bg-white py-2 text-xs font-semibold text-[#09090d] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f4f4f6]";

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const [identityCardVisible, setIdentityCardVisible] = useState(false);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const mobileLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const hideMobileContactBar = identityCardVisible || activeHref === "#realisations" || activeHref === "#offres" || activeHref === "#contact";

  useEffect(() => {
    const identityCard = document.querySelector<HTMLElement>("#apropos");
    if (!identityCard) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIdentityCardVisible(entry.isIntersecting),
      { threshold: 0.08 }
    );

    observer.observe(identityCard);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const updateNavigationState = () => {
      animationFrame = 0;
      setScrolled(window.scrollY > 56);

      const marker = window.scrollY + Math.min(window.innerHeight * 0.36, 300);
      let nextHref = "";

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
    const activeIndex = links.findIndex((link) => link.href === activeHref);
    const container = mobileLinksRef.current;
    const activeLink = activeIndex >= 0 ? mobileLinkRefs.current[activeIndex] : null;
    if (!container || !activeLink) return;

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    container.scrollTo({
      left: activeLink.offsetLeft - (container.clientWidth - activeLink.offsetWidth) / 2,
      behavior,
    });
  }, [activeHref]);

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, href: string) {
    const section = document.querySelector<HTMLElement>(href);
    if (!section) return;

    event.preventDefault();
    setActiveHref(href === "#accueil" ? "" : href);
    window.history.replaceState(null, "", href);

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.requestAnimationFrame(() => section.scrollIntoView({ behavior, block: "start" }));
  }

  return (
    <>
      <header className="pointer-events-none fixed left-1/2 top-2 z-50 w-[min(calc(100vw-16px),1180px)] -translate-x-1/2 min-[840px]:top-5 min-[840px]:w-[min(94vw,1180px)]">
        <nav
          aria-label="Navigation principale"
          className={`glass-nav mobile-nav-surface pointer-events-auto flex items-center gap-2 overflow-hidden rounded-full transition-all duration-300 ease-premium min-[840px]:justify-between min-[840px]:gap-0 ${
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
          <span className="hidden min-[840px]:inline-flex">
            <BrandMark />
          </span>
          <span className="inline-flex min-[840px]:hidden">
            <BrandMark compact />
          </span>
        </a>

        <div
          ref={mobileLinksRef}
          className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] min-[840px]:hidden [&::-webkit-scrollbar]:hidden"
        >
          {links.map((link, index) => {
            const isActive = activeHref === link.href;

            return (
              <a
                key={link.href}
                ref={(element) => {
                  mobileLinkRefs.current[index] = element;
                }}
                href={link.href}
                onClick={(event) => handleNavigation(event, link.href)}
                aria-current={isActive ? "location" : undefined}
                className={`relative flex min-h-9 shrink-0 items-center rounded-full px-3 text-[11px] font-semibold transition-colors duration-200 ${
                  isActive ? "bg-white/[0.1] text-white" : "text-white/42 hover:bg-white/[0.05] hover:text-white/76"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#9f96ff] transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </div>

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

        </nav>
      </header>

      <nav
        aria-label="Actions de contact"
        aria-hidden={hideMobileContactBar}
        className={`glass-nav fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex w-[calc(100vw-24px)] -translate-x-1/2 items-center gap-1.5 rounded-full p-1.5 transition-[transform,opacity] duration-300 ease-premium min-[840px]:hidden ${
          hideMobileContactBar
            ? "pointer-events-none translate-y-[calc(100%+2rem)] opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <a
          href="#contact"
          onClick={(event) => handleNavigation(event, "#contact")}
          className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-white px-3 text-xs font-semibold text-[#09090d] transition-colors hover:bg-[#f4f4f6]"
        >
          <ClipboardList size={16} strokeWidth={1.8} />
          Votre projet
        </a>
        <TrackedLink
          href={whatsappHref()}
          target="_blank"
          rel="noopener noreferrer"
          eventName="navbar_cta_click"
          secondaryEvent="whatsapp_click"
          eventPayload={{ source: "mobile_contact_bar" }}
          aria-label="Contacter MG Digital sur WhatsApp"
          className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-3 text-xs font-semibold text-white transition-colors hover:bg-white/[0.1]"
        >
          <WhatsAppIcon size={16} className="text-[#39d47a]" />
          Contacter
        </TrackedLink>
      </nav>
    </>
  );
}
