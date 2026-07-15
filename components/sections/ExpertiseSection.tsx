import Image from "next/image";
import { Mail } from "lucide-react";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import TrackedLink from "@/components/ui/TrackedLink";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact";

const expertiseAreas = [
  "Conseil & cadrage",
  "Stratégie produit",
  "UX/UI design",
  "Gestion de projet",
  "Conception & intégration web",
  "Formation & prise en main du CMS",
];

export default function ExpertiseSection() {
  return (
    <section
      id="realisations"
      className="realisations-overlap relative z-30 border-b border-black/8 pb-16 pt-0 text-[#101014] md:border-y md:py-20 lg:py-24"
    >
      <div className="page-shell">
        <div
          id="apropos"
          className="identity-card-reveal overflow-hidden rounded-lg border border-black/10 bg-white text-[#101014] shadow-[0_24px_80px_rgba(5,5,10,0.14)] md:shadow-[0_24px_80px_rgba(5,5,10,0.08)]"
        >
          <div className="grid gap-5 p-5 md:grid-cols-[auto_1fr] md:gap-x-8 md:p-8 lg:p-10">
            <div className="flex items-center gap-4 md:items-start">
              <div className="relative size-20 shrink-0 md:size-24">
                <div className="relative size-full overflow-hidden rounded-full border border-white/16 bg-white/8">
                  <Image
                    src="/about/portrait-medhi-ghali.png"
                    alt="Portrait de Medhi Ghali"
                    fill
                    sizes="(min-width: 768px) 96px, 80px"
                    className="object-cover"
                  />
                </div>
                <span className="absolute bottom-1 right-1 size-4 rounded-full border-[3px] border-white bg-[#22c875]" aria-label="Disponible" />
              </div>
              <div className="md:hidden">
                <h2 className="text-[1.5rem] font-semibold leading-none text-black/88">
                  Je suis <span className="font-editorial font-normal italic text-black/48">Medhi Ghali.</span>
                </h2>
              </div>
            </div>

            <div className="min-w-0 max-w-4xl">
              <h2 className="hidden text-3xl font-semibold leading-none text-black/88 md:block lg:text-[2.5rem]">
                Je suis <span className="font-editorial font-normal italic text-black/48">Medhi Ghali.</span>
              </h2>
              <p className="max-w-3xl text-base leading-7 text-black/60 md:mt-4">
                J’accompagne les entrepreneurs et les PME dans la conception, la refonte et l’amélioration de leurs expériences digitales.
                <span className="mt-2 block">Une approche mêlant stratégie, design et gestion de projet, nourrie par 7 ans d’expérience chez Cdiscount et Le Monde.</span>
              </p>

              <div className="mt-5 border-t border-black/10 pt-4">
                <p className="text-[10px] font-bold uppercase text-black/38">Domaines d’expertise</p>
                <div className="mt-3 flex flex-wrap gap-2" aria-label="Domaines d’expertise">
                  {expertiseAreas.map((area) => (
                    <span key={area} className="inline-flex min-h-10 items-center rounded-full border border-black/9 bg-black/[0.035] px-3 text-[13px] font-medium leading-5 text-black/62 md:text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <TrackedLink
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="whatsapp_click"
                  eventPayload={{ source: "identity_card" }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#101014] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#28282f]"
                >
                  <WhatsAppIcon size={17} className="text-[#25d366]" />
                  Discuter de votre projet
                </TrackedLink>
                <TrackedLink
                  href="mailto:hello@medhighali.com"
                  eventName="email_click"
                  eventPayload={{ source: "identity_card" }}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/14 px-5 text-sm font-semibold text-black/68 transition-colors hover:border-black/28 hover:bg-black/[0.035] hover:text-black"
                >
                  <Mail size={17} aria-hidden="true" />
                  M’écrire par email
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>

        <div id="projets" className="mt-12 scroll-mt-24 border-t border-black/10 pt-7 md:mt-20 md:scroll-mt-28 md:pt-10">
          <h2 className="text-[2rem] font-semibold leading-[0.98] text-black/88 md:text-5xl">
            Quelques projets <span className="font-editorial font-normal italic text-black/46">sur lesquels j’ai travaillé.</span>
          </h2>

          <ProjectShowcase />
        </div>
      </div>
    </section>
  );
}
