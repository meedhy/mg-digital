import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/ui/BrandMark";

export const metadata: Metadata = {
  title: "Mentions légales | MG Digital",
  description: "Informations légales relatives au site MG Digital.",
};

export default function LegalNoticePage() {
  return (
    <main className="min-h-screen bg-canvas py-12 text-white md:py-20">
      <div className="page-shell max-w-3xl">
        <Link href="/" className="inline-flex rounded-full"><BrandMark /></Link>
        <p className="section-label mt-16">Informations légales</p>
        <h1 className="mt-5 text-3xl font-semibold md:text-5xl">Mentions légales</h1>
        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 text-sm leading-7 text-white/58">
          <section>
            <h2 className="text-lg font-semibold text-white">Éditeur du site</h2>
            <p className="mt-3">MG Digital, activité éditée par Medhi Ghali.</p>
            <p>Contact : <a className="text-white underline underline-offset-4" href="mailto:hello@medhighali.com">hello@medhighali.com</a></p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white">Responsabilité</h2>
            <p className="mt-3">Les informations publiées présentent les services de MG Digital. Elles peuvent évoluer et ne constituent pas une proposition contractuelle avant validation écrite du périmètre, du budget et du calendrier.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white">Propriété intellectuelle</h2>
            <p className="mt-3">Les textes, éléments graphiques et composants du site sont protégés. Toute reproduction ou réutilisation substantielle nécessite une autorisation préalable.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white">Informations complémentaires</h2>
            <p className="mt-3">Les informations administratives ou d’hébergement nécessaires à une demande formelle peuvent être obtenues à l’adresse de contact ci-dessus.</p>
          </section>
        </div>
        <Link href="/" className="button-secondary mt-12">Retour au site</Link>
      </div>
    </main>
  );
}
