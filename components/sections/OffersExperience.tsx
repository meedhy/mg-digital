"use client";

import { ArrowUpRight, Check } from "lucide-react";
import { PointerEvent, useEffect, useRef } from "react";
import { useProjectIntent } from "@/components/providers/ProjectIntentProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import { trackEvent } from "@/lib/tracking";

type Offer = {
  name: string;
  price: string;
  audience: string;
  promise: string;
  includes: string[];
  cta: string;
  featured?: boolean;
  projectType: string;
  objective?: string;
  budget: string;
};

const offers: Offer[] = [
  {
    name: "Essentiel",
    price: "500 $ — 900 $",
    audience: "Indépendants, associations et petites entreprises.",
    promise:
      "Une présence professionnelle pour présenter votre activité et être facilement contacté.",
    includes: [
      "Cadrage du besoin",
      "4 à 5 pages",
      "Design responsive",
      "Formulaire et WhatsApp",
      "SEO technique de base",
      "Mise en ligne et formation",
    ],
    cta: "Lancer mon site",
    projectType: "Créer un site",
    objective: "Présenter mon activité",
    budget: "500 $ à 900 $",
  },
  {
    name: "Business",
    price: "1 000 $ — 2 000 $",
    audience: "PME souhaitant convaincre davantage et générer des demandes.",
    promise: "Un site conçu pour transformer votre crédibilité en opportunités commerciales.",
    includes: [
      "Tout le contenu Essentiel",
      "Parcours personnalisés",
      "Accompagnement éditorial",
      "Optimisation de la conversion",
      "Analytics",
      "SEO des pages principales",
    ],
    cta: "Développer mon activité",
    featured: true,
    projectType: "Créer un site",
    objective: "Générer des demandes",
    budget: "1 000 $ à 2 000 $",
  },
  {
    name: "Sur mesure",
    price: "À partir de 2 000 $",
    audience: "Entreprises ayant des besoins fonctionnels ou métier spécifiques.",
    promise:
      "Une solution construite autour de vos processus, de vos utilisateurs et de vos ambitions.",
    includes: ["Espace client", "Réservation", "E-commerce", "Paiement", "Base de données", "Dashboard"],
    cta: "Cadrer ma solution",
    projectType: "Créer une plateforme",
    objective: "Digitaliser un service",
    budget: "Plus de 2 000 $",
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
        trackEvent("offer_view", { offer: offer.name, position: index + 1 });
        observer.disconnect();
      },
      { threshold: 0.45 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index, offer.name]);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width - 0.5) * 5).toFixed(2);
    const rotateX = ((0.5 - y / rect.height) * 5).toFixed(2);

    card.style.setProperty("--spot-x", `${x}px`);
    card.style.setProperty("--spot-y", `${y}px`);
    card.style.transform = `perspective(1100px) translate3d(0, -4px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function resetPointer() {
    if (cardRef.current) cardRef.current.style.transform = "";
  }

  function chooseOffer() {
    trackEvent("offer_cta_click", { offer: offer.name, position: index + 1 });
    openLeadFlow({
      offer: offer.name,
      projectType: offer.projectType,
      objective: offer.objective ?? "",
      budget: offer.budget,
    });
  }

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className={`group relative flex min-h-[560px] transform-gpu flex-col overflow-hidden rounded-lg border p-7 transition-[transform,border-color,box-shadow] duration-300 ease-premium md:p-8 lg:min-h-[610px] ${
        offer.featured
          ? "border-accent/55 bg-[#111119] shadow-[0_26px_90px_rgba(76,64,190,0.22)]"
          : "border-white/10 bg-white/[0.035] lg:mt-10"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--spot-x, 50%) var(--spot-y, 20%), rgba(124,108,255,0.17), transparent 58%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex min-h-7 items-start justify-between gap-4">
          <p className="text-sm font-semibold text-white">{offer.name}</p>
          {offer.featured && (
            <span className="rounded-full border border-accent/35 bg-accent/12 px-3 py-1 text-[10px] font-bold uppercase text-[#b7b0ff]">
              Recommandé
            </span>
          )}
        </div>

        <p className="mt-7 text-3xl font-semibold leading-none text-white md:text-4xl">{offer.price}</p>
        <p className="mt-5 min-h-12 text-sm font-medium leading-6 text-white/72">{offer.audience}</p>
        <p className="mt-5 border-t border-white/10 pt-5 text-sm leading-7 text-white/52">{offer.promise}</p>

        <ul className="mt-7 grid gap-3.5">
          {offer.includes.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-white/66">
              <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-success/12 text-success">
                <Check size={11} strokeWidth={2.5} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={chooseOffer}
            className={`${offer.featured ? "button-accent" : "button-secondary"} w-full`}
          >
            {offer.cta}
            <ArrowUpRight className="button-arrow" size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function OffersExperience() {
  return (
    <section id="offres" className="relative overflow-hidden border-t border-white/8 bg-canvas px-0 py-24 md:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-[radial-gradient(circle_at_50%_0%,rgba(61,139,255,0.10),transparent_60%)]" />
      <div className="page-shell relative">
        <SectionHeading
          label="Nos formules"
          text="Le budget définitif est validé après le cadrage du besoin."
        >
          Une offre adaptée à <span className="font-editorial font-normal italic text-white/68">l’ambition</span> de votre projet.
        </SectionHeading>

        <div className="mt-14 grid items-start gap-5 lg:grid-cols-3 lg:gap-4 xl:gap-6">
          {offers.map((offer, index) => (
            <OfferCard key={offer.name} offer={offer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
