import {
  Code2,
  Compass,
  Gauge,
  GraduationCap,
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
    title: "SEO & performance",
    text: "Vitesse, référencement technique et mesure.",
    icon: Gauge,
  },
  {
    title: "Mise en ligne",
    text: "Domaine, hébergement, sécurité et sauvegardes.",
    icon: ShieldCheck,
  },
  {
    title: "Formation & suivi",
    text: "Prise en main et accompagnement après lancement.",
    icon: GraduationCap,
  },
];

export default function ServicesOverview() {
  return (
    <section id="services" className="border-t border-white/8 bg-canvas-soft pb-8 pt-14 text-white md:pb-12 md:pt-24">
      <div className="page-shell">
        <div className="grid gap-6 border-b border-white/10 pb-8 md:grid-cols-[0.78fr_1.22fr] md:items-end md:gap-16 md:pb-12">
          <div>
            <p className="section-label">Services</p>
            <h2 className="mt-4 max-w-lg text-[2rem] font-semibold leading-[0.98] md:text-5xl">
              De l’idée au site <span className="font-editorial font-normal italic text-white/58">en ligne.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-white/56 md:text-lg md:leading-8">
            Stratégie, design, développement et mise en ligne: je prends en charge le niveau d’intervention dont votre projet a besoin.
          </p>
        </div>

        <div className="grid grid-cols-2 border-b border-white/10 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className={`min-h-[160px] py-5 ${index % 2 === 0 ? "border-r pr-4" : "pl-4"} ${
                  index < 4 ? "border-b" : ""
                } border-white/10 md:min-h-[190px] md:p-8 ${index % 3 !== 2 ? "md:border-r" : "md:border-r-0"} ${
                  index >= 3 ? "md:border-t" : "md:border-t-0"
                } ${index < 4 ? "md:border-b-0" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <Icon size={18} strokeWidth={1.7} className="text-[#9f96ff]" aria-hidden="true" />
                  <span className="text-[9px] font-bold text-white/22">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-sm font-semibold leading-5 md:text-lg">{service.title}</h3>
                <p className="mt-2 text-[10px] leading-4 text-white/46 md:max-w-[290px] md:text-sm md:leading-6">
                  {service.text}
                </p>
              </article>
            );
          })}
        </div>

        <p className="mt-5 text-xs font-semibold text-white/42 md:text-sm">
          Un seul interlocuteur, de la première idée à la mise en ligne.
        </p>
      </div>
    </section>
  );
}
