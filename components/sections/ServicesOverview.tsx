import {
  Code2,
  Compass,
  Palette,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    title: "Clarifier votre projet",
    text: "On définit ce que votre site doit accomplir, à qui il s’adresse et ce qu’il doit contenir.",
    icon: Compass,
  },
  {
    title: "Concevoir une expérience claire",
    text: "Je structure les pages et réalise les maquettes pour rendre le site simple et agréable à utiliser.",
    icon: Palette,
  },
  {
    title: "Construire votre site",
    text: "Je développe un site rapide, responsive et facile à faire évoluer.",
    icon: Code2,
  },
  {
    title: "Le mettre en ligne sereinement",
    text: "Derniers réglages, SEO essentiel, statistiques et prise en main.",
    icon: ShieldCheck,
  },
];

export default function ServicesOverview() {
  return (
    <section id="services" className="border-t border-white/8 bg-canvas-soft pb-6 pt-12 text-white md:pb-8 md:pt-20">
      <div className="page-shell">
        <div className="pb-7 md:pb-10">
          <div className="max-w-5xl">
            <p className="section-label">Services</p>
            <h2 className="mt-4 text-[2rem] font-semibold leading-[0.98] md:text-5xl">
              Je peux prendre en charge votre projet <span className="font-editorial font-normal italic text-white/58">de bout en bout.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">
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
                <h3 className="mt-5 text-base font-semibold leading-5">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/54 md:max-w-[290px]">
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
