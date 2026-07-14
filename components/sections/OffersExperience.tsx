"use client";

import { ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useProjectIntent } from "@/components/providers/ProjectIntentProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import { trackEvent } from "@/lib/tracking";

type Offer = {
  id: string;
  tabLabel: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  deliverable: string;
  price: string;
  priceNote: string;
  cta: string;
  recommended: boolean;
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
      id: "conseil-cadrage",
      tabLabel: "Conseil & cadrage",
      category: "Conseil",
      title: "Définir le bon projet avant de construire",
      description: "Pour clarifier votre idée, vos objectifs et les fonctionnalités réellement nécessaires avant d’investir.",
      features: [
        "Analyse de l’activité et des objectifs",
        "Définition des utilisateurs et des besoins",
        "Structure, contenus et fonctionnalités prioritaires",
        "Recommandations et feuille de route",
      ],
      deliverable: "Un projet clairement défini, priorisé et prêt à être conçu.",
      price: "À partir de 300 $",
      priceNote: "Selon le périmètre et le niveau de cadrage nécessaire.",
      cta: "Cadrer mon projet",
      recommended: false,
      projectType: "Auditer ou cadrer",
      objective: "Cadrer un nouveau projet",
      budget: "Moins de 500 $",
      transitionNote: "À l’issue de l’accompagnement, je peux également prendre en charge la conception et la réalisation du projet.",
    },
    {
      id: "creation-complete",
      tabLabel: "Création complète",
      category: "Conception + développement",
      title: "Construire votre site de bout en bout",
      description: "Un accompagnement complet, de la clarification du besoin jusqu’à la mise en ligne.",
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
      recommended: true,
      projectType: "Créer un site",
      objective: "Lancer un site complet",
      budget: "1 000 $ à 2 000 $",
    },
  ],
  existing: [
    {
      id: "audit",
      tabLabel: "Audit & conseil",
      category: "Audit & conseil",
      title: "Savoir quoi améliorer et dans quel ordre",
      description: "Un diagnostic clair pour identifier les problèmes, les opportunités et les priorités de votre site.",
      features: [
        "Analyse de l’offre et des objectifs",
        "Audit UX/UI et responsive",
        "Identification des points de friction",
        "Recommandations priorisées et feuille de route",
      ],
      deliverable: "Un plan d’action concret pour améliorer ou refondre votre site.",
      price: "À partir de 250 $",
      priceNote: "Selon le nombre de pages et la complexité du site.",
      cta: "Auditer mon site",
      recommended: false,
      projectType: "Auditer ou cadrer",
      objective: "Améliorer un projet existant",
      budget: "Moins de 500 $",
      transitionNote: "À l’issue de l’accompagnement, je peux également prendre en charge la conception et la réalisation du projet.",
    },
    {
      id: "refonte-complete",
      tabLabel: "Refonte complète",
      category: "Refonte + développement",
      title: "Transformer votre site de bout en bout",
      description: "Pour repenser l’expérience, le design, les contenus et la base technique de votre site.",
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
      recommended: true,
      projectType: "Refaire un site",
      objective: "Moderniser un site existant",
      budget: "1 000 $ à 2 000 $",
    },
  ],
};

