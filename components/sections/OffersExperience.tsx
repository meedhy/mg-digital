"use client";

import { ArrowUpRight, Check, Laptop, MessageCircle, RefreshCw } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useProjectIntent } from "@/components/providers/ProjectIntentProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import { trackEvent } from "@/lib/tracking";

type Offer = {
  id: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  deliverable: string;
  price: string;
  priceNote: string;
  cta: string;
  projectType: string;
  objective: string;
  budget: string;
  transitionNote?: string;
};

type Situation = "new" | "existing";

const situationOptions: Array<{ id: Situation; label: string }> = [
  { id: "new", label: "Je n’ai pas encore de site" },
  { id: "existing", label: "J’ai déjà un site" },
];

// Source unique pour les sélecteurs, la carte active et le préremplissage du formulaire.
const offerGroups: Record<Situation, Offer[]> = {
  new: [
    {
      id: "creation-complete",
      category: "Conception + développement",
      title: "Création complète",
      description: "Je conçois et développe votre site, du cadrage à la mise en ligne.",
      features: [
        "Cadrage et architecture du site",
        "UX/UI design et contenus essentiels",
        "Développement responsive",
        "SEO, analytics, mise en ligne et formation",
      ],
      deliverable: "Un site complet, professionnel et prêt à soutenir votre activité.",
      price: "À partir de 1 200 $",
      priceNote: "Pour un site vitrine professionnel de 4 à 6 pages.",
      cta: "Créer mon site",
      projectType: "Je veux créer mon site",
      objective: "Lancer un site complet",
      budget: "De 1 000 à 2 000 $",
    },
  ],
  existing: [
    {
      id: "refonte-complete",
      category: "Refonte + développement",
      title: "Refonte complète",
      description: "Je repense votre expérience, votre design et votre base technique.",
      features: [
        "Audit et stratégie de refonte",
        "Architecture, contenus et UX/UI design",
        "Développement et migration",
        "SEO, tests, mise en ligne et formation",
      ],
      deliverable: "Un nouveau site plus clair, plus performant et plus évolutif.",
      price: "À partir de 1 500 $",
      priceNote: "Selon l’état du site, son volume et sa technologie.",
      cta: "Refondre mon site",
      projectType: "Je veux améliorer mon site",
      objective: "Moderniser un site existant",
      budget: "De 1 000 à 2 000 $",
    },
  ],
};

