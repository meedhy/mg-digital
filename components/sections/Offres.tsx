"use client";

import { useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const offers = [
  {
    tag: "LANCEMENT",
    price: "500$ – 900$",
    audience: "TPE, indépendant, activité locale",
    description:
      "Une présence digitale nette pour exister, rassurer et être joignable.",
    items: ["Session découverte", "Site vitrine 4-5 pages", "Design personnalisé", "Mise en ligne Vercel"],
    featured: false,
  },
  {
    tag: "CROISSANCE",
    price: "1 000$ – 2 000$",
    audience: "PME qui veut convaincre et convertir",
    description: "Un site construit pour transformer la confiance en demandes.",
    items: ["Tout Lancement", "Copywriting conversion", "SEO de base", "Analytics + dashboard"],
    featured: true,
  },
  {
    tag: "TRANSFORMATION",
    price: "2 000$ – 4 000$",
    audience: "PME ambitieuse, marque à structurer",
    description:
      "Une stratégie, une identité et des outils internes pour accélérer.",
    items: ["Tout Croissance", "Positionnement", "Base de données / CRM léger", "Accompagnement 30j"],
    featured: false,
  },
];

const method = [
  {
    step: "01",
    title: "Clarifier",
    text: "On transforme une ambition parfois floue en objectif business net.",
  },
  {
    step: "02",
    title: "Construire",
    text: "Design, contenu, technique et parcours avancent dans le même sens.",
  },
  {
    step: "03",
    title: "Mesurer",
    text: "Le site ne s'arrête pas à la mise en ligne: les KPI deviennent lisibles.",
  },
];

export default function Offres() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef);

  return (
    <section id="offres" className="bg-off-white px-5 sm:px-8 lg:px-12 py-24 md:py-32">
      <div ref={sectionRef} className="mx-auto max-w-7xl">
        <div className="mb-14 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-3 font-body text-[12px] font-semibold uppercase text-blue-night/45">
              Offres
            </p>
            <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] font-extrabold leading-none text-soft-black">
              Pas de template.
              <span className="block font-handwriting text-[clamp(3.4rem,6.5vw,6.2rem)] leading-[0.82] text-sky-blue">
                Un produit.
              </span>
            </h2>
          </div>
          <p className="max-w-2xl font-body text-lg leading-[1.75] text-gray md:justify-self-end">
            Les formules sont positionnées par niveau d&apos;ambition business,
            pas par nombre de pages. Le bon livrable dépend de ce que votre
            activité doit gagner: crédibilité, conversion ou structure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <div
              key={offer.tag}
              className={`group flex min-h-[430px] flex-col rounded-lg bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${
                offer.featured
                  ? "border-2 border-blue-night shadow-blue-md"
                  : "border border-black/10 shadow-blue-sm"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-body text-[12px] font-semibold uppercase text-blue-night/55">
                  {offer.tag}
                </span>
                {offer.featured && (
                  <span className="rounded-full bg-sky-blue px-3 py-1 text-[11px] font-semibold text-white">
                    Populaire
                  </span>
                )}
              </div>

              <p className="mt-5 font-display text-[clamp(2.25rem,4vw,3.15rem)] font-extrabold leading-none text-blue-night">
                {offer.price}
              </p>

              <p className="mt-4 font-body text-sm font-semibold text-soft-black">
                {offer.audience}
              </p>

              <p className="mt-3 font-body text-[15px] leading-[1.6] text-gray">
                {offer.description}
              </p>

              <div className="mt-auto pt-8">
                <div className="border-t border-black/8 pt-6">
                  <ul className="grid gap-3">
                    {offer.items.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 font-body text-[13px] leading-relaxed text-gray"
                      >
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-blue" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div id="methode" className="mt-20 grid overflow-hidden rounded-lg border border-black/10 bg-soft-black text-white md:grid-cols-[0.8fr_1.2fr]">
          <div className="border-b border-white/10 p-8 md:border-b-0 md:border-r">
            <p className="font-body text-[12px] font-semibold uppercase text-sky-blue">
              Méthode
            </p>
            <h3 className="mt-4 font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Le digital, cadré comme un produit.
            </h3>
          </div>
          <div className="grid md:grid-cols-3">
            {method.map((item) => (
              <div key={item.step} className="border-white/10 p-8 md:border-l">
                <p className="font-handwriting text-3xl font-bold text-sky-blue">
                  {item.step}
                </p>
                <h4 className="mt-5 font-body text-lg font-semibold text-white">
                  {item.title}
                </h4>
                <p className="mt-3 font-body text-sm leading-[1.7] text-white/56">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-lg border border-black/10 bg-white p-6 md:flex-row md:items-center">
          <p className="font-body text-[15px] leading-relaxed text-gray">
            Pas sûr de quelle formule choisir ? Une conversation suffit pour
            cadrer le bon niveau d&apos;ambition.
          </p>
          <a
            href="https://wa.me/33786034629"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-blue-night px-6 font-body text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-sky-blue"
          >
            Discutons sur WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
