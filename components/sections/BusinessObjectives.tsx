"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  MessagesSquare,
  PanelsTopLeft,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { ComponentType, useEffect, useRef, useState } from "react";
import { useProjectIntent } from "@/components/providers/ProjectIntentProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import { trackEvent } from "@/lib/tracking";

type Objective = {
  persona: string;
  title: string;
  description: string;
  clientTypes: string[];
  projectType: string;
  objective: string;
  cta: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
};

const objectives: Objective[] = [
  {
    persona: "Restaurateur",
    title: "Exister en ligne",
    description: "Une présence claire qui inspire confiance dès les premières secondes.",
    clientTypes: ["ONG", "Agent immobilier", "Indépendant"],
    projectType: "Créer un site",
    objective: "Présenter mon activité",
    cta: "Créer un site rassurant",
    icon: ShieldCheck,
  },
  {
    persona: "Cabinet de conseil",
    title: "Générer des demandes",
    description: "Un parcours court qui transforme l’intérêt en contact qualifié.",
    clientTypes: ["Artisan", "Centre de formation", "Agence événementielle"],
    projectType: "Créer un site",
    objective: "Générer des demandes",
    cta: "Générer plus de demandes",
    icon: MessagesSquare,
  },
  {
    persona: "Vendeur indépendant",
    title: "Vendre en ligne",
    description: "Une boutique fluide pour découvrir, choisir et commander sans friction.",
    clientTypes: ["Boutique locale", "Créateur de mode", "Commerce de quartier"],
    projectType: "Vendre en ligne",
    objective: "Vendre",
    cta: "Lancer ma boutique",
    icon: ShoppingBag,
  },
  {
    persona: "Clinique",
    title: "Digitaliser un service",
    description: "Un espace métier qui simplifie les tâches de vos équipes et clients.",
    clientTypes: ["École privée", "Service de livraison", "Cabinet médical"],
    projectType: "Créer une plateforme",
    objective: "Digitaliser un service",
    cta: "Digitaliser mon service",
    icon: PanelsTopLeft,
  },
];

