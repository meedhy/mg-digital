"use client";

import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { ClipboardList } from "lucide-react";
import TrackedLink from "@/components/ui/TrackedLink";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact";

const links = [
  { href: "#apropos", label: "Contact" },
  { href: "#projets", label: "Réalisations" },
  { href: "#services", label: "Services" },
  { href: "#methode", label: "Méthode" },
  { href: "#offres", label: "Offres" },
  { href: "#contact", label: "Votre projet" },
];

const chatButtonClassName =
  "inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/18 bg-white py-2 text-xs font-semibold text-[#09090d] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f4f4f6]";

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const [isLight, setIsLight] = useState(false);
  const [identityCardVisible, setIdentityCardVisible] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const mobileLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const hideMobileContactBar = identityCardVisible || activeHref === "#projets" || activeHref === "#offres" || activeHref === "#contact";

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

      const headerRect = headerRef.current?.getBoundingClientRect();
      const themeMarker = headerRect ? headerRect.top + headerRect.height / 2 : 36;
      const themeSectionIds = ["accueil", "realisations", "services", "methode", "offres", "contact"];
      let sectionId = "accueil";
      let sectionTop = 0;

      for (const id of themeSectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top <= themeMarker && rect.bottom > themeMarker) {
          sectionId = id;
          sectionTop = rect.top;
        }
      }

      const isTransparentRealisationsEdge = sectionId === "realisations" && themeMarker - sectionTop < 48;
      const nextLight = ["realisations", "offres", "contact"].includes(sectionId) && !isTransparentRealisationsEdge;
      setIsLight((current) => (current === nextLight ? current : nextLight));

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
      <header ref={headerRef} className="pointer-events-none fixed left-1/2 top-[max(0.5rem,env(safe-area-inset-top))] z-50 w-[min(calc(100vw-16px),1180px)] -translate-x-1/2 min-[840px]:top-5 min-[840px]:w-[min(94vw,1180px)]">
        <nav
          aria-label="Navigation principale"
          className={`glass-nav mobile-nav-surface pointer-events-auto flex items-center gap-2 overflow-hidden rounded-full transition-all duration-300 ease-premium min-[840px]:justify-between min-[840px]:gap-0 ${isLight ? "nav-light" : ""} ${
            scrolled
              ? "min-h-14 px-3 min-[840px]:min-h-14 min-[840px]:scale-[0.985] min-[840px]:px-5"
              : "min-h-14 px-3 min-[840px]:px-6"
          }`}
        >
        <a
          href="#accueil"
          aria-label="Revenir à l’accueil"
          className={`relative size-9 shrink-0 overflow-hidden rounded-full border transition-colors duration-300 ${
            isLight ? "border-black/12 bg-black/[0.04]" : "border-white/15 bg-white/[0.07]"
          }`}
          onClick={(event) => handleNavigation(event, "#accueil")}
        >
          <Image
            src="/about/portrait-medhi-ghali.png"
            alt="Medhi Ghali"
            fill
            sizes="36px"
            priority
            className="object-cover"
          />
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
                style={{ fontWeight: isActive ? 700 : 500 }}
                className={`relative flex min-h-10 shrink-0 items-center rounded-full px-3 text-xs transition-colors duration-200 ${isActive ? "mobile-nav-link-active" : "font-medium"} ${
                  isLight
                    ? isActive ? "bg-black/[0.065] text-black" : "text-black/44 hover:bg-black/[0.035] hover:text-black/76"
                    : isActive ? "bg-white/[0.1] text-white" : "text-white/42 hover:bg-white/[0.05] hover:text-white/76"
                }`}
              >
                {link.label}
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
                isLight
                  ? activeHref === link.href ? "text-black" : "text-black/44 hover:text-black/78"
                  : activeHref === link.href ? "text-white" : "text-white/44 hover:text-white/78"
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
            className={`${chatButtonClassName} px-3.5 ${isLight ? "!border-black/12 !bg-[#111116] !text-white hover:!bg-[#292930]" : ""}`}
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
          className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-white px-3 text-[13px] font-semibold text-[#09090d] transition-colors hover:bg-[#f4f4f6]"
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
          className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.055] px-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.1]"
        >
          <WhatsAppIcon size={16} className="text-[#39d47a]" />
          Contacter
        </TrackedLink>
      </nav>
    </>
  );
}
