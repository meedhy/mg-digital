import Image from "next/image";
import { ExternalLink, Mail } from "lucide-react";
import BrandMark from "@/components/ui/BrandMark";
import TrackedLink from "@/components/ui/TrackedLink";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact";

const navigation = [
  ["Réalisations", "#realisations"],
  ["Services", "#services"],
  ["Méthode", "#methode"],
  ["Formules", "#offres"],
  ["Votre projet", "#contact"],
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-[#030304] pb-8 pt-14 text-white md:pt-16">
      <div className="page-shell grid gap-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <BrandMark />
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/42">
            Création de sites internet à Kinshasa et à distance pour entrepreneurs, indépendants et PME.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase text-white/28">Kinshasa · RDC · Diaspora · À distance</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-white/32">Navigation</p>
          <div className="mt-5 grid gap-3">
            {navigation.map(([label, href]) => (
              <a key={href} href={href} className="w-fit text-sm text-white/48 transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase text-white/32">Contact</p>
          <div className="mt-5 flex items-center gap-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-full border border-white/14 bg-white/5">
              <Image
                src="/about/portrait-medhi-ghali.png"
                alt="Portrait de Medhi Ghali"
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white/82">Parlons de votre projet</p>
              <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/40">
                <span className="size-2 rounded-full bg-[#29c47d]" />
                En ligne · lun–sam, 9h–20h
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <TrackedLink
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              eventName="whatsapp_click"
              eventPayload={{ source: "footer" }}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 px-4 text-sm text-white/68 transition-colors hover:border-white/24 hover:text-white"
            >
              <WhatsAppIcon size={15} className="text-[#39d47a]" />
              Échanger
            </TrackedLink>
            <TrackedLink
              href="mailto:hello@medhighali.com"
              eventName="email_click"
              eventPayload={{ source: "footer" }}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 px-4 text-sm text-white/68 transition-colors hover:border-white/24 hover:text-white"
            >
              <Mail size={15} aria-hidden="true" />
              Email
            </TrackedLink>
            <a
              href="https://linkedin.com/in/medhi-ghali-62a0a2154"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil LinkedIn de Medhi Ghali"
              className="flex size-10 items-center justify-center rounded-full border border-white/12 text-white/48 transition-colors hover:border-white/24 hover:text-white"
            >
              <ExternalLink size={17} />
            </a>
          </div>
        </div>
      </div>

      <div className="page-shell mt-14 flex flex-col gap-4 border-t border-white/8 pt-6 text-xs text-white/28 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} MG Digital · Tous droits réservés</p>
        <div className="flex flex-wrap gap-5">
          <a href="/mentions-legales" className="transition-colors hover:text-white/60">
            Mentions légales
          </a>
          <a href="/confidentialite" className="transition-colors hover:text-white/60">
            Politique de confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
}
