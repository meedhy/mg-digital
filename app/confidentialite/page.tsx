import type { Metadata } from "next";
import Link from "next/link";
import BrandMark from "@/components/ui/BrandMark";

export const metadata: Metadata = {
  title: "Politique de confidentialité | MG Digital",
  description: "Utilisation des informations transmises à MG Digital.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-canvas py-12 text-white md:py-20">
      <div className="page-shell max-w-3xl">
        <Link href="/" className="inline-flex rounded-full"><BrandMark /></Link>
        <p className="section-label mt-16">Vos informations</p>
        <h1 className="mt-5 text-3xl font-semibold md:text-5xl">Politique de confidentialité</h1>
        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 text-sm leading-7 text-white/58">
          <section>
            <h2 className="text-lg font-semibold text-white">Données concernées</h2>
            <p className="mt-3">Le formulaire peut préparer votre type de projet, votre objectif, votre budget, votre nom, votre activité, vos coordonnées et votre message.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white">Finalité et transmission</h2>
            <p className="mt-3">Ces informations servent uniquement à comprendre votre demande et à vous répondre. Le formulaire actuel prépare un message WhatsApp : aucune réponse n’est enregistrée dans une base de données du site avant votre envoi volontaire dans WhatsApp.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white">Conservation et destinataires</h2>
            <p className="mt-3">Après l’envoi, les échanges sont conservés pendant la durée utile au traitement du projet et ne sont pas cédés à des tiers à des fins commerciales. L’utilisation de WhatsApp est également soumise aux règles de confidentialité de ce service.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-white">Vos droits</h2>
            <p className="mt-3">Vous pouvez demander l’accès, la rectification ou la suppression des informations transmises en écrivant à <a className="text-white underline underline-offset-4" href="mailto:hello@medhighali.com">hello@medhighali.com</a>.</p>
          </section>
        </div>
        <Link href="/" className="button-secondary mt-12">Retour au site</Link>
      </div>
    </main>
  );
}