function OfferCard({ offer, index }: { offer: Offer; index: number }) {
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
      className={`relative flex flex-col overflow-hidden rounded-lg border p-5 sm:p-6 md:p-8 lg:p-10 ${
        offer.recommended ? "border-accent/50 bg-white/[0.05]" : "border-white/10 bg-white/[0.025]"
      }`}
    >
      <div className="flex flex-col">
        <div className="flex min-h-7 items-start justify-between gap-4">
          <p className="text-[11px] font-bold uppercase text-white/48">{offer.category}</p>
          {offer.recommended && (
            <span className="rounded-full border border-accent/35 bg-accent/12 px-3 py-1 text-[10px] font-bold uppercase text-[#b7b0ff]">
              Recommandé
            </span>
          )}
        </div>

        <h3 className="mt-4 max-w-[720px] text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-[2.35rem]">{offer.title}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/56 md:text-base md:leading-7">{offer.description}</p>

        <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:mt-7 md:gap-x-8 md:gap-y-3">
          {offer.features.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs leading-5 text-white/66 md:text-sm md:leading-6">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/12 text-success">
                <Check size={11} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-white/10 pt-5 md:mt-8 md:pt-6">
          <p className="text-[10px] font-bold uppercase text-white/34">Livrable</p>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-white/62 md:text-sm md:leading-6">{offer.deliverable}</p>
          {offer.transitionNote && <p className="mt-3 max-w-2xl text-[11px] leading-5 text-white/36 md:text-xs">{offer.transitionNote}</p>}

          <div className="mt-5 md:flex md:items-end md:justify-between md:gap-8">
            <div>
              <p className="text-sm font-semibold text-white/76 md:text-base">{offer.price}</p>
              <p className="mt-1 max-w-md text-[11px] leading-4 text-white/38 md:text-xs md:leading-5">{offer.priceNote}</p>
            </div>
            <button
              type="button"
              onClick={chooseOffer}
              className={`${offer.recommended ? "button-accent" : "button-secondary"} mt-4 w-full md:mt-0 md:w-auto md:min-w-[230px]`}
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
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const situationTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const offerTabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { openLeadFlow } = useProjectIntent();
  const activeOffers = offerGroups[activeSituation];
  const activeOffer = activeOffers[activeOfferIndex];

  function selectSituation(situation: Situation, track = true) {
    setActiveSituation(situation);
    setActiveOfferIndex(0);
    if (track) trackEvent("offer_navigation_click", { offer: "Situation", situation });
  }

  function selectOffer(index: number, track = true) {
    setActiveOfferIndex(index);
    if (track) {
      trackEvent("offer_navigation_click", {
        offer: activeOffers[index].category,
        situation: activeSituation,
        position: index + 1,
      });
    }
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

  function handleOfferKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % activeOffers.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + activeOffers.length) % activeOffers.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = activeOffers.length - 1;
    else return;

    event.preventDefault();
    selectOffer(nextIndex);
    offerTabRefs.current[nextIndex]?.focus();
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
    <section id="offres" className="relative overflow-hidden border-t border-white/8 bg-canvas px-0 pb-28 pt-10 md:py-24 lg:py-28">
      <div className="page-shell relative lg:grid lg:grid-cols-[minmax(260px,0.58fr)_minmax(0,1.42fr)] lg:items-start lg:gap-12 xl:gap-20">
        <div className="lg:sticky lg:top-28">
          <div className="md:hidden">
            <p className="section-label">Formules</p>
            <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.02] text-white">
              Choisissez votre <span className="font-editorial font-normal italic text-white/68">accompagnement.</span>
            </h2>
            <p className="mt-3 max-w-sm text-xs leading-5 text-white/52">
              Partez de votre situation pour trouver l’accompagnement adapté.
            </p>
          </div>

          <SectionHeading
            label="Formules"
            text="Partez de votre situation pour choisir le bon niveau d’intervention. Le périmètre est confirmé après un échange."
            className="hidden md:block"
          >
            Choisissez votre <span className="font-editorial font-normal italic text-white/68">accompagnement.</span>
          </SectionHeading>
        </div>

        <div className="min-w-0">
        <div className="mt-7 max-w-[960px] md:mt-10 lg:mt-0">
          <p className="text-[10px] font-bold uppercase text-white/36">Votre situation</p>
          <nav aria-label="Choisir votre situation" className="mt-3 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
            <div role="tablist" aria-label="Situation actuelle" className="grid grid-cols-2">
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
                    aria-controls="offer-selector"
                    className={`min-h-14 border-r border-white/10 px-3 py-2 text-center text-[11px] font-semibold leading-4 transition-colors last:border-r-0 sm:text-xs md:min-h-16 md:text-sm ${
                      isActive ? "bg-white/[0.1] text-white" : "text-white/42 hover:bg-white/[0.04] hover:text-white/72"
                    }`}
                  >
                    {situation.label}
                  </button>
                );
              })}
            </div>
          </nav>

          <nav
            id="offer-selector"
            aria-label="Choisir un accompagnement"
            className="mt-3 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]"
          >
            <div role="tablist" aria-label="Offres disponibles" className="grid grid-cols-2">
              {activeOffers.map((offer, index) => {
                const isActive = index === activeOfferIndex;
                return (
                  <button
                    key={offer.id}
                    ref={(element) => {
                      offerTabRefs.current[index] = element;
                    }}
                    id={`offer-tab-${offer.id}`}
                    type="button"
                    role="tab"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectOffer(index)}
                    onKeyDown={(event) => handleOfferKeyDown(event, index)}
                    aria-selected={isActive}
                    aria-controls="offer-panel"
                    className={`min-h-14 border-r border-white/10 px-3 py-2 text-center text-[11px] font-semibold leading-4 transition-colors last:border-r-0 md:min-h-14 md:px-4 md:text-xs ${
                      isActive ? "bg-white/[0.085] text-white" : "text-white/40 hover:bg-white/[0.04] hover:text-white/72"
                    }`}
                  >
                    {offer.tabLabel}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        <div
          id="offer-panel"
          role="tabpanel"
          aria-labelledby={`offer-tab-${activeOffer.id}`}
          className="panel-in mt-4 max-w-[960px] md:mt-5"
          key={`${activeSituation}-${activeOffer.id}`}
        >
          <OfferCard offer={activeOffer} index={activeOfferIndex} />
        </div>

        <div className="mt-8 flex max-w-[960px] flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-5 text-white/44 md:text-sm md:leading-6">
            E-commerce, plateforme ou besoin spécifique ? Le projet est étudié sur mesure après un premier échange.
          </p>
          <button type="button" onClick={openCustomProject} className="button-secondary shrink-0">
            <MessageCircle size={17} aria-hidden="true" />
            Parler d’un projet sur mesure
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}
