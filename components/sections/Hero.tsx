"use client";

import { useRef } from "react";
import Button from "@/components/ui/Button";
import { useParallax } from "@/hooks/useParallax";

function AnimatedWords({
  text,
  className = "",
  startDelay = 0,
}: {
  text: string;
  className?: string;
  startDelay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-visible mr-[0.25em] [animation:wordReveal_400ms_ease_forwards] opacity-0"
          style={{
            animationDelay: `${startDelay + i * 60}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const circleRef = useRef<HTMLDivElement>(null);
  useParallax(circleRef, 0.2);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-blue-night px-6 md:px-12 flex items-center"
      style={{
        paddingTop: "96px",
        paddingBottom: "96px",
      }}
    >
      <style>{`
        @keyframes wordReveal {
          0% { opacity: 0; clip-path: inset(0 100% 0 0); }
          100% { opacity: 1; clip-path: inset(0 0% 0 0); }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        ref={circleRef}
        className="pointer-events-none absolute -top-[200px] -right-[200px] h-[700px] w-[700px] rounded-full"
        style={{ backgroundColor: "#4DA6FF", opacity: 0.06 }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-[65%_35%] gap-12 items-center">
        <div>
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 font-body text-sm text-sky-blue opacity-0 [animation:fadeIn_500ms_ease_forwards]"
            style={{
              backgroundColor: "rgba(77,166,255,0.1)",
              border: "1px solid rgba(77,166,255,0.22)",
              animationDelay: "0ms",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sky-blue [animation:pulse-dot_2s_ease-in-out_infinite]" />
            Product Manager · Paris ↔ Kinshasa
          </span>

          <h1 className="leading-[1.05]">
            <span className="block font-display font-extrabold text-white text-display-lg">
              <AnimatedWords text="Vous avez la vision." />
            </span>
            <span
              className="block font-handwriting text-sky-blue overflow-visible"
              style={{ fontSize: "1.3em" }}
            >
              <AnimatedWords text="Je construis" startDelay={240} />
            </span>
            <span className="block font-display font-extrabold text-white text-display-lg">
              <AnimatedWords text="le produit digital" startDelay={420} />
            </span>
            <span className="block font-display font-extrabold italic text-white text-display-lg">
              <AnimatedWords text="qui la concrétise." startDelay={660} />
            </span>
          </h1>

          <p
            className="mt-6 max-w-[520px] font-body text-base leading-[1.65] opacity-0 [animation:fadeIn_500ms_ease_forwards]"
            style={{ color: "rgba(248,248,246,0.6)", animationDelay: "800ms" }}
          >
            Product Manager senior, je conçois des produits digitaux pour les
            entrepreneurs et PME congolaises.
          </p>

          <div
            className="mt-8 flex flex-col items-start gap-4 opacity-0 [animation:fadeIn_500ms_ease_forwards]"
            style={{ animationDelay: "1000ms" }}
          >
            <Button
              variant="whatsapp"
              size="lg"
              href="https://wa.me/33786034629"
            >
              Démarrons sur WhatsApp
            </Button>

            <a
              href="#realisations"
              className="font-body text-sm text-white/70 hover:text-white transition-colors duration-200"
            >
              Voir mes réalisations{" "}
              <span className="inline-block [animation:bounce-y_4s_ease-in-out_infinite]">
                ↓
              </span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto md:mx-0">
          <div
            className="relative h-72 w-72 md:h-80 md:w-80 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "rgba(77,166,255,0.1)",
              border: "1px solid rgba(77,166,255,0.2)",
            }}
          >
            {/* TODO: remplacer par next/image */}
            {/* src="/medhi.jpg" */}
            <span className="font-display font-extrabold text-sky-blue text-[64px]">
              MG
            </span>
          </div>

          <div
            className="absolute -bottom-4 -left-4 rounded-md px-4 py-2 font-body text-sm text-white [animation:float_3s_ease-in-out_infinite]"
            style={{
              backgroundColor: "#0A1172",
              border: "1px solid #4DA6FF",
            }}
          >
            6+ ans · Product Manager
          </div>

          <div
            className="absolute -top-4 -right-2 rounded-md px-3 py-1.5 font-body text-sm text-sky-blue"
            style={{ backgroundColor: "rgba(77,166,255,0.15)" }}
          >
            Paris ↔ Kinshasa
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div
          className="h-10 w-px [animation:scroll-pulse_2s_ease-in-out_infinite]"
          style={{ backgroundColor: "#4DA6FF" }}
        />
      </div>
    </section>
  );
}
