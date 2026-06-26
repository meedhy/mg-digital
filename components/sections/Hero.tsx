const proofPoints = [
  { value: "6+", label: "ans PM senior" },
  { value: "3-5", label: "clients an 1" },
  { value: "500$+", label: "projet calibré" },
];

const workflow = [
  "Vision",
  "Offre",
  "Produit",
  "Mesure",
];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-blue-night px-5 pt-24 text-white sm:px-8 md:pt-28 lg:px-12">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#071052] to-transparent" />

      <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-7xl grid-cols-1 items-center gap-10 pb-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 border border-white/12 bg-white/[0.04] px-3 py-2 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-sky-blue" />
            <p className="font-body text-[12px] font-medium uppercase text-white/62">
              Product Builder · Paris / Kinshasa
            </p>
          </div>

          <h1 className="font-display text-[clamp(3.1rem,7vw,6.7rem)] font-extrabold leading-[0.92] text-white">
            Vous avez la vision.
            <span className="mt-2 block font-handwriting text-[clamp(4rem,8.5vw,7.4rem)] leading-[0.72] text-sky-blue">
              Je construis.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl font-body text-[clamp(1rem,1.45vw,1.22rem)] font-light leading-[1.7] text-white/64">
            Un site pensé comme un produit, pas commandé comme une prestation.
            J&apos;accompagne les PME congolaises de l&apos;ambition business au
            produit digital mesurable.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/33786034629"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 font-body text-sm font-semibold text-blue-night transition duration-200 hover:-translate-y-0.5 hover:bg-sky-blue hover:text-white"
            >
              Discutons sur WhatsApp
            </a>
            <a
              href="#offres"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/16 px-6 font-body text-sm font-semibold text-white/82 transition duration-200 hover:border-sky-blue hover:text-white"
            >
              Voir les offres
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-white/10">
            {proofPoints.map((point) => (
              <div key={point.label} className="py-5 pr-4">
                <p className="font-display text-3xl font-extrabold text-white">
                  {point.value}
                </p>
                <p className="mt-1 font-body text-xs leading-snug text-white/40">
                  {point.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:mx-0">
          <div className="absolute -inset-4 border border-sky-blue/20" />
          <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#0f1880]/80 shadow-blue-xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="font-body text-xs uppercase text-white/38">
                  Roadmap produit
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-white">
                  Business vers digital
                </p>
              </div>
              <span className="rounded-full bg-sky-blue px-3 py-1 font-body text-xs font-semibold text-white">
                Live
              </span>
            </div>

            <div className="grid gap-4 p-5">
              {workflow.map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-[44px_1fr_auto] items-center gap-4 rounded-md border border-white/10 bg-white/[0.045] p-4"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-sm font-semibold text-blue-night">
                    0{index + 1}
                  </span>
                  <div>
                    <p className="font-body text-sm font-semibold text-white">
                      {item}
                    </p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-sky-blue"
                        style={{ width: `${58 + index * 12}%` }}
                      />
                    </div>
                  </div>
                  <span className="font-body text-xs text-white/38">
                    {index === 3 ? "KPI" : "Build"}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 border-t border-white/10">
              <div className="p-5">
                <p className="font-body text-xs uppercase text-white/38">
                  Stack
                </p>
                <p className="mt-1 font-body text-sm font-semibold text-white">
                  Next.js · Tailwind · Supabase
                </p>
              </div>
              <div className="border-l border-white/10 p-5">
                <p className="font-body text-xs uppercase text-white/38">
                  Livrable
                </p>
                <p className="mt-1 font-body text-sm font-semibold text-white">
                  Code propre, propriétaire
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
