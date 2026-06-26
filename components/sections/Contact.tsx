export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-blue-night px-5 sm:px-8 lg:px-12 py-24 md:py-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 rounded-lg border border-white/12 bg-white/[0.04] p-6 text-white backdrop-blur-md md:grid-cols-[1.1fr_0.9fr] md:p-10 lg:p-12">
        <div>
          <p className="font-body text-[12px] font-semibold uppercase text-sky-blue">
            Parlons de votre projet
          </p>

          <h2 className="mt-5 max-w-3xl font-display text-[clamp(2.6rem,6vw,5.6rem)] font-extrabold leading-none text-white">
            Votre projet commence par une{" "}
            <span className="font-handwriting text-sky-blue">conversation.</span>
          </h2>

          <p className="mt-7 max-w-2xl font-body text-lg font-light leading-[1.75] text-white/58">
            Pas de formulaire complexe. Envoyez votre contexte, votre objectif
            et ce qui bloque aujourd&apos;hui. Je vous réponds avec une première
            lecture produit.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/33786034629"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-white px-6 font-body text-sm font-semibold text-blue-night transition duration-200 hover:-translate-y-0.5 hover:bg-sky-blue hover:text-white"
            >
              Envoyer un message WhatsApp
            </a>

            <a
              href="mailto:hello@medhighali.com"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/14 px-6 font-body text-sm font-semibold text-white/76 transition duration-200 hover:border-sky-blue hover:text-white"
            >
              hello@medhighali.com
            </a>
          </div>
        </div>

        <div className="grid content-end gap-4">
          {[
            ["Réponse", "sous 24h"],
            ["Premier échange", "gratuit"],
            ["Canal", "WhatsApp / email"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-md border border-white/10 bg-blue-night/45 p-5">
              <p className="font-body text-[12px] font-semibold uppercase text-white/36">
                {label}
              </p>
              <p className="mt-2 font-display text-3xl font-bold text-white">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
