"use client";

import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";

type JourneySection = {
  href: string;
  label: string;
};

const journeySections: JourneySection[] = [
  { href: "#realisations", label: "Réalisations" },
  { href: "#services", label: "Services" },
  { href: "#methode", label: "Méthode" },
  { href: "#offres", label: "Formules" },
  { href: "#contact", label: "Votre projet" },
];

export default function MobileJourneyNav() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 839px)");
    let animationFrame = 0;

    const updateJourney = () => {
      animationFrame = 0;
      if (!mobileQuery.matches) return;

      const marker = window.scrollY + Math.min(window.innerHeight * 0.34, 260);
      const positions = journeySections.map((section) => {
        const element = document.querySelector<HTMLElement>(section.href);
        return element ? window.scrollY + element.getBoundingClientRect().top : null;
      });

      let nextIndex = -1;
      positions.forEach((position, index) => {
        if (position !== null && marker >= position) nextIndex = index;
      });

      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const scheduleUpdate = () => {
      if (animationFrame || !mobileQuery.matches) return;
      animationFrame = window.requestAnimationFrame(updateJourney);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    mobileQuery.addEventListener("change", scheduleUpdate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      mobileQuery.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const activeTab = activeIndex >= 0 ? tabRefs.current[activeIndex] : tabRefs.current[0];
    if (!nav || !activeTab) return;

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    nav.scrollTo({
      left: activeTab.offsetLeft - (nav.clientWidth - activeTab.offsetWidth) / 2,
      behavior,
    });
  }, [activeIndex]);

  function scrollToSection(href: string) {
    const section = document.querySelector<HTMLElement>(href);
    if (!section) return;

    window.history.replaceState(null, "", href);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    section.scrollIntoView({ behavior, block: "start" });
  }

  function navigateTo(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    if (suppressClickRef.current) return;
    scrollToSection(href);
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch) return;

    const deltaX = start.x - touch.clientX;
    const deltaY = Math.abs(start.y - touch.clientY);
    if (Math.abs(deltaX) < 58 || deltaY > 46) return;

    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 240);

    if (activeIndex < 0) {
      if (deltaX > 0) scrollToSection(journeySections[0].href);
      return;
    }

    const nextIndex = Math.min(
      journeySections.length - 1,
      Math.max(0, activeIndex + (deltaX > 0 ? 1 : -1)),
    );
    if (nextIndex !== activeIndex) scrollToSection(journeySections[nextIndex].href);
  }

  return (
    <div className="min-[840px]:hidden">
      <nav
        ref={navRef}
        aria-label="Navigation mobile"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="glass-nav mobile-nav-surface fixed left-1/2 top-16 z-[49] flex h-12 w-[96vw] -translate-x-1/2 snap-x snap-mandatory items-center gap-1 overflow-x-auto overscroll-x-contain rounded-b-[20px] rounded-t-none border-t-white/8 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {journeySections.map((section, index) => {
          const isActive = index === activeIndex;

          return (
            <a
              key={section.href}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              href={section.href}
              onClick={(event) => navigateTo(event, section.href)}
              aria-label={`Aller à la section ${section.label}`}
              aria-current={isActive ? "location" : undefined}
              className={`relative flex min-h-8 shrink-0 snap-center items-center rounded-full px-4 text-[11px] font-semibold transition-colors duration-200 ${
                isActive ? "bg-white/[0.09] text-white" : "text-white/42 hover:bg-white/[0.045] hover:text-white/72"
              }`}
            >
              {section.label}
              <span
                aria-hidden="true"
                className={`absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#9f96ff] transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </a>
          );
        })}
      </nav>
    </div>
  );
}
