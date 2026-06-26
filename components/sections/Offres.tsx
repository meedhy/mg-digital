"use client";

import { CSSProperties, useRef } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Body, Display, Eyebrow, Handwriting, Heading } from "@/components/ui/Typography";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const offers = [
  {
    tag: "Lancement",
    price: "À partir de 500$",
    description:
      "Vous existez en ligne avec un site propre, rapide et à votre image.",
    items: [
      "Session découverte (1h)",
      "Design personnalisé",
      "Responsive mobile",
      "Mise en ligne Vercel",
    ],
    featured: false,
    badge: undefined,
  },
  {
    tag: "Croissance",
    price: "À partir de 1 000$",
    description: "Votre site devient un outil de conviction.",
    items: [
      "Tout Lancement",
      "Copywriting orienté conversion",
      "SEO de base",
      "Google Analytics",
      "1 révision post-livraison",
    ],
    featured: true,
    badge: "Populaire",
  },
  {
    tag: "Transformation",
    price: "À partir de 2 000$",
    description:
      "On construit ensemble votre stratégie digitale et vos outils.",
    items: [
      "Tout Croissance",
      "Stratégie de positionnement",
      "Identité visuelle",
      "Accompagnement 30 jours",
    ],
    featured: false,
    badge: undefined,
  },
];

export default function Offres() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useScrollAnimation(sectionRef);

  return (
    <section id="offres" className="bg-off-white py-24 px-6 md:px-12">
      <div ref={sectionRef} className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Eyebrow>Ce que je construis</Eyebrow>
          <Heading className="mt-3">
            Pas de template.
            <br />
            <Handwriting>Un produit</Handwriting> pensé pour votre business.
          </Heading>
          <Body color="gray" className="mt-4">
            Chaque projet commence par comprendre votre ambition.
          </Body>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <Card
              key={offer.tag}
              variant={offer.featured ? "featured" : "default"}
              badge={offer.badge}
              className="opacity-0 [animation:fadeSlideUp_600ms_ease_forwards]"
              style={{ animationDelay: `${i * 120}ms` } as CSSProperties}
            >
              <span className="font-body text-sm font-semibold uppercase tracking-wide text-gray">
                {offer.tag}
              </span>
              <div className="mt-3">
                <Display size="sm" color="accent">
                  {offer.price}
                </Display>
              </div>
              <Body className="mt-3" color="gray">
                {offer.description}
              </Body>
              <ul className="mt-6 space-y-2">
                {offer.items.map((item) => (
                  <li
                    key={item}
                    className="font-body text-sm text-soft-black flex items-start gap-2"
                  >
                    <span className="text-sky-blue">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center text-center gap-4">
          <Body color="gray" align="center">
            Pas sûr de quelle formule choisir ? On en parle ensemble —
            c&apos;est gratuit.
          </Body>
          <Button variant="whatsapp" href="https://wa.me/33786034629">
            Discutons sur WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
