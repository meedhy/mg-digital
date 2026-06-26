const items = [
  {
    name: "Le Monde",
    className: "font-display italic text-[24px] text-soft-black",
  },
  {
    name: "Cdiscount",
    className: "font-body font-bold text-[17px] text-soft-black",
  },
  {
    name: "La Colombe",
    className: "font-display font-semibold text-[19px] text-soft-black",
  },
  {
    name: "Filtro by Top Tech",
    className: "font-body font-normal text-[15px] text-gray",
  },
];

export default function Marquee() {
  return (
    <section id="realisations" className="border-y border-black/10 bg-white px-5 sm:px-8 lg:px-12 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[240px_1fr] md:items-center">
        <p className="font-body text-xs font-semibold uppercase text-blue-night/45">
          Expérience & références
        </p>

        <div className="flex flex-wrap items-center gap-x-10 gap-y-5 md:justify-end">
          {items.map((item, i) => (
            <span key={item.name} className="flex items-center gap-10">
              {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-black/20 sm:block" />}
              <span className={item.className}>{item.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
