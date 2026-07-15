"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import { useProjectIntent } from "@/components/providers/ProjectIntentProvider";
import TrackedLink from "@/components/ui/TrackedLink";
import { trackEvent } from "@/lib/tracking";

const reassurance = ["Premier échange gratuit", "Réponse sous 24 h", "Site livré clé en main"];

export default function HeroExperience() {
  const { openLeadFlow } = useProjectIntent();
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const interfaceRef = useRef<HTMLDivElement>(null);
  const cardOneRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(backgroundRef.current, { y: -40, scale: 1.08, opacity: 0.72 }, 0)
        .fromTo(
          interfaceRef.current,
          { y: 60, scale: 0.9, opacity: 0.65 },
          { y: -45, scale: 1.06, opacity: 1, duration: 1 },
          0
        )
        .fromTo(cardOneRef.current, { y: 100 }, { y: -180, duration: 1 }, 0)
        .to(
          titleRef.current,
          { y: -150, scale: 0.82, opacity: 0, filter: "blur(10px)", duration: 0.56 },
          0.25
        )
        .to(copyRef.current, { y: -90, opacity: 0, duration: 0.4 }, 0.48)
        .fromTo(
          transitionRef.current,
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.22 },
          0.78
        );
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="hero-sequence relative min-h-[100svh] bg-canvas lg:min-h-[150svh]"
    >
      <div className="hero-sticky sticky top-0 h-[100svh] overflow-hidden">
        <div ref={backgroundRef} className="atmosphere noise absolute -inset-8 transform-gpu">
          <div className="interface-grid absolute inset-0 opacity-40" />
        </div>

        <div className="page-shell relative z-20 flex h-full flex-col justify-start pb-24 pt-24 md:justify-center md:pb-16 min-[840px]:pt-32">
          <div className="relative z-20 max-w-[1100px]">
            <h1
              ref={titleRef}
              className="max-w-[980px] origin-left text-[2.2rem] font-semibold leading-[0.96] text-white min-[380px]:text-[2.5rem] sm:text-[2.8rem] md:text-[3.8rem] lg:text-[5rem] xl:text-[5.7rem]"
            >
              Votre activité mérite <span className="font-editorial text-gradient block font-normal italic">un site qui la fait avancer.</span>
            </h1>
          </div>

          <div ref={copyRef} className="relative z-30 mt-5 max-w-[620px] md:mt-9">
            <p className="max-w-[520px] text-base font-light leading-7 text-white/68 md:text-lg md:leading-8">
              Je vous accompagne du premier échange à la mise en ligne pour créer un site utile, solide et adapté à vos objectifs.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  trackEvent("hero_primary_cta_click", { source: "hero" });
                  openLeadFlow({ offer: "", projectType: "", objective: "", budget: "" });
                }}
                className="button-primary"
              >
                Parler de mon projet
              </button>
              <TrackedLink
                href="#projets"
                eventName="hero_portfolio_click"
                eventPayload={{ source: "hero" }}
                className="button-secondary"
              >
                Voir mes réalisations
              </TrackedLink>
            </div>
            <div className="mt-5 flex flex-col items-start gap-2.5 sm:mt-7 md:flex-row md:flex-wrap md:gap-x-5">
              {reassurance.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-[15px] font-medium leading-6 text-white/70">
                  <Check size={13} className="shrink-0 text-success" />
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={interfaceRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-20 right-[-8vw] z-10 hidden aspect-[16/10] w-[86vw] max-w-[360px] origin-center transform-gpu opacity-25 md:bottom-[-5vh] md:right-[-8vw] md:block md:w-[72vw] md:max-w-[980px] md:opacity-100 lg:right-0 lg:w-[62vw] xl:right-[2vw] xl:w-[54vw]"
          style={{ perspective: "1200px" }}
        >
          <div className="absolute inset-x-0 bottom-0 top-6 overflow-hidden rounded-lg border border-white/14 bg-[#0d0d14]/88 shadow-[0_40px_140px_rgba(0,0,0,0.7)] backdrop-blur-xl">
            <div className="flex h-11 items-center gap-2 border-b border-white/10 px-4">
              <span className="h-2 w-2 rounded-full bg-white/22" />
              <span className="h-2 w-2 rounded-full bg-white/14" />
              <span className="h-2 w-2 rounded-full bg-white/10" />
              <span className="ml-3 h-5 w-1/3 rounded-full bg-white/[0.055]" />
            </div>
            <div className="grid h-[calc(100%-44px)] grid-cols-[72px_1fr] md:grid-cols-[112px_1fr]">
              <div className="border-r border-white/8 p-3 md:p-4">
                <div className="h-7 w-7 rounded-md bg-gradient-to-br from-accent to-accent-secondary" />
                <div className="mt-8 grid gap-3">
                  {[72, 52, 64, 46].map((width) => (
                    <span key={width} className="h-1.5 rounded-full bg-white/10" style={{ width: `${width}%` }} />
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden p-5 md:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(124,108,255,0.18),transparent_34%)]" />
                <div className="relative max-w-[460px]">
                  <div className="h-2 w-24 rounded-full bg-accent/75" />
                  <div className="mt-5 h-7 w-3/4 rounded-md bg-white/86 md:h-10" />
                  <div className="mt-3 h-7 w-1/2 rounded-md bg-white/44 md:h-10" />
                  <div className="mt-5 h-2 w-4/5 rounded-full bg-white/12" />
                  <div className="mt-2 h-2 w-3/5 rounded-full bg-white/8" />
                  <div className="mt-6 flex gap-2">
                    <span className="h-9 w-28 rounded-full bg-white" />
                    <span className="h-9 w-24 rounded-full border border-white/14" />
                  </div>
                </div>
                <div className="absolute bottom-7 right-7 hidden h-28 w-48 grid-cols-4 items-end gap-2 border-l border-b border-white/10 p-3 sm:grid">
                  {[38, 62, 48, 82].map((height) => (
                    <span
                      key={height}
                      className="rounded-t-sm bg-gradient-to-t from-accent-secondary/35 to-accent"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-5 bottom-[8%] block aspect-[9/19] w-[20%] max-w-[190px] overflow-hidden rounded-[24px] border border-white/18 bg-[#101018] p-2 shadow-2xl">
            <div className="h-full rounded-[18px] border border-white/8 bg-[#09090d] p-3">
              <div className="mx-auto h-1.5 w-10 rounded-full bg-white/14" />
              <div className="mt-7 h-2 w-14 rounded-full bg-accent" />
              <div className="mt-4 h-5 w-full rounded-sm bg-white/80" />
              <div className="mt-2 h-5 w-3/4 rounded-sm bg-white/35" />
              <div className="mt-5 h-20 rounded-md border border-white/8 bg-white/[0.045]" />
            </div>
          </div>

          <div
            ref={cardOneRef}
            className="absolute left-[20%] top-[-5%] hidden items-center gap-3 rounded-lg border border-white/14 bg-[#111119]/92 px-4 py-3 shadow-xl backdrop-blur-xl md:flex"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/14 text-success">
              <Check size={15} />
            </span>
            <span className="text-xs font-semibold text-white/82">Parcours validé</span>
          </div>
        </div>

        <div
          ref={transitionRef}
          className="pointer-events-none absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 items-center gap-3 text-xs font-semibold text-white/38 lg:flex"
        >
          <span>Objectifs</span>
          <span className="h-px w-8 bg-white/16" />
          <span>Offres</span>
          <span className="h-px w-8 bg-white/16" />
          <span>Mise en ligne</span>
        </div>
      </div>
    </section>
  );
}
