import Image from "next/image";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ExpertiseSection() {
  return (
    <section id="realisations" className="border-y border-black/8 bg-[#f2f1ee] py-24 text-[#101014] md:py-28 lg:py-32">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <SectionHeading
            label="Réalisations"
            className="[&_.section-label]:text-black/40"
          >
            Des projets concrets, pensés <span className="font-editorial font-normal italic text-black/48">jusque dans les détails.</span>
          </SectionHeading>

          <p className="max-w-xl text-base leading-8 text-black/54 lg:justify-self-end">
            Une sélection de produits et d’expériences digitales menés dans des environnements exigeants, de la stratégie à la mise en ligne.
          </p>
        </div>

        <ProjectShowcase />

        <div
          id="apropos"
          className="mt-24 grid gap-8 border-t border-black/10 pt-10 md:mt-32 md:grid-cols-[minmax(220px,0.72fr)_1.28fr] md:items-center md:gap-14 lg:gap-20"
        >
          <div className="relative aspect-square w-full max-w-[380px] overflow-hidden rounded-lg border border-black/10 bg-[#e7e6e2]">
            <Image
              src="/about/portrait-medhi-ghali.png"
              alt="Portrait du fondateur de MG Digital"
              fill
              sizes="(min-width: 768px) 380px, calc(100vw - 40px)"
              className="object-cover"
            />
          </div>

          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase text-black/38">À propos</p>
            <h3 className="mt-5 text-3xl font-semibold leading-tight text-black/82 md:text-4xl">
              7 ans d’expérience produit.
            </h3>
            <p className="mt-6 text-lg font-medium leading-8 text-black/72 md:text-xl md:leading-9">
              Product Manager depuis sept ans, je transforme des besoins complexes en expériences digitales claires, performantes et mesurables.
            </p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/50 md:text-base md:leading-8">
              J’ai développé cette expertise dans des environnements digitaux exigeants, notamment au Monde et chez Cdiscount.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
