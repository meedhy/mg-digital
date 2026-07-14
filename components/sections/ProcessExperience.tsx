"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, CheckCircle2, Code2, Lightbulb, Palette, PenTool, Rocket, ScanSearch } from "lucide-react";
import { ComponentType, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/tracking";

type Step = {
  number: string;
  title: string;
  text: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
};

const steps: Step[] = [
  { number: "01", title: "Comprendre", text: "Nous clarifions votre activité, vos clients et le résultat attendu.", icon: Lightbulb },
  { number: "02", title: "Cadrer", text: "Nous alignons le périmètre, le budget, les contenus et le calendrier.", icon: PenTool },
  { number: "03", title: "Concevoir", text: "Nous validons les parcours, les messages clés et l’identité visuelle.", icon: Palette },
  { number: "04", title: "Construire", text: "Nous développons un site rapide, maintenable et adapté à vos usages.", icon: Code2 },
  { number: "05", title: "Tester", text: "Nous vérifions le mobile, les formulaires, la performance et le SEO.", icon: ScanSearch },
  { number: "06", title: "Lancer", text: "Nous préparons la mise en ligne, vérifions chaque détail et vous rendons autonome.", icon: Rocket },
];

const launchStages = [
  "Informations vérifiées",
  "Design finalisé",
  "Mobile optimisé",
  "Mise en ligne préparée",
  "Site prêt",
];

function ProcessVisual({ active }: { active: number }) {
  const [launchPhase, setLaunchPhase] = useState(-1);
  const isLaunching = active === steps.length - 1;
  const launchComplete = isLaunching && launchPhase === launchStages.length - 1;
  const launchProgress = launchPhase >= 0 ? ((launchPhase + 1) / launchStages.length) * 100 : 0;

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = window.requestAnimationFrame(() => {
      setLaunchPhase(isLaunching ? (prefersReducedMotion ? launchStages.length - 1 : 0) : -1);
    });
    const timers: number[] = [];

    if (isLaunching && !prefersReducedMotion) {
      launchStages.slice(1).forEach((_, index) => {
        timers.push(window.setTimeout(() => setLaunchPhase(index + 1), (index + 1) * 560));
      });
    }

    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [isLaunching]);

  return (
    <div className="relative mx-auto aspect-[1.12/1] w-full max-w-[560px]">
      <span className="sr-only" aria-live="polite">
        {isLaunching && launchPhase >= 0 ? `${launchStages[launchPhase]}, ${launchProgress}%` : ""}
      </span>

      <div aria-hidden="true" className="interface-grid absolute inset-0 opacity-35" />
      <div
        aria-hidden="true"
        className={`absolute inset-[10%] rounded-lg border bg-[#0b0b10]/92 shadow-[0_32px_110px_rgba(0,0,0,0.52)] transition-all duration-700 ease-premium ${
          launchComplete
            ? "scale-100 border-success/40 shadow-[0_32px_120px_rgba(41,196,125,0.16)] opacity-100"
            : active >= 1
              ? "scale-100 border-white/14 opacity-100"
              : "scale-[0.72] border-accent/30 opacity-35"
        }`}
      >
        <div
          className={`flex h-10 items-center gap-2 border-b px-4 transition-colors duration-500 ${
            active >= 1 ? "border-white/10" : "border-transparent"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/12" />
          <span className="h-2 w-2 rounded-full bg-white/8" />
          <span
            className={`ml-auto h-4 rounded-full transition-all duration-700 ${
              active >= 3 ? "w-20 bg-white/10" : "w-8 bg-white/[0.035]"
            }`}
          />
        </div>

        <div className="grid h-[calc(100%-40px)] grid-cols-[26%_1fr]">
          <div className="border-r border-white/8 p-4">
            <div
              className={`h-8 w-8 rounded-md transition-all duration-700 ${
                launchPhase >= 1
                  ? "rotate-0 bg-success"
                  : active >= 2
                    ? "rotate-0 bg-gradient-to-br from-accent to-accent-secondary"
                    : "rotate-45 bg-white/8"
              }`}
            />
            <div className="mt-8 grid gap-3">
              {["w-4/5", "w-3/5", "w-2/3", "w-1/2"].map((width, index) => (
                <span
                  key={width}
                  className={`h-1.5 rounded-full transition-all duration-500 ${width} ${
                    active >= 1 ? "translate-x-0 bg-white/12 opacity-100" : "translate-x-4 bg-white/5 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 55}ms` }}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden p-5 md:p-7">
            <div
              className={`h-2 rounded-full transition-all duration-700 ${
                launchPhase >= 1 ? "w-20 bg-success" : active >= 2 ? "w-20 bg-accent" : "w-12 bg-white/8"
              }`}
            />
            <div
              className={`mt-5 h-8 rounded-md transition-all duration-700 md:h-10 ${
                active >= 3 ? "w-4/5 bg-white/88" : active >= 1 ? "w-3/4 border border-white/12" : "w-1/3 bg-white/[0.025]"
              }`}
            />
            <div
              className={`mt-3 h-8 rounded-md transition-all duration-700 md:h-10 ${
                active >= 3 ? "w-3/5 bg-white/34" : active >= 1 ? "w-1/2 border border-white/8" : "w-1/4 bg-white/[0.02]"
              }`}
            />
            <div className="mt-5 grid gap-2">
              {["w-5/6", "w-2/3"].map((width) => (
                <span
                  key={width}
                  className={`h-1.5 rounded-full transition-all duration-700 ${width} ${
                    active >= 3 ? "bg-white/12" : "bg-white/[0.025]"
                  }`}
                />
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[0, 1].map((item) => (
                <div
                  key={item}
                  className={`h-20 rounded-md border transition-all duration-700 ${
                    launchPhase >= 2
                      ? "translate-y-0 border-success/22 bg-success/[0.055] opacity-100"
                      : active >= 3
                        ? "translate-y-0 border-white/9 bg-white/[0.035] opacity-100"
                        : "translate-y-6 border-white/5 opacity-25"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`absolute left-[2%] top-[8%] flex h-24 w-24 items-center justify-center rounded-full border transition-all duration-700 ${
          active === 0
            ? "scale-100 border-accent/50 bg-accent/12 opacity-100"
            : "scale-75 border-white/8 bg-transparent opacity-20"
        }`}
      >
        <span className="h-3 w-3 rounded-full bg-[#9f96ff] shadow-[0_0_34px_rgba(124,108,255,0.75)]" />
      </div>

      <div
        aria-hidden="true"
        className={`absolute bottom-[6%] right-[2%] flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-700 ${
          active >= 4 && !isLaunching
            ? "translate-y-0 border-success/25 bg-success/10 text-success opacity-100"
            : "translate-y-4 border-white/8 bg-black/20 text-white/20 opacity-0"
        }`}
      >
        <ScanSearch size={14} />
        Qualité validée
      </div>

      <div
        aria-hidden="true"
        className={`absolute inset-x-[22%] bottom-[1%] h-px origin-center bg-gradient-to-r from-transparent via-success to-transparent transition-all duration-700 ${
          active >= 5 ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
        }`}
      />

      <div
        aria-hidden="true"
        className={`absolute inset-x-[5%] bottom-0 overflow-hidden rounded-lg border bg-[#101816]/96 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.48)] backdrop-blur-xl transition-all duration-500 ${
          isLaunching ? "translate-y-0 border-success/28 opacity-100" : "pointer-events-none translate-y-6 border-white/8 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${launchComplete ? "bg-success text-[#07120d]" : "bg-success/12 text-success"}`}>
              {launchComplete ? <CheckCircle2 size={18} /> : <Rocket size={17} />}
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase text-success/72">Mise en ligne</p>
              <p className="mt-0.5 text-sm font-semibold text-white">
                {launchPhase >= 0 ? launchStages[launchPhase] : "Préparation"}
              </p>
            </div>
          </div>
          <span className="text-sm font-semibold tabular-nums text-success">{Math.round(launchProgress)}%</span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full origin-left rounded-full bg-success transition-transform duration-500 ease-premium"
            style={{ transform: `scaleX(${launchProgress / 100})` }}
          />
        </div>

        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {launchStages.map((stage, index) => (
            <span
              key={stage}
              className={`h-1 rounded-full transition-colors duration-300 ${index <= launchPhase ? "bg-success" : "bg-white/10"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProcessExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  function navigateToStep(index: number) {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollRange = Math.max(0, section.offsetHeight - window.innerHeight);
    const progress = Math.min(0.98, Math.max(0.02, index / (steps.length - 1)));

    trackEvent("process_step_navigation_click", {
      step: steps[index].number,
      title: steps[index].title,
    });
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    window.scrollTo({ top: sectionTop + scrollRange * progress, behavior });
  }

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => {
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${Math.max(0.02, progress)})`;
          }

          const next = Math.min(steps.length - 1, Math.floor(progress * steps.length));
          if (next !== activeRef.current) {
            activeRef.current = next;
            setActiveIndex(next);
          }
        },
      });

      return () => trigger.kill();
    });

    return () => media.revert();
  }, []);

  const activeStep = steps[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="methode"
      className="process-sequence relative border-t border-white/8 bg-[#08080c] py-24 lg:h-[270vh] lg:py-0"
    >
      <div className="process-motion-stage process-sticky sticky top-0 mx-auto h-screen w-full max-w-[1440px] grid-cols-[0.88fr_1.12fr] items-center gap-12 px-12 xl:px-20">
        <div className="max-w-[520px]">
          <p className="section-label">Notre méthode</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.02] text-white xl:text-5xl">
            De votre idée à un site prêt à <span className="font-editorial font-normal italic text-white/62">performer.</span>
          </h2>

          <nav
            aria-label="Étapes de la méthode"
            className="mt-8 overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]"
          >
            <ol className="grid grid-cols-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === activeIndex;

                return (
                  <li
                    key={step.number}
                    className={`${index % 2 === 0 ? "border-r" : ""} ${
                      index < steps.length - 2 ? "border-b" : ""
                    } border-white/10`}
                  >
                    <button
                      type="button"
                      onClick={() => navigateToStep(index)}
                      aria-current={isActive ? "step" : undefined}
                      aria-controls="process-step-detail"
                      className={`group flex min-h-[54px] w-full items-center gap-3 px-3 py-2.5 text-left transition-colors duration-200 ${
                        isActive
                          ? "bg-white/[0.085] text-white"
                          : "text-white/46 hover:bg-white/[0.045] hover:text-white/78"
                      }`}
                    >
                      <span className={`text-[10px] font-semibold ${isActive ? "text-[#a9a1ff]" : "text-white/24"}`}>
                        {step.number}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-semibold leading-4">{step.title}</span>
                      <Icon
                        size={14}
                        strokeWidth={1.7}
                        className={isActive ? "text-[#a9a1ff]" : "text-white/22 group-hover:text-white/52"}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div id="process-step-detail" className="mt-6 min-h-[104px]" aria-live="polite">
            <div className="flex items-baseline gap-4">
              <span className="font-editorial text-4xl italic text-[#9f96ff]">{activeStep.number}</span>
              <h3 className="text-2xl font-semibold text-white">{activeStep.title}</h3>
            </div>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/62">{activeStep.text}</p>
          </div>

          <div className="mt-5 flex items-center gap-4">
            <span className="text-xs text-white/32">{activeStep.number}</span>
            <div className="h-px flex-1 overflow-hidden bg-white/10">
              <div
                ref={progressRef}
                className="h-px origin-left scale-x-[0.02] bg-gradient-to-r from-accent via-[#8b8cff] to-accent-secondary"
              />
            </div>
            <span className="text-xs text-white/32">06</span>
          </div>
        </div>

        <ProcessVisual active={activeIndex} />
      </div>

      <div className="process-static page-shell gap-10">
        <div className="max-w-3xl">
          <p className="section-label">Notre méthode</p>
          <h2 className="section-heading mt-5">
            De votre idée à un site prêt à <span className="font-editorial font-normal italic text-white/62">performer.</span>
          </h2>
        </div>

        <ol className="relative grid gap-4 before:absolute before:bottom-8 before:left-6 before:top-8 before:w-px before:bg-white/10 md:grid-cols-2 md:before:hidden">
          {steps.map((step) => {
            const Icon = step.icon;
            const isLaunchStep = step.number === "06";
            return (
              <li
                key={step.number}
                className={`premium-card relative flex min-h-48 flex-col p-6 ${
                  isLaunchStep ? "border-success/24 bg-success/[0.035] md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-[#111118] ${isLaunchStep ? "border-success/28 text-success" : "border-white/12 text-[#9f96ff]"}`}>
                    <Icon size={19} strokeWidth={1.7} />
                  </span>
                  <span className="font-editorial text-2xl italic text-white/28">{step.number}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/56">{step.text}</p>

                {isLaunchStep && (
                  <div className="mt-6 border-t border-success/18 pt-5">
                    <div className="flex items-center justify-between gap-4 text-xs font-semibold">
                      <span className="text-white/72">Prêt pour la mise en ligne</span>
                      <span className="tabular-nums text-success">100%</span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
                      <div className="h-full w-full rounded-full bg-success" />
                    </div>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-5" aria-label="Vérifications avant mise en ligne">
                      {launchStages.map((stage) => (
                        <li key={stage} className="flex items-start gap-2 text-xs leading-5 text-white/58">
                          <Check size={14} className="mt-0.5 shrink-0 text-success" />
                          <span>{stage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
