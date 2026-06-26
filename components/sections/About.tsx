"use client";

import { useRef } from "react";
import Badge from "@/components/ui/Badge";
import { Body, Eyebrow, Handwriting, Heading } from "@/components/ui/Typography";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
  { value: "6+", label: "ans d'expérience produit" },
  { value: "2", label: "marchés connectés" },
  { value: "0", label: "abonnement imposé" },
];

const tags = [
  "Product Management",
  "Next.js",
  "Supabase",
  "UX Design",
  "Stratégie digitale",
  "Formation PM",
];

const comparisons = [
  ["Prestataire classique", "Livre un design ou du code"],
  ["Product Builder", "Livre un produit qui sert un objectif business"],
  ["Approche MG", "Clarifie le besoin avant de builder"],
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef);

  return (
    <section id="apropos" className="bg-white px-5 sm:px-8 lg:px-12 py-24 md:py-32">
      <div
        ref={sectionRef}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
      >
        <div className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-lg border border-black/10 bg-off-white shadow-blue-sm">
            <div className="border-b border-black/10 p-6">
              <p className="font-body text-[12px] font-semibold uppercase text-blue-night/45">
                Différence
              </p>
              <h3 className="mt-3 font-display text-3xl font-extrabold text-blue-night">
                Un partenaire produit, pas un exécutant.
              </h3>
            </div>
            <div className="divide-y divide-black/10">
              {comparisons.map(([label, value]) => (
                <div key={label} className="grid gap-2 p-6 sm:grid-cols-[0.42fr_0.58fr]">
                  <p className="font-body text-sm font-semibold text-soft-black">
                    {label}
                  </p>
                  <p className="font-body text-sm leading-[1.65] text-gray">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-lg border border-black/10 bg-blue-night text-white">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`p-5 ${i > 0 ? "border-l border-white/10" : ""}`}
              >
                <span className="block font-display text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-none text-sky-blue">
                  {stat.value}
                </span>
                <span className="mt-2 block font-body text-xs leading-snug text-white/52">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <Eyebrow>À propos</Eyebrow>
          <Heading className="mt-4">
            Un PM senior au service
            <br />
            de votre <Handwriting>ambition</Handwriting>
          </Heading>

          <Body className="mt-5">
            Je suis Medhi Ghali, Product Manager avec plus de 6 ans
            d&apos;expérience dans des entreprises à forte audience — Le
            Monde, Cdiscount. J&apos;ai appris à transformer des besoins flous
            en produits digitaux qui performent.
          </Body>

          <Body className="mt-4">
            Aujourd&apos;hui, j&apos;applique cette même rigueur au service
            des entrepreneurs et PME congolaises. Parce que le Congo mérite
            des produits digitaux à la hauteur de ses ambitions.
          </Body>

          <div className="mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
