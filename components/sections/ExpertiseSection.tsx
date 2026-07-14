import Image from "next/image";
import { BadgeCheck, ExternalLink, Mail, UserPlus } from "lucide-react";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import TrackedLink from "@/components/ui/TrackedLink";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact";

const expertise = ["Stratégie produit", "UX/UI design", "Développement web", "Delivery"];

const qualifications = [
  "Certification Opquast · Maîtrise de la qualité web",
  "Management et gestion de projet",
  "UX design et conception d’expériences",
  "Développement web HTML/CSS",
  "IA appliquée à la delivery produit",
];

export default function ExpertiseSection() {
  return (
    <section id="realisations" className="border-y border-black/8 bg-[#f6f6f4] pb-16 pt-10 text-[#101014] md:py-20 lg:py-24">
      <div className="page-shell">
        <div
          id="apropos"
          className="overflow-hidden rounded-lg border border-black/10 bg-white text-[#101014] shadow-[0_24px_80px_rgba(5,5,10,0.08)]"
        >
          <div className="grid gap-4 p-5 md:grid-cols-[auto_1fr] md:gap-x-8 md:p-8 lg:p-10">
            <div className="flex items-center gap-4 md:block">
              <div className="relative size-20 shrink-0 md:size-28">
                <div className="relative size-full overflow-hidden rounded-full border border-white/16 bg-white/8">
                  <Image
                    src="/about/portrait-medhi-ghali.png"
                    alt="Portrait de Medhi Ghali"
                    fill
                    sizes="(min-width: 768px) 112px, 80px"
                    className="object-cover"
                  />
                </div>
                    <span className="absolute bottom-1 right-1 size-4 rounded-full border-[3px] border-white bg-[#22c875]" aria-label="Disponible" />
              </div>
              <div className="md:mt-4">
                <p className="text-base font-semibold text-black/86">Medhi Ghali</p>
                <p className="mt-1 flex items-center gap-1.5 text-[11px] text-black/46">
                  <span className="size-1.5 rounded-full bg-[#22c875]" />
                  Disponible
                </p>
              </div>
            </div>

            <div className="min-w-0 max-w-4xl">
              <p className="text-[10px] font-bold uppercase text-black/36">Product Manager · UX/UI · Web</p>
              <h2 className="mt-2 text-[1.5rem] font-semibold leading-[1.02] text-black/88 sm:text-3xl md:text-[3.2rem] lg:text-[3.7rem]">
                Je transforme des besoins complexes en expériences <span className="font-editorial font-normal italic text-black/46">claires et utiles.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-xs leading-5 text-black/54 md:mt-5 md:text-base md:leading-7">
                7 ans d’expérience produit, de la stratégie à la mise en ligne, dans des environnements exigeants comme Cdiscount et Le Monde.
              </p>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-5" aria-label="Expertises">
                {expertise.map((item) => (
                  <span key={item} className="shrink-0 rounded-full border border-black/10 bg-black/[0.025] px-3 py-1.5 text-[10px] font-semibold text-black/58">
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-4 border-t border-black/10 pt-3 md:mt-5 md:pt-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-black/38">
                  <BadgeCheck size={14} strokeWidth={1.8} aria-hidden="true" />
                  Qualifications
                </div>
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Liste des qualifications">
                {qualifications.map((qualification) => (
                    <span key={qualification} className="shrink-0 rounded-full bg-black/[0.045] px-3 py-1.5 text-[9px] leading-4 text-black/52 md:text-[11px]">
                      {qualification}
                    </span>
                ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t border-black/10 px-5 py-4 md:px-8 lg:px-10">
            <TrackedLink
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              eventName="whatsapp_click"
              eventPayload={{ source: "identity_card" }}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/14 px-4 text-sm font-semibold text-black/72 transition-colors hover:border-black/28 hover:bg-black/[0.035] hover:text-black"
            >
              <WhatsAppIcon size={16} className="text-[#19a957]" />
              Échanger
            </TrackedLink>
            <TrackedLink
              href="mailto:hello@medhighali.com"
              eventName="email_click"
              eventPayload={{ source: "identity_card" }}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/14 px-4 text-sm font-semibold text-black/72 transition-colors hover:border-black/28 hover:bg-black/[0.035] hover:text-black"
            >
              <Mail size={16} aria-hidden="true" />
              Email
            </TrackedLink>
            <a
              href="/medhi-ghali.vcf"
              download
              aria-label="Ajouter Medhi Ghali aux contacts"
              title="Ajouter aux contacts"
              className="inline-flex size-11 items-center justify-center rounded-full border border-black/14 text-black/62 transition-colors hover:border-black/28 hover:bg-black/[0.035] hover:text-black"
            >
              <UserPlus size={17} aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com/in/medhi-ghali-62a0a2154"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ouvrir le profil LinkedIn de Medhi Ghali"
              title="LinkedIn"
              className="inline-flex size-11 items-center justify-center rounded-full border border-black/14 text-black/62 transition-colors hover:border-black/28 hover:bg-black/[0.035] hover:text-black"
            >
              <ExternalLink size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-14 border-t border-black/10 pt-8 md:mt-24 md:pt-12">
          <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-12">
            <div className="max-w-4xl">
              <p className="text-[10px] font-bold uppercase text-black/38">Réalisations sélectionnées</p>
              <h2 className="mt-4 text-[2.2rem] font-semibold leading-[0.98] text-black/88 md:text-[4rem] lg:text-[4.8rem]">
                Des produits pensés <span className="font-editorial font-normal italic text-black/46">jusque dans les détails.</span>
              </h2>
            </div>
            <p className="max-w-lg text-xs leading-5 text-black/52 md:text-base md:leading-7">
              E-commerce, média et identité de marque&nbsp;: découvrez les interfaces, les systèmes et les déclinaisons livrés.
            </p>
          </div>

          <ProjectShowcase />
        </div>
      </div>
    </section>
  );
}