function OfferCard({ offer, index, icon: OfferIcon }: { offer: Offer; index: number; icon: typeof Laptop }) {
  const cardRef = useRef<HTMLElement>(null);
  const seenRef = useRef(false);
  const { openLeadFlow } = useProjectIntent();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || seenRef.current) return;
        seenRef.current = true;
        trackEvent("offer_view", { offer: offer.category, position: index + 1 });
        observer.disconnect();
      },
      { threshold: 0.45 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index, offer.category]);

  function chooseOffer() {
    trackEvent("offer_cta_click", { offer: offer.category, position: index + 1 });
    openLeadFlow({
      offer: offer.category,
      projectType: offer.projectType,
      objective: offer.objective,
      budget: offer.budget,
    });
  }

  return (
    <article
      ref={cardRef}
      className="relative flex flex-col overflow-hidden rounded-lg border border-accent/35 bg-white p-5 sm:p-6 md:p-8 lg:p-10"
    >
      <div className="flex flex-col">
        <div className="flex min-h-7 items-start gap-4">
          <p className="text-[11px] font-bold uppercase text-black/42">{offer.category}</p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/8 text-accent">
            <OfferIcon size={21} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <h3 className="max-w-[720px] text-2xl font-semibold leading-tight text-black/88 sm:text-3xl lg:text-[2.35rem]">{offer.title}</h3>
        </div>
        <p className="mt-3 max-w-2xl text-base leading-7 text-black/56">{offer.description}</p>

        <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:mt-7 md:gap-x-8 md:gap-y-3">
          {offer.features.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-6 text-black/66">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/12 text-success">
                <Check size={11} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-black/10 pt-5 md:mt-8 md:pt-6">
          <p className="text-[10px] font-bold uppercase text-black/34">Livrable</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/64">{offer.deliverable}</p>
          {offer.transitionNote && <p className="mt-3 max-w-2xl text-[11px] leading-5 text-black/36 md:text-xs">{offer.transitionNote}</p>}

          <div className="mt-5 md:flex md:items-end md:justify-between md:gap-8">
            <div>
              <p className="text-sm font-semibold text-black/76 md:text-base">{offer.price}</p>
              <p className="mt-1 max-w-md text-[13px] leading-5 text-black/46 md:text-sm">{offer.priceNote}</p>
            </div>
            <button
              type="button"
              onClick={chooseOffer}
              className="button-accent mt-4 w-full md:mt-0 md:w-auto md:min-w-[230px]"
            >
              {offer.cta}
              <ArrowUpRight className="button-arrow" size={17} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OffersExperience() {
  const [activeSituation, setActiveSituation] = useState<Situation>("new");
  const situationTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { openLeadFlow } = useProjectIntent();
  const activeOffer = offerGroups[activeSituation][0];

  function selectSituation(situation: Situation, track = true) {
    setActiveSituation(situation);
    if (track) trackEvent("offer_navigation_click", { offer: "Situation", situation });
  }

  function handleSituationKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % situationOptions.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + situationOptions.length) % situationOptions.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = situationOptions.length - 1;
    else return;

    event.preventDefault();
    selectSituation(situationOptions[nextIndex].id);
    situationTabRefs.current[nextIndex]?.focus();
  }

  function openCustomProject() {
    trackEvent("offer_cta_click", { offer: "Projet sur mesure", position: 7 });
    openLeadFlow({
      offer: "Projet sur mesure",
      projectType: "Projet sur mesure",
      objective: "Fonctionnalités avancées",
      budget: "Plus de 2 000 $",
    });
  }

  return (
    <section id="offres" className="relative overflow-hidden border-t border-black/8 bg-[#f6f6f4] px-0 pb-12 pt-10 text-[#101014] md:pb-16 md:pt-24 lg:pb-20 lg:pt-28">
      <div className="page-shell relative lg:grid lg:grid-cols-[minmax(260px,0.58fr)_minmax(0,1.42fr)] lg:items-start lg:gap-12 xl:gap-20">
        <div className="lg:sticky lg:top-28">
          <div className="md:hidden">
            <p className="text-[0.72rem] font-bold uppercase leading-none text-black/42">Offres</p>
            <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.02] text-black/88">
              Où en est votre <span className="font-editorial font-normal italic text-black/46">projet ?</span>
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-black/56">
              Une solution complète, que vous partiez de zéro ou d’un site existant.
            </p>
          </div>

          <SectionHeading
            label="Offres"
            text="Une solution complète, que vous partiez de zéro ou d’un site existant. Le périmètre est confirmé après un échange."
            className="hidden md:block"
            light
          >
            Où en est votre <span className="font-editorial font-normal italic text-black/46">projet ?</span>
          </SectionHeading>
        </div>

        <div className="min-w-0">
        <div className="mt-7 max-w-[960px] md:mt-10 lg:mt-0">
          <nav aria-label="Choisir votre situation">
            <div role="tablist" aria-label="Situation actuelle" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {situationOptions.map((situation, index) => {
                const isActive = situation.id === activeSituation;
                return (
                  <button
                    key={situation.id}
                    ref={(element) => {
                      situationTabRefs.current[index] = element;
                    }}
                    id={`situation-tab-${situation.id}`}
                    type="button"
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectSituation(situation.id)}
                    onKeyDown={(event) => handleSituationKeyDown(event, index)}
                    aria-selected={isActive}
                    aria-controls="offer-panel"
                    className={`flex min-h-10 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-4 text-center text-[10px] font-semibold leading-none transition-colors sm:px-5 sm:text-xs md:text-sm ${
                      isActive
                        ? "border-black bg-black text-white"
                        : "border-black/12 bg-transparent text-black/48 hover:border-black/30 hover:text-black"
                    }`}
                  >
                    {situation.label}
                  </button>
                );
              })}
            </div>
          </nav>

        </div>

        <div
          id="offer-panel"
          role="tabpanel"
          aria-labelledby={`situation-tab-${activeSituation}`}
          className="panel-in mt-4 max-w-[960px] md:mt-5"
          key={`${activeSituation}-${activeOffer.id}`}
        >
          <OfferCard
            offer={activeOffer}
            index={activeSituation === "new" ? 0 : 1}
            icon={activeSituation === "new" ? Laptop : RefreshCw}
          />
        </div>

        <div className="mt-8 flex max-w-[960px] flex-col gap-4 border-t border-black/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-black/50">
            Un besoin précis, une fonctionnalité ou un projet différent ? Décrivez votre demande et je vous répondrai avec une proposition adaptée.
          </p>
          <button type="button" onClick={openCustomProject} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-black/14 px-6 text-sm font-semibold text-black/72 transition-colors hover:border-black/30 hover:bg-black/[0.035]">
            <MessageCircle size={17} aria-hidden="true" />
            Faire une demande sur mesure
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}
