"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import TrackedLink from "@/components/ui/TrackedLink";

export default function OfferBridge() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerOneRef = useRef<HTMLDivElement>(null);
  const layerTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "center center",
          scrub: 0.55,
        },
      });

      timeline
        .fromTo(layerOneRef.current, { x: -90, rotate: -4 }, { x: 0, rotate: 0, ease: "none" }, 0)
        .fromTo(layerTwoRef.current, { x: 100, rotate: 5 }, { x: 0, rotate: 0, ease: "none" }, 0);
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="offer-bridge-title"
      className="atmosphere noise relative flex min-h-[48svh] items-center overflow-hidden border-t border-white/8 py-14 md:min-h-[68svh] md:py-20"
    >
      <div className="interface-grid absolute inset-0 opacity-18" />
      <div
        ref={layerOneRef}
        aria-hidden="true"
        className="absolute left-[-8%] top-[18%] h-32 w-[48%] rounded-lg border border-white/8 bg-white/[0.025]"
      />
      <div
        ref={layerTwoRef}
        aria-hidden="true"
        className="absolute bottom-[14%] right-[-6%] h-40 w-[52%] rounded-lg border border-white/8 bg-white/[0.025]"
      />

      <div className="page-shell relative z-10 text-center">
        <p className="section-label">Réalisations</p>
        <h2
          id="offer-bridge-title"
          className="mx-auto mt-5 max-w-[900px] text-[1.9rem] font-semibold leading-[1.02] text-white md:mt-6 md:text-[3.1rem] lg:text-[3.65rem]"
        >
          Avant de parler budget, regardez <span className="font-editorial font-normal italic text-gradient">le travail.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/58 md:mt-7 md:text-lg md:leading-7">
          Trois projets montrent ma manière de penser une expérience, de la stratégie aux détails.
        </p>
        <TrackedLink
          href="#realisations"
          eventName="portfolio_bridge_click"
          eventPayload={{ source: "portfolio_transition" }}
          className="button-primary mt-9"
        >
          Découvrir les projets
          <ArrowDown className="button-arrow" size={17} />
        </TrackedLink>
      </div>
    </section>
  );
}