function ObjectiveWireframe({ index }: { index: number }) {
  return (
    <div aria-hidden="true" className="relative mt-4 min-h-0 flex-1 overflow-hidden rounded-md border border-white/10 bg-[#09090e] p-3">
      <div className="flex h-5 items-center gap-1.5 border-b border-white/8 pb-2">
        <span className="size-1.5 rounded-full bg-white/22" />
        <span className="size-1.5 rounded-full bg-white/12" />
        <span className="ml-2 h-1.5 w-16 rounded-full bg-white/8" />
        <span className="ml-auto h-1.5 w-9 rounded-full bg-[#8f84ff]/55" />
      </div>

      {index === 0 && (
        <div className="grid h-[calc(100%-20px)] grid-cols-[1.15fr_0.85fr] gap-3 pt-3">
          <div>
            <div className="h-2 w-12 rounded-full bg-[#8f84ff]/75" />
            <div className="mt-3 h-5 w-4/5 rounded-sm bg-white/84" />
            <div className="mt-2 h-5 w-3/5 rounded-sm bg-white/28" />
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/10" />
            <div className="mt-1.5 h-1.5 w-3/4 rounded-full bg-white/7" />
            <div className="mt-4 h-7 w-20 rounded-full bg-white" />
          </div>
          <div className="grid content-end gap-2">
            {["h-12", "h-9"].map((height) => (
              <span key={height} className={`${height} rounded-sm border border-white/8 bg-white/[0.045]`} />
            ))}
          </div>
        </div>
      )}

      {index === 1 && (
        <div className="grid h-[calc(100%-20px)] grid-cols-[0.9fr_1.1fr] gap-3 pt-3">
          <div className="flex flex-col justify-center">
            <div className="h-2 w-14 rounded-full bg-[#8f84ff]/75" />
            <div className="mt-3 h-5 w-full rounded-sm bg-white/78" />
            <div className="mt-2 h-5 w-3/4 rounded-sm bg-white/24" />
            <div className="mt-4 flex items-center gap-2 text-[8px] text-[#65e4a2]">
              <span className="size-2 rounded-full bg-[#29c47d]" /> + de contacts
            </div>
          </div>
          <div className="rounded-sm border border-white/10 bg-white/[0.045] p-2.5">
            <div className="h-1.5 w-12 rounded-full bg-white/18" />
            {["w-full", "w-full", "w-3/4"].map((width, item) => (
              <span key={`${width}-${item}`} className={`mt-2 block h-5 ${width} rounded-sm border border-white/8 bg-black/20`} />
            ))}
            <div className="mt-2 h-6 w-full rounded-sm bg-[#8f84ff]" />
          </div>
        </div>
      )}

      {index === 2 && (
        <div className="pt-3">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 rounded-sm bg-white/76" />
            <div className="h-6 w-8 rounded-full border border-white/12 bg-white/[0.045]" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((item) => (
              <div key={item} className="rounded-sm border border-white/8 bg-white/[0.035] p-1.5">
                <div className={`aspect-square rounded-sm ${item === 1 ? "bg-[#8f84ff]/28" : "bg-white/8"}`} />
                <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/18" />
                <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-[#65e4a2]/65" />
              </div>
            ))}
          </div>
        </div>
      )}

      {index === 3 && (
        <div className="grid h-[calc(100%-20px)] grid-cols-[22%_1fr] pt-3">
          <div className="border-r border-white/8 pr-2">
            <div className="size-5 rounded-sm bg-[#8f84ff]/70" />
            {[70, 50, 62].map((width) => (
              <span key={width} className="mt-3 block h-1.5 rounded-full bg-white/10" style={{ width: `${width}%` }} />
            ))}
          </div>
          <div className="pl-3">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-9 rounded-sm border border-white/8 bg-white/[0.04] p-2">
                  <div className="h-1.5 w-3/4 rounded-full bg-white/14" />
                  <div className="mt-2 h-1.5 w-1/2 rounded-full bg-[#65e4a2]/55" />
                </div>
              ))}
            </div>
            <div className="mt-2 flex h-14 items-end gap-1 rounded-sm border border-white/8 p-2">
              {[32, 58, 44, 76, 62].map((height) => (
                <span key={height} className="flex-1 rounded-t-sm bg-[#8f84ff]/55" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileObjectivePanel({ objective, index }: { objective: Objective; index: number }) {
  const { openLeadFlow } = useProjectIntent();

  function selectObjective() {
    trackEvent("objective_select", { objective: objective.objective, position: index + 1 });
    openLeadFlow({ projectType: objective.projectType, objective: objective.objective });
  }

  return (
    <article className="panel-in flex min-h-[300px] flex-col p-4" aria-live="polite">
      <div>
        <p className="text-[9px] font-bold uppercase text-white/34">Votre objectif</p>
        <h3 className="mt-1 text-xl font-semibold leading-tight text-white">{objective.title}</h3>
      </div>

      <p className="mt-2 text-xs leading-5 text-white/54">{objective.description}</p>
      <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Exemples d’activités">
        {[objective.persona, ...objective.clientTypes].map((clientType) => (
          <span key={clientType} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] font-medium text-white/58">
            {clientType}
          </span>
        ))}
      </div>

      <ObjectiveWireframe index={index} />

      <button type="button" onClick={selectObjective} className="button-secondary mt-3 min-h-10 w-full px-5">
        {objective.cta}
        <ArrowUpRight className="button-arrow" size={16} />
      </button>
    </article>
  );
}

function ObjectiveCard({ objective, index, compact = false }: { objective: Objective; index: number; compact?: boolean }) {
  const { openLeadFlow } = useProjectIntent();
  const Icon = objective.icon;

  function selectObjective() {
    trackEvent("objective_select", { objective: objective.objective, position: index + 1 });
    openLeadFlow({ projectType: objective.projectType, objective: objective.objective });
  }

  return (
    <article
      className={`premium-card flex flex-col bg-[#101016]/94 ${compact ? "min-h-[300px] p-4 sm:min-h-[350px] sm:p-5 md:min-h-[410px]" : "min-h-[470px] p-6 lg:p-8"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.055] text-[#9f96ff]">
          <Icon size={20} strokeWidth={1.7} />
        </span>
        <span className="font-editorial text-2xl italic text-white/28">0{index + 1}</span>
      </div>
      <h3 className={`font-semibold leading-tight text-white ${compact ? "mt-4 text-xl sm:text-2xl" : "mt-5 text-3xl lg:text-4xl"}`}>
        {objective.title}
      </h3>
      <p className={`max-w-xl text-sm text-white/58 ${compact ? "mt-2 leading-5" : "mt-3 leading-6"}`}>{objective.description}</p>
      <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Exemples d’activités">
        {[objective.persona, ...objective.clientTypes].map((clientType) => (
          <span key={clientType} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-white/52">
            {clientType}
          </span>
        ))}
      </div>
      <ObjectiveWireframe index={index} />
      <div className="pt-3">
        <button type="button" onClick={selectObjective} className="button-secondary min-h-10 self-start px-5">
          {objective.cta}
          <ArrowUpRight className="button-arrow" size={16} />
        </button>
      </div>
    </article>
  );
}

export default function BusinessObjectives() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const mobileTabsRef = useRef<HTMLDivElement>(null);
  const mobileTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  function navigateToObjective(index: number) {
    const section = sectionRef.current;
    if (!section) return;

    trackEvent("objective_navigation_click", {
      objective: objectives[index].objective,
      position: index + 1,
    });

    if (window.matchMedia("(max-width: 1023px)").matches) {
      activeRef.current = index;
      setActiveIndex(index);
      return;
    }

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollRange = Math.max(0, section.offsetHeight - window.innerHeight);
    const progress = Math.min(0.98, Math.max(0.02, index / (objectives.length - 1)));
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: sectionTop + scrollRange * progress, behavior });
  }

  useEffect(() => {
    const tabs = mobileTabsRef.current;
    const activeTab = mobileTabRefs.current[activeIndex];
    if (!tabs || !activeTab || window.innerWidth >= 768) return;

    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    tabs.scrollTo({
      left: activeTab.offsetLeft - (tabs.clientWidth - activeTab.offsetWidth) / 2,
      behavior,
    });
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter((card): card is HTMLElement => Boolean(card));
    if (!section || cards.length !== objectives.length) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(cards, {
        autoAlpha: 0,
        y: 100,
        scale: 0.94,
        filter: "blur(12px)",
        pointerEvents: "none",
      });
      gsap.set(cards[0], {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        pointerEvents: "auto",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "none", force3D: true },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const next = Math.min(objectives.length - 1, Math.floor(progress * objectives.length));
            if (next !== activeRef.current) {
              activeRef.current = next;
              setActiveIndex(next);
            }
          },
        },
      });

      for (let index = 1; index < cards.length; index += 1) {
        const position = index - 1;
        timeline
          .to(
            cards[index - 1],
            { autoAlpha: 0, y: -80, scale: 0.97, filter: "blur(8px)", duration: 0.48 },
            position + 0.32
          )
          .set(cards[index - 1], { pointerEvents: "none" }, position + 0.56)
          .set(cards[index], { pointerEvents: "auto" }, position + 0.42)
          .to(
            cards[index],
            { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.52 },
            position + 0.42
          );
      }
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="objectives-sequence relative bg-canvas-soft pb-16 pt-8 md:pb-24 md:pt-12 lg:h-[260vh] lg:py-0"
    >
      <div className="objectives-motion-stage objectives-sticky sticky top-0 mx-auto h-screen w-full max-w-[1440px] grid-cols-[0.92fr_1.08fr] items-center gap-12 px-12 xl:px-20">
        <div className="max-w-[540px]">
          <SectionHeading
            label="Votre objectif d’abord"
            className="objectives-motion-heading"
          >
            Votre site, en situation.
          </SectionHeading>

          <nav
            aria-label="Objectifs à découvrir"
            className="mt-9 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]"
          >
            <ol className="grid grid-cols-2">
              {objectives.map((objective, index) => {
                const Icon = objective.icon;
                const isActive = index === activeIndex;

                return (
                  <li
                    key={objective.title}
                    className={`${index % 2 === 0 ? "border-r" : ""} ${
                      index < 2 ? "border-b" : ""
                    } border-white/10`}
                  >
                    <button
                      type="button"
                      onClick={() => navigateToObjective(index)}
                      aria-current={isActive ? "step" : undefined}
                      aria-controls={`objective-panel-${index}`}
                      className={`group flex min-h-[68px] w-full items-center gap-3 px-3 py-3 text-left transition-colors duration-200 ${
                        isActive
                          ? "bg-white/[0.085] text-white"
                          : "text-white/48 hover:bg-white/[0.045] hover:text-white/78"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                          isActive
                            ? "border-accent/45 bg-accent/14 text-[#b4adff]"
                            : "border-white/10 bg-white/[0.025] text-white/35 group-hover:text-white/62"
                        }`}
                      >
                        <Icon size={15} strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-[10px] font-semibold ${isActive ? "text-[#a9a1ff]" : "text-white/24"}`}>
                          0{index + 1}
                        </span>
                        <span className="mt-1 block text-[13px] font-semibold leading-4">{objective.title}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <div className="relative h-[470px]">
          {objectives.map((objective, index) => (
            <div
              key={objective.title}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              id={`objective-panel-${index}`}
              aria-hidden={index !== activeIndex}
              className="absolute inset-0 transform-gpu"
            >
              <ObjectiveCard objective={objective} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="objectives-static page-shell">
        <div className="min-w-0 md:hidden">
          <div className="pb-5">
            <p className="text-[9px] font-bold uppercase text-white/34">Selon votre activité</p>
            <h2 className="mt-1.5 text-[1.5rem] font-semibold leading-[1.02] text-white sm:text-[1.65rem]">
              Ce que votre site peut faire pour vous.
            </h2>
          </div>

          <nav aria-label="Activités et objectifs à découvrir" className="border-y border-white/9">
            <div
              ref={mobileTabsRef}
              className="relative flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {objectives.map((objective, index) => {
                const isActive = index === activeIndex;
                const Icon = objective.icon;
                return (
                  <button
                    key={objective.title}
                    ref={(element) => {
                      mobileTabRefs.current[index] = element;
                    }}
                    type="button"
                    onClick={() => navigateToObjective(index)}
                    aria-current={isActive ? "step" : undefined}
                    aria-controls="mobile-objective-panel"
                    className={`relative flex min-h-[54px] w-[46%] min-w-[150px] shrink-0 snap-center items-center border-r border-white/8 px-3 py-2 text-left transition-colors last:border-r-0 ${
                      isActive ? "bg-white/[0.085] text-white" : "text-white/42"
                    }`}
                  >
                    <span
                      className={`mr-2 flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        isActive
                          ? "border-accent/35 bg-accent/12 text-[#aaa2ff]"
                          : "border-white/8 bg-white/[0.025] text-white/28"
                      }`}
                    >
                      <Icon size={13} strokeWidth={1.8} />
                    </span>
                    <span className="block text-[11px] font-semibold leading-4">{objective.title}</span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#9f96ff] transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
                    />
                  </button>
                );
              })}
            </div>
          </nav>

          <div id="mobile-objective-panel" className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-[#101016]/94" key={activeIndex}>
            <MobileObjectivePanel objective={objectives[activeIndex]} index={activeIndex} />
          </div>
        </div>

        <div className="hidden gap-8 md:grid">
          <SectionHeading label="Votre objectif d’abord">Votre site, en situation.</SectionHeading>
          <div className="grid grid-cols-2 gap-4">
            {objectives.map((objective, index) => (
              <ObjectiveCard key={objective.title} objective={objective} index={index} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
