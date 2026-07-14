import Image from "next/image";
import { BadgeCheck, ExternalLink, Mail, UserPlus } from "lucide-react";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import TrackedLink from "@/components/ui/TrackedLink";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact";

const qualifications = [
  "Certification Opquast · Maîtrise de la qualité web",
  "Management et gestion de projet",
  "UX design et conception d’expériences",
  "Développement web HTML/CSS",
  "IA appliquée à la delivery produit",
];

export default function ExpertiseSection() {
  return (
    <section
      id="realisations"
      className="relative z-30 -mt-72 border-b border-black/8 bg-[linear-gradient(to_bottom,transparent_0,transparent_18rem,#f6f6f4_18rem,#f6f6f4_100%)] pb-16 pt-0 text-[#101014] md:mt-0 md:border-y md:bg-[#f6f6f4] md:py-20 lg:py-24"
    >
      <div className="page-shell">
        <div
          id="apropos"
          className="identity-card-reveal overflow-hidden rounded-lg border border-black/10 bg-white text-[#101014] shadow-[0_24px_80px_rgba(5,5,10,0.14)] md:shadow-[0_24px_80px_rgba(5,5,10,0.08)]"
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
                <p className="mt-1 max-w-[210px] text-[10px] leading-4 text-black/46 md:text-[11px]">
                  Stratégie produit · Product management · UX design · Développement web
                </p>
              </div>
            </div>

            <div className="min-w-0 max-w-4xl">
              <h2 className="text-[1.5rem] font-semibold leading-[1.02] text-black/88 sm:text-3xl md:text-[3.2rem] lg:text-[3.7rem]">
                Je transforme des besoins complexes en expériences <span className="font-editorial font-normal italic text-black/46">claires et utiles.</span>
              </h2>
              <p className="mt-3 max-w-2xl text-xs leading-5 text-black/54 md:mt-5 md:text-base md:leading-7">
                7 ans d’expérience produit, de la stratégie à la mise en ligne, dans des environnements exigeants comme Cdiscount et Le Monde.
              </p>

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

        <div className="mt-12 border-t border-black/10 pt-7 md:mt-20 md:pt-10">
          <h2 className="text-[2rem] font-semibold leading-[0.98] text-black/88 md:text-5xl">
            Réalisation, <span className="font-editorial font-normal italic text-black/46">des exemples de projet.</span>
          </h2>

          <ProjectShowcase />
        </div>
      </div>
    </section>
  );
}
