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
  price: string;
  priceNote: string;
  cta: string;
  recommended: boolean;
  projectType: string;
  objective: string;
  budget: string;
  secondaryNote?: string;
};

// Source unique pour les onglets mobiles, les cartes desktop et le préremplissage du formulaire.
const offers: Offer[] = [
  {
    id: "audit",
    tabLabel: "Audit",
    category: "Audit & Conseil",
    title: "Savoir quoi améliorer",
    description: "Un diagnostic clair pour identifier les priorités avant d’investir.",
    features: [
      "Analyse des objectifs et des besoins",
      "Audit UX/UI et responsive",
      "Identification des points de friction",
      "Recommandations et feuille de route",
    ],
    price: "À partir de 250 $",
    priceNote: "Selon le nombre de pages et la complexité du projet.",
    cta: "Auditer mon projet",
    recommended: false,
    projectType: "Auditer ou cadrer",
    objective: "Améliorer un projet existant",
    budget: "Moins de 500 $",
  },
  {
    id: "conception",
    tabLabel: "Conception",
    category: "UX/UI & Spécifications",
    title: "Concevoir avant de développer",
    description: "Une expérience pensée et documentée pour votre développeur ou votre équipe technique.",
    features: [
      "Cadrage, arborescence et parcours",
      "Wireframes et maquettes Figma",
      "Prototype responsive interactif",
      "Spécifications développeur",
    ],
    price: "À partir de 650 $",
    priceNote: "Pour une landing page ou un site vitrine de taille limitée.",
    cta: "Concevoir mon projet",
    recommended: false,
    projectType: "Concevoir l’UX/UI",
    objective: "Préparer le développement",
    budget: "500 $ à 900 $",
  },
  {
    id: "creation",
    tabLabel: "Création",
    category: "Site clé en main",
    title: "Lancer un site complet",
    description: "De la réflexion à la mise en ligne, un site professionnel conçu pour votre activité.",
    features: [
      "Stratégie, contenus et arborescence",
      "Design Figma responsive",
      "Intégration sur un CMS adapté",
      "SEO, analytics et mise en ligne",
    ],
    price: "À partir de 1 200 $",
    priceNote: "Pour un site vitrine professionnel de 4 à 6 pages.",
    cta: "Créer mon site",
    recommended: true,
    projectType: "Créer un site",
    objective: "Lancer un site complet",
    budget: "1 000 $ à 2 000 $",
    secondaryNote: "Framer, Webflow ou WordPress selon le projet.",
  },
  {
    id: "refonte",
    tabLabel: "Refonte",
    category: "Refonte & Reprise",
    title: "Faire évoluer l’existant",
    description: "Une reprise structurée pour moderniser le design, l’expérience et la gestion de votre site.",
    features: [
      "Audit du site et du CMS existants",
      "Refonte UX/UI et responsive",
      "Reprise ou migration des contenus",
      "Tests, redirections et mise en ligne",
    ],
    price: "À partir de 1 500 $",
    priceNote: "Selon l’état du site, son volume et sa technologie actuelle.",
    cta: "Repenser mon site",
    recommended: false,
    projectType: "Refaire un site",
    objective: "Moderniser un site existant",
    budget: "1 000 $ à 2 000 $",
  },
];

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
      className={`relative flex h-full min-h-[500px] flex-col overflow-hidden rounded-lg border p-5 sm:p-6 md:min-h-[540px] md:p-7 ${
        offer.recommended ? "border-accent/50 bg-white/[0.05]" : "border-white/10 bg-white/[0.025]"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex min-h-7 items-start justify-between gap-4">
          <p className="text-[11px] font-bold uppercase text-white/48">{offer.category}</p>
          {offer.recommended && (
            <span className="rounded-full border border-accent/35 bg-accent/12 px-3 py-1 text-[10px] font-bold uppercase text-[#b7b0ff]">
              Recommandé
            </span>
          )}
        </div>

        <h3 className="mt-4 max-w-[420px] text-2xl font-semibold leading-tight text-white sm:text-3xl">{offer.title}</h3>
        <p className="mt-3 max-w-xl text-sm leading-6 text-white/56">{offer.description}</p>

        <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:mt-6 md:gap-x-5 md:gap-y-3">
          {offer.features.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs leading-5 text-white/66 md:text-sm md:leading-6">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/12 text-success">
                <Check size={11} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {offer.secondaryNote && <p className="mt-4 text-xs leading-5 text-white/38">{offer.secondaryNote}</p>}

        <div className="mt-auto border-t border-white/10 pt-5 md:pt-6">
          <p className="text-sm font-semibold text-white/76">{offer.price}</p>
          <p className="mt-1 min-h-9 text-[11px] leading-4 text-white/38">{offer.priceNote}</p>
          <button
            type="button"
            onClick={chooseOffer}
            className={`${offer.recommended ? "button-accent" : "button-secondary"} mt-4 w-full`}
          >
            {offer.cta}
            <ArrowUpRight className="button-arrow" size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function OffersExperience() {
  const [activeOfferIndex, setActiveOfferIndex] = useState(2);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { openLeadFlow } = useProjectIntent();

  useEffect(() => {
    const activeTab = tabRefs.current[activeOfferIndex];
    if (!activeTab || window.innerWidth >= 768) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    activeTab.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
  }, [activeOfferIndex]);

  function selectOffer(index: number, track = true) {
    setActiveOfferIndex(index);
    if (track) trackEvent("offer_navigation_click", { offer: offers[index].category, position: index + 1 });
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % offers.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + offers.length) % offers.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = offers.length - 1;
    else return;

    event.preventDefault();
    selectOffer(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  function openCustomProject() {
    trackEvent("offer_cta_click", { offer: "Projet sur mesure", position: 5 });
    openLeadFlow({
      offer: "Projet sur mesure",
      projectType: "Projet sur mesure",
      objective: "Fonctionnalités avancées",
      budget: "Plus de 2 000 $",
    });
  }

  return (
    <section id="offres" className="relative overflow-hidden border-t border-white/8 bg-canvas px-0 pb-16 pt-10 md:py-24 lg:py-32">
      <div className="page-shell relative">
        <div className="md:hidden">
          <p className="section-label">Formules</p>
          <h2 className="mt-4 text-[1.75rem] font-semibold leading-[1.02] text-white">
            Choisissez votre <span className="font-editorial font-normal italic text-white/68">accompagnement.</span>
          </h2>
          <p className="mt-3 max-w-sm text-xs leading-5 text-white/52">
            Du conseil à la mise en ligne, choisissez l’accompagnement adapté à votre projet.
          </p>
        </div>

        <SectionHeading
          label="Formules"
          text="Du conseil à la mise en ligne, choisissez le niveau d’intervention adapté à votre projet. Le périmètre est confirmé après un échange."
          className="hidden md:block"
        >
          Choisissez votre <span className="font-editorial font-normal italic text-white/68">accompagnement.</span>
        </SectionHeading>

        <nav
          aria-label="Choisir un accompagnement"
          className="mt-5 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.025] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
        >
          <div role="tablist" className="flex min-w-max">
            {offers.map((offer, index) => {
              const isActive = index === activeOfferIndex;
              return (
                <button
                  key={offer.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`offer-tab-${offer.id}`}
                  type="button"
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectOffer(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  aria-selected={isActive}
                  aria-controls="mobile-offer-panel"
                  className={`min-h-14 min-w-[112px] border-r border-white/10 px-4 text-center text-xs font-semibold transition-colors last:border-r-0 ${
                    isActive ? "bg-white/[0.09] text-white" : "text-white/42 hover:bg-white/[0.04] hover:text-white/72"
                  }`}
                >
                  {offer.tabLabel}
                </button>
              );
            })}
          </div>
        </nav>

        <div
          id="mobile-offer-panel"
          role="tabpanel"
          aria-labelledby={`offer-tab-${offers[activeOfferIndex].id}`}
          className="panel-in mx-auto mt-4 max-w-[680px] md:hidden"
          key={activeOfferIndex}
        >
          <OfferCard offer={offers[activeOfferIndex]} index={activeOfferIndex} />
        </div>

        <div className="mt-12 hidden max-w-[1080px] grid-cols-2 items-stretch gap-5 md:grid lg:mt-14 lg:gap-6">
          {offers.map((offer, index) => (
            <OfferCard key={offer.id} offer={offer} index={index} />
          ))}
        </div>

        <div className="mt-8 flex max-w-[1080px] flex-col gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-5 text-white/44 md:text-sm md:leading-6">
            E-commerce, plateforme ou besoin spécifique ? Le projet est étudié sur mesure après un premier échange.
          </p>
          <button type="button" onClick={openCustomProject} className="button-secondary shrink-0">
            <MessageCircle size={17} aria-hidden="true" />
            Parler d’un projet sur mesure
          </button>
        </div>
      </div>
    </section>
  );
}
