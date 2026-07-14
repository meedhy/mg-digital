"use client";

import { Blocks, PanelsTopLeft, ShoppingBag } from "lucide-react";
import { ComponentType, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { trackEvent } from "@/lib/tracking";

type Technology = {
  title: string;
  text: string;
  note: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
};

const technologies: Technology[] = [
  {
    title: "Site administrable",
    text: "WordPress ou CMS adapté pour les sites vitrines et les contenus régulièrement mis à jour.",
    note: "Autonomie éditoriale",
    icon: PanelsTopLeft,
  },
  {
    title: "Commerce en ligne",
    text: "Shopify, WooCommerce ou une solution compatible avec le fonctionnement du projet.",
    note: "Catalogue et commandes",
    icon: ShoppingBag,
  },
  {
    title: "Développement sur mesure",
    text: "Next.js et technologies modernes pour les plateformes, espaces clients et outils métier.",
    note: "Fonctionnalités spécifiques",
    icon: Blocks,
  },
];

function InterfacePreview({ active }: { active: number }) {
  return (
    <div className="relative min-h-[330px] overflow-hidden rounded-lg border border-white/10 bg-[#09090d] p-5 md:min-h-[390px] md:p-7">
      <div className="interface-grid absolute inset-0 opacity-28" />
      <div key={active} className="panel-in relative h-full">
        <div className="flex items-center justify-between border-b border-white/8 pb-4">
          <div className="flex gap-2">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase text-white/36">
            {technologies[active].note}
          </span>
        </div>

        {active === 0 && (
          <div className="mt-6 grid grid-cols-[96px_1fr] gap-5 md:grid-cols-[130px_1fr]">
            <div className="grid content-start gap-3 border-r border-white/8 pr-4">
              {["Pages", "Articles", "Médias", "Menus"].map((item, index) => (
                <span
                  key={item}
                  className={`rounded-md px-3 py-2 text-[11px] ${index === 0 ? "bg-accent/14 text-[#b7b0ff]" : "text-white/34"}`}
                >
                  {item}
                </span>
              ))}
            </div>
            <div>
              <div className="h-7 w-2/3 rounded-md bg-white/78" />
              <div className="mt-3 h-2 w-4/5 rounded-full bg-white/10" />
              <div className="mt-2 h-2 w-3/5 rounded-full bg-white/7" />
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[0, 1, 2, 3].map((item) => (
                  <div key={item} className="h-20 rounded-md border border-white/8 bg-white/[0.03]" />
                ))}
              </div>
            </div>
          </div>
        )}

        {active === 1 && (
          <div className="mt-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="h-7 w-40 rounded-md bg-white/78" />
                <div className="mt-3 h-2 w-28 rounded-full bg-white/9" />
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/14 text-[#b7b0ff]">
                <ShoppingBag size={16} />
              </span>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="overflow-hidden rounded-md border border-white/8 bg-white/[0.025] p-3">
                  <div className="aspect-[4/3] rounded-sm bg-gradient-to-br from-white/8 to-accent-secondary/10" />
                  <div className="mt-3 h-2 w-4/5 rounded-full bg-white/16" />
                  <div className="mt-2 h-2 w-2/5 rounded-full bg-white/8" />
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 2 && (
          <div className="relative mt-7 min-h-[260px]">
            <div className="absolute left-[8%] top-[38%] h-px w-[84%] bg-gradient-to-r from-accent/20 via-accent to-accent-secondary/20" />
            {[
              ["Besoin", "left-[2%] top-[28%]"],
              ["Données", "left-[35%] top-[8%]"],
              ["Logique", "left-[35%] top-[56%]"],
              ["Interface", "right-[1%] top-[28%]"],
            ].map(([label, position], index) => (
              <div
                key={label}
                className={`absolute ${position} flex h-20 w-24 flex-col items-center justify-center rounded-lg border border-white/10 bg-[#111118] sm:w-32`}
              >
                <span className={`h-2 w-2 rounded-full ${index === 3 ? "bg-success" : "bg-[#9f96ff]"}`} />
                <span className="mt-2 text-[11px] font-semibold text-white/56">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function TechnologySelector() {
  const [active, setActive] = useState(0);

  function selectTechnology(index: number) {
    setActive(index);
    trackEvent("technology_select", { technology: technologies[index].title, position: index + 1 });
  }

  return (
    <section id="technologie" className="relative overflow-hidden border-t border-white/8 bg-canvas py-24 md:py-32 lg:py-40">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeading
            label="Technologie"
            text="Nous choisissons la technologie selon votre besoin, votre budget, votre autonomie et les évolutions prévues."
          >
            La bonne solution pour le <span className="font-editorial font-normal italic text-white/62">bon projet.</span>
          </SectionHeading>
          <p className="max-w-lg text-sm leading-7 text-white/42 lg:justify-self-end">
            Le choix technique reste un moyen. Votre objectif, l’usage quotidien et la capacité à faire évoluer le site guident la décision.
          </p>
        </div>

        <div className="mt-14">
          <div
            role="tablist"
            aria-label="Choisir un type de technologie"
            className="relative grid gap-2 rounded-lg border border-white/10 bg-white/[0.025] p-1.5 md:grid-cols-3"
          >
            <span
              aria-hidden="true"
              className="absolute bottom-1.5 left-1.5 top-1.5 hidden rounded-md border border-white/12 bg-white/[0.075] transition-transform duration-500 ease-premium md:block"
              style={{
                width: "calc((100% - 12px) / 3)",
                transform: `translate3d(${active * 100}%, 0, 0)`,
              }}
            />
            {technologies.map((technology, index) => {
              const Icon = technology.icon;
              return (
                <button
                  key={technology.title}
                  id={`technology-tab-${index}`}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="technology-panel"
                  onClick={() => selectTechnology(index)}
                  className={`relative z-10 flex min-h-14 items-center gap-3 rounded-md px-4 text-left text-sm font-semibold transition-colors md:justify-center ${
                    active === index ? "bg-white/[0.075] text-white md:bg-transparent" : "text-white/42 hover:text-white/72"
                  }`}
                >
                  <Icon size={17} strokeWidth={1.7} />
                  {technology.title}
                </button>
              );
            })}
          </div>

          <div
            id="technology-panel"
            role="tabpanel"
            aria-labelledby={`technology-tab-${active}`}
            className="mt-5 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]"
          >
            <div key={`copy-${active}`} className="panel-in flex min-h-[260px] flex-col justify-between rounded-lg border border-white/10 bg-white/[0.035] p-7 md:p-9">
              <div>
                <p className="font-editorial text-3xl italic text-[#9f96ff]">0{active + 1}</p>
                <h3 className="mt-7 text-3xl font-semibold leading-tight text-white">{technologies[active].title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/58 md:text-base">{technologies[active].text}</p>
              </div>
              <p className="mt-8 border-t border-white/10 pt-5 text-xs font-semibold uppercase text-white/34">
                {technologies[active].note}
              </p>
            </div>
            <InterfacePreview active={active} />
          </div>
        </div>
      </div>
    </section>
  );
}
