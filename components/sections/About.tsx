"use client";

import { useRef } from "react";
import Badge from "@/components/ui/Badge";
import { Body, Eyebrow, Handwriting, Heading } from "@/components/ui/Typography";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const stats = [
  { value: "6+", label: "ans d'expérience" },
  { value: "2", label: "continents" },
  { value: "100%", label: "orienté résultat" },
];

const tags = [
  "Product Management",
  "Next.js",
  "Supabase",
  "UX Design",
  "Stratégie digitale",
  "Formation PM",
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef);

  return (
    <section id="apropos" className="bg-off-white py-24 px-6 md:px-12">
      <div
        ref={sectionRef}
        className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      >
        <div className="order-2 md:order-1">
          <div
            className="relative h-72 w-72 md:h-80 md:w-80 mx-auto md:mx-0 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(77,166,255,0.1)",
              border: "1px solid rgba(77,166,255,0.2)",
            }}
          >
            {/* TODO: remplacer par next/image */}
            {/* src="/medhi.jpg" */}
            <span className="font-display font-extrabold text-sky-blue text-[64px]">
              MG
            </span>
          </div>

          <div className="mt-8 flex items-center justify-center md:justify-start divide-x divide-black/10">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 text-center first:pl-0">
                <span className="block font-display font-extrabold text-blue-night text-[36px]">
                  {stat.value}
                </span>
                <span className="font-body text-sm text-gray">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 md:order-2">
          <Eyebrow>À propos</Eyebrow>
          <Heading className="mt-3">
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

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
