import { Eyebrow } from "@/components/ui/Typography";

const items = [
  {
    name: "Le Monde",
    tooltip: "Média · Paris",
    className: "font-display italic text-[22px] text-soft-black",
  },
  {
    name: "Cdiscount",
    tooltip: "E-commerce · Paris",
    className: "font-body font-bold text-[18px] text-soft-black",
  },
  {
    name: "La Colombe",
    tooltip: "ONG · Kinshasa",
    className: "font-display font-semibold text-[20px] text-soft-black",
  },
  {
    name: "Filtro by Top Tech",
    tooltip: "Startup · Kinshasa",
    className: "font-body font-medium text-[16px] text-soft-black",
  },
];

function MarqueeRow() {
  return (
    <>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-8 px-8 shrink-0">
          <div className="group relative">
            <span className={item.className}>{item.name}</span>
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-blue-night px-3 py-1.5 text-xs text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100">
              {item.tooltip}
            </span>
          </div>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "#4DA6FF", opacity: 0.4 }}
          />
        </div>
      ))}
    </>
  );
}

export default function Marquee() {
  return (
    <section id="realisations" className="bg-off-white py-12">
      <div className="mx-auto max-w-3xl text-center px-6">
        <Eyebrow>Ils m&apos;ont fait confiance</Eyebrow>
        <p className="mt-3 font-body text-base text-gray leading-[1.65]">
          De Paris à Kinshasa, j&apos;ai conçu des produits qui servent des
          ambitions réelles.
        </p>
      </div>

      <div className="group relative mt-10 overflow-hidden">
        <div className="flex w-max [animation:marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]">
          <MarqueeRow />
          <MarqueeRow />
        </div>
      </div>
    </section>
  );
}
