import {
  Code2,
  Compass,
  Palette,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    title: "Stratégie & cadrage",
    text: "Objectifs, arborescence et contenus prioritaires.",
    icon: Compass,
  },
  {
    title: "UX/UI design",
    text: "Parcours, maquettes Figma et design responsive.",
    icon: Palette,
  },
  {
    title: "Développement web",
    text: "Site vitrine, e-commerce ou plateforme sur mesure.",
    icon: Code2,
  },
  {
    title: "Mise en ligne & suivi",
    text: "SEO essentiel, analytics, formation et accompagnement.",
    icon: ShieldCheck,
  },
];

export default function ServicesOverview() {
  return (
    <section id="services" className="border-t border-white/8 bg-canvas-soft pb-6 pt-12 text-white md:pb-8 md:pt-20">
      <div className="page-shell">
        <div className="grid gap-4 border-b border-white/10 pb-7 md:grid-cols-[0.9fr_1.1fr] md:items-end md:gap-16 md:pb-10">
          <div>
            <p className="section-label">Services</p>
            <h2 className="mt-4 max-w-lg text-[2rem] font-semibold leading-[0.98] md:text-5xl">
              Ce que je peux prendre <span className="font-editorial font-normal italic text-white/58">en charge.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/56 md:text-lg md:leading-8">
            Un accompagnement continu, de la clarification du besoin jusqu’au site en ligne.
          </p>
        </div>

        <div className="grid grid-cols-2 border-b border-white/10 md:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className={`min-h-[142px] py-5 ${index % 2 === 0 ? "border-r pr-4" : "pl-4"} ${
                  index < 2 ? "border-b" : ""
                } border-white/10 md:min-h-[170px] md:border-b-0 md:p-6 ${index < services.length - 1 ? "md:border-r" : "md:border-r-0"}`}
              >
                <Icon size={18} strokeWidth={1.7} className="text-[#9f96ff]" aria-hidden="true" />
                <h3 className="mt-5 text-sm font-semibold leading-5 md:text-base">{service.title}</h3>
                <p className="mt-2 text-[10px] leading-4 text-white/46 md:max-w-[290px] md:text-sm md:leading-6">
                  {service.text}
                </p>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
