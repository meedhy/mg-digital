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
  title: string;
  description: string;
  examples: string[];
  projectType: string;
  objective: string;
  cta: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
};

const objectives: Objective[] = [
  {
    title: "Exister et rassurer",
    description:
      "Présentez clairement votre activité et donnez immédiatement confiance à vos futurs clients.",
    examples: ["Site vitrine", "Présentation des services", "Contact WhatsApp"],
    projectType: "Créer un site",
    objective: "Présenter mon activité",
    cta: "Créer un site rassurant",
    icon: ShieldCheck,
  },
  {
    title: "Générer des demandes",
    description:
      "Transformez vos visiteurs en prospects avec des parcours simples et des appels à l’action efficaces.",
    examples: ["Demande de devis", "Prise de rendez-vous", "Formulaire qualifié"],
    projectType: "Créer un site",
    objective: "Générer des demandes",
    cta: "Générer plus de demandes",
    icon: MessagesSquare,
  },
  {
    title: "Vendre en ligne",
    description: "Présentez vos offres, recevez des commandes et facilitez le passage à l’achat.",
    examples: ["Catalogue", "Boutique en ligne", "Commandes et paiement"],
    projectType: "Vendre en ligne",
    objective: "Vendre",
    cta: "Lancer ma boutique",
    icon: ShoppingBag,
  },
  {
    title: "Digitaliser un service",
    description: "Créez une plateforme adaptée à vos utilisateurs et à vos processus métier.",
    examples: ["Espace client", "Réservation", "Tableau de bord"],
    projectType: "Créer une plateforme",
    objective: "Digitaliser un service",
    cta: "Digitaliser mon service",
    icon: PanelsTopLeft,
  },
];

function ObjectiveCard({ objective, index, compact = false }: { objective: Objective; index: number; compact?: boolean }) {
  const { openLeadFlow } = useProjectIntent();
  const Icon = objective.icon;

  function selectObjective() {
    trackEvent("objective_select", { objective: objective.objective, position: index + 1 });
    openLeadFlow({ projectType: objective.projectType, objective: objective.objective });
  }

  return (
    <article
      className={`premium-card flex flex-col bg-[#101016]/94 ${compact ? "min-h-[330px] p-6" : "min-h-[430px] p-8 lg:p-10"}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.055] text-[#9f96ff]">
          <Icon size={20} strokeWidth={1.7} />
        </span>
        <span className="font-editorial text-2xl italic text-white/28">0{index + 1}</span>
      </div>
      <h3 className={`mt-8 font-semibold leading-tight text-white ${compact ? "text-2xl" : "text-3xl lg:text-4xl"}`}>
        {objective.title}
      </h3>
      <p className="mt-5 max-w-xl text-sm leading-7 text-white/60 md:text-base">{objective.description}</p>
      <ul className="mt-7 flex flex-wrap gap-2" aria-label="Exemples">
        {objective.examples.map((example) => (
          <li key={example} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-white/58">
            {example}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <button type="button" onClick={selectObjective} className="button-secondary self-start px-5">
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
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  function navigateToObjective(index: number) {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollRange = Math.max(0, section.offsetHeight - window.innerHeight);
    const progress = Math.min(0.98, Math.max(0.02, index / (objectives.length - 1)));

    trackEvent("objective_navigation_click", {
      objective: objectives[index].objective,
      position: index + 1,
    });
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: sectionTop + scrollRange * progress, behavior });
  }

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
      id="services"
      className="objectives-sequence relative border-t border-white/8 bg-canvas-soft py-24 lg:h-[360vh] lg:py-0"
    >
      <div className="objectives-motion-stage objectives-sticky sticky top-0 mx-auto h-screen w-full max-w-[1440px] grid-cols-[0.92fr_1.08fr] items-center gap-12 px-12 xl:px-20">
        <div className="max-w-[540px]">
          <SectionHeading
            label="Votre objectif d’abord"
            text="Nous partons du résultat attendu avant de concevoir le parcours et le design."
            className="objectives-motion-heading"
          >
            Quel résultat attendez-vous de votre site ?
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

      <div className="objectives-static page-shell gap-8">
        <SectionHeading
          label="Votre objectif d’abord"
          text="Nous partons du résultat attendu avant de concevoir le parcours et le design."
        >
          Quel résultat attendez-vous de votre site ?
        </SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          {objectives.map((objective, index) => (
            <ObjectiveCard key={objective.title} objective={objective} index={index} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
