import Image from "next/image";
import ProjectShowcase from "@/components/sections/ProjectShowcase";

export default function ExpertiseSection() {
  return (
    <section id="realisations" className="border-y border-black/8 bg-[#f6f6f4] pb-16 pt-10 text-[#101014] md:py-24 lg:py-28">
      <div className="page-shell">
        <div className="max-w-4xl">
          <p className="text-[10px] font-bold uppercase text-black/38">Réalisations</p>
          <h2 className="mt-4 text-[2.2rem] font-semibold leading-[0.98] text-black/88 md:text-[4rem] lg:text-[4.8rem]">
            Trois projets. <span className="font-editorial font-normal italic text-black/46">Trois univers.</span>
          </h2>
        </div>

        <ProjectShowcase />

        <div
          id="apropos"
          className="mt-16 grid grid-cols-[92px_1fr] items-start gap-4 border-t border-black/10 pt-8 md:mt-28 md:grid-cols-[minmax(220px,0.72fr)_1.28fr] md:items-center md:gap-14 md:pt-10 lg:mt-32 lg:gap-20"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-black/10 bg-[#e7e6e2] md:aspect-square md:max-w-[380px]">
            <Image
              src="/about/portrait-medhi-ghali.png"
              alt="Portrait du fondateur de MG Digital"
              fill
              sizes="(min-width: 768px) 380px, 92px"
              className="object-cover"
            />
          </div>

          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase text-black/38">À propos</p>
            <h3 className="mt-3 text-xl font-semibold leading-tight text-black/82 sm:text-2xl md:mt-5 md:text-4xl">
              7 ans d’expérience produit.
            </h3>
            <p className="mt-3 text-sm font-medium leading-6 text-black/72 md:mt-6 md:text-xl md:leading-9">
              Product Manager depuis sept ans, je transforme des besoins complexes en expériences digitales claires, performantes et mesurables.
            </p>
            <p className="mt-3 max-w-xl text-xs leading-5 text-black/50 md:mt-5 md:text-base md:leading-8">
              J’ai développé cette expertise dans des environnements digitaux exigeants, notamment au Monde et chez Cdiscount.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
