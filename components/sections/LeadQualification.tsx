"use client";

import { ArrowLeft, ArrowRight, Check, Compass, LayoutTemplate, LoaderCircle, MessageCircle, RefreshCw, Sparkles, WalletCards } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ProjectIntent, useProjectIntent } from "@/components/providers/ProjectIntentProvider";
import { whatsappHref } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";

const projectTypes = ["Cadrer mon idée", "Créer mon site", "Refondre mon site", "Besoin spécifique"];
const projectObjectives: Record<string, string> = {
  "Cadrer mon idée": "Clarifier et prioriser mon projet",
  "Créer mon site": "Lancer un site complet",
  "Refondre mon site": "Moderniser un site existant",
  "Besoin spécifique": "Fonctionnalités avancées",
};
const budgets = ["Moins de 500 $", "500 $ à 900 $", "1 000 $ à 2 000 $", "Plus de 2 000 $"];
const nextStepLabels = ["Choisir mon budget", "Ajouter mes coordonnées"];
const fieldClassName =
  "min-h-12 rounded-lg border border-black/10 bg-black/[0.025] px-4 text-sm font-normal text-black/78 outline-none transition-colors placeholder:text-black/28 focus:border-accent/70";

type FormValues = {
  projectType: string;
  objective: string;
  budget: string;
  name: string;
  company: string;
  contact: string;
  message: string;
  consent: boolean;
  website: string;
};

const initialValues: FormValues = {
  projectType: "",
  objective: "",
  budget: "",
  name: "",
  company: "",
  contact: "",
  message: "",
  consent: false,
  website: "",
};

type FieldErrors = Partial<Record<"name" | "contact" | "consent", string>>;

function ChoiceGroup({
  name,
  values,
  selected,
  onChange,
  describedBy,
  icons,
}: {
  name: string;
  values: string[];
  selected: string;
  onChange: (value: string) => void;
  describedBy?: string;
  icons?: Array<typeof Compass>;
}) {
  return (
    <div role="radiogroup" aria-describedby={describedBy} className="grid grid-cols-2 gap-2">
      {values.map((value, index) => {
        const Icon = icons?.[index];
        return (
        <label
          key={value}
          className={`relative flex min-h-28 cursor-pointer flex-col items-start justify-between gap-4 rounded-lg border p-4 text-sm font-semibold transition-colors duration-200 md:min-h-32 ${
            selected === value
              ? "border-accent/55 bg-accent/10 text-black/88"
              : "border-black/10 bg-black/[0.02] text-black/58 hover:border-black/20 hover:text-black/82"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={value}
            checked={selected === value}
            onChange={() => onChange(value)}
            className="peer sr-only"
          />
          {Icon && <Icon size={22} strokeWidth={1.7} className={selected === value ? "text-accent" : "text-black/38"} aria-hidden="true" />}
          <span className="pr-7 leading-5">{value}</span>
          <span
            aria-hidden="true"
            className={`absolute right-3 top-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
              selected === value ? "border-accent bg-accent text-white" : "border-black/18"
            } peer-focus-visible:ring-2 peer-focus-visible:ring-[#6d5cff] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-white`}
          >
            {selected === value && <Check size={12} strokeWidth={3} />}
          </span>
        </label>
        );
      })}
    </div>
  );
}

function buildWhatsappMessage(values: FormValues, offer: string) {
  return [
    "Bonjour Medhi,",
    "",
    "Je souhaite parler d’un projet avec MG Digital.",
    "",
    offer ? `Formule envisagée : ${offer}` : "",
    `Type de projet : ${values.projectType}`,
    `Objectif : ${values.objective}`,
    `Budget : ${values.budget}`,
    `Nom : ${values.name}`,
    `Entreprise : ${values.company || "Non précisée"}`,
    `Contact : ${values.contact}`,
    `Message : ${values.message || "Non précisé"}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function LeadQualificationForm({ intent }: { intent: ProjectIntent }) {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<FormValues>(() => ({
    ...initialValues,
    projectType: intent.projectType,
    objective: intent.objective,
    budget: intent.budget,
  }));
  const [stepError, setStepError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fallbackHref, setFallbackHref] = useState(whatsappHref());
  const startedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const stepErrorRef = useRef<HTMLParagraphElement>(null);
  const successTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    },
    []
  );

  function markStarted(source: string) {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("lead_form_start", { source });
  }

  function updateValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    markStarted(`step_${step + 1}`);
    setValues((current) => ({ ...current, [key]: value }));
    setStepError("");
    setFieldErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "error") setStatus("idle");
  }

  function currentSelection() {
    if (step === 0) return values.projectType;
    if (step === 1) return values.budget;
    return "coordonnées";
  }

  function nextStep() {
    markStarted(`step_${step + 1}`);
    const selection = currentSelection();
    if (!selection) {
      const message = "Sélectionnez une réponse pour continuer.";
      setStepError(message);
      trackEvent("lead_form_error", { step: step + 1, reason: "missing_selection" });
      window.requestAnimationFrame(() => stepErrorRef.current?.focus());
      return;
    }

    trackEvent("lead_form_step_complete", { step: step + 1, value: selection });
    setStepError("");
    setStatus("idle");
    setStep((current) => Math.min(2, current + 1));
  }

  function previousStep() {
    setStepError("");
    setStatus("idle");
    setStep((current) => Math.max(0, current - 1));
  }

  function validateContactStep() {
    const errors: FieldErrors = {};
    if (!values.name.trim()) errors.name = "Indiquez votre nom.";
    if (!values.contact.trim()) errors.contact = "Indiquez un numéro WhatsApp ou une adresse email.";
    if (!values.consent) errors.consent = "Votre accord est nécessaire pour répondre à la demande.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    markStarted("submit");

    if (values.website) {
      setStatus("error");
      setStepError("Votre demande n’a pas pu être préparée. Réessayez dans quelques instants.");
      trackEvent("lead_form_error", { step: 3, reason: "honeypot" });
      return;
    }

    if (!validateContactStep()) {
      setStatus("error");
      trackEvent("lead_form_error", { step: 3, reason: "invalid_contact_details" });
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    const href = whatsappHref(buildWhatsappMessage(values, intent.offer));
    setFallbackHref(href);
    setStatus("submitting");
    setStepError("");

    trackEvent("lead_form_step_complete", { step: 3, value: "coordonnées" });
    trackEvent("lead_form_submit", {
      projectType: values.projectType,
      objective: values.objective,
      budget: values.budget,
      offer: intent.offer || undefined,
    });

    try {
      window.open(href, "_blank", "noopener,noreferrer");
      successTimerRef.current = setTimeout(() => setStatus("success"), 420);
    } catch {
      setStatus("error");
      setStepError("WhatsApp n’a pas pu s’ouvrir automatiquement. Utilisez le lien direct ci-dessous.");
      trackEvent("lead_form_error", { step: 3, reason: "whatsapp_open_failed" });
    }
  }

  const questions = ["Quel est votre besoin ?", "Quel budget envisagez-vous ?", "Comment pouvons-nous vous recontacter ?"];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-black/8 bg-white pb-12 pt-8 text-[#101014] md:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(124,108,255,0.08),transparent_32%)]" />
      <div className="page-shell relative grid lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-12">
        <div className="hidden lg:sticky lg:top-32 lg:block">
          <p className="text-[0.72rem] font-bold uppercase leading-none text-black/42">Votre projet</p>
          <h2 className="mt-5 text-[2.4rem] font-semibold leading-[1.02] text-black/88 md:text-[3.5rem]">
            Parlons de votre <span className="font-editorial font-normal italic text-black/46">projet.</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-black/54">Quelques réponses suffisent pour cadrer votre besoin.</p>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="min-h-[520px] rounded-lg border border-black/10 bg-white p-4 shadow-[0_30px_100px_rgba(0,0,0,0.1)] sm:p-5 md:min-h-[560px] md:p-7 lg:min-h-[590px] lg:p-10"
          noValidate
        >
          <input
            type="text"
            name="website"
            value={values.website}
            onChange={(event) => updateValue("website", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px]"
          />

          <div className="border-b border-black/10 pb-5 lg:hidden">
            <p className="text-[10px] font-bold uppercase text-black/38">Votre projet</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold leading-[1.02] text-black/88">
              Parlons de votre <span className="font-editorial font-normal italic text-black/46">projet.</span>
            </h2>
          </div>

          <div className="mt-5 flex items-center justify-between gap-5 lg:mt-0">
            <div>
              <p className="text-xs font-semibold uppercase text-black/32">Étape {step + 1} sur 3</p>
              {intent.offer && <p className="mt-2 text-xs text-[#a9a1ff]">Formule envisagée : {intent.offer}</p>}
            </div>
            <span className="font-editorial text-3xl italic text-black/34">0{step + 1}</span>
          </div>

          <div
            role="progressbar"
            aria-label="Progression du formulaire"
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={step + 1}
            className="mt-4 h-1 overflow-hidden rounded-full bg-black/8 lg:mt-6"
          >
            <div
              className="h-full origin-left bg-gradient-to-r from-accent to-accent-secondary transition-transform duration-500 ease-premium"
              style={{ transform: `scaleX(${(step + 1) / 3})` }}
            />
          </div>

          {status === "success" ? (
            <div className="flex min-h-[430px] flex-col items-start justify-center" role="status">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/12 text-success">
                <Check size={24} strokeWidth={2} />
              </span>
              <h3 className="mt-7 text-3xl font-semibold text-black/88">Votre message est prêt.</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-black/54">
                WhatsApp a été ouvert avec toutes vos réponses. Vérifiez le message, puis envoyez-le pour démarrer l’échange.
              </p>
              <a href={fallbackHref} target="_blank" rel="noopener noreferrer" className="button-accent mt-8">
                Ouvrir WhatsApp
                <MessageCircle size={17} />
              </a>
            </div>
          ) : (
            <div className="mt-6 flex min-h-[380px] flex-col md:mt-8 md:min-h-[420px]">
              <fieldset className={step === 0 ? "block" : "hidden"} aria-hidden={step !== 0}>
                <legend className="mb-5 text-xl font-semibold text-black/88 md:mb-7 md:text-3xl">{questions[0]}</legend>
                <ChoiceGroup
                  name="projectType"
                  values={projectTypes}
                  selected={values.projectType}
                  onChange={(value) => {
                    updateValue("projectType", value);
                    updateValue("objective", projectObjectives[value]);
                  }}
                  describedBy="lead-step-error"
                  icons={[Compass, LayoutTemplate, RefreshCw, Sparkles]}
                />
              </fieldset>

              <fieldset className={step === 1 ? "block" : "hidden"} aria-hidden={step !== 1}>
                <legend className="mb-5 text-xl font-semibold text-black/88 md:mb-7 md:text-3xl">{questions[1]}</legend>
                <ChoiceGroup
                  name="budget"
                  values={budgets}
                  selected={values.budget}
                  onChange={(value) => updateValue("budget", value)}
                  describedBy="lead-step-error"
                  icons={[WalletCards, WalletCards, WalletCards, WalletCards]}
                />
              </fieldset>

              <fieldset className={step === 2 ? "block" : "hidden"} aria-hidden={step !== 2}>
                <legend className="mb-5 text-xl font-semibold text-black/88 md:mb-7 md:text-3xl">{questions[2]}</legend>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-black/68">
                    Nom
                    <input
                      name="name"
                      value={values.name}
                      onChange={(event) => updateValue("name", event.target.value)}
                      autoComplete="name"
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                      className={fieldClassName}
                    />
                    {fieldErrors.name && <span id="name-error" className="text-xs font-medium text-red-600">{fieldErrors.name}</span>}
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-black/68">
                    Entreprise ou activité
                    <input
                      name="company"
                      value={values.company}
                      onChange={(event) => updateValue("company", event.target.value)}
                      autoComplete="organization"
                      className={fieldClassName}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-black/68 md:col-span-2">
                    WhatsApp ou email
                    <input
                      name="contact"
                      value={values.contact}
                      onChange={(event) => updateValue("contact", event.target.value)}
                      autoComplete="email"
                      placeholder="+33… ou nom@email.com"
                      aria-invalid={Boolean(fieldErrors.contact)}
                      aria-describedby={fieldErrors.contact ? "contact-error" : undefined}
                      className={fieldClassName}
                    />
                    {fieldErrors.contact && <span id="contact-error" className="text-xs font-medium text-red-600">{fieldErrors.contact}</span>}
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-black/68 md:col-span-2">
                    Message facultatif
                    <textarea
                      name="message"
                      value={values.message}
                      onChange={(event) => updateValue("message", event.target.value)}
                      placeholder="Contexte, délai ou contrainte particulière"
                      rows={3}
                      className="resize-none rounded-lg border border-black/10 bg-black/[0.025] px-4 py-3 text-sm font-normal leading-6 text-black/78 outline-none transition-colors placeholder:text-black/28 focus:border-accent/70"
                    />
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-black/52 md:col-span-2">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={values.consent}
                      onChange={(event) => updateValue("consent", event.target.checked)}
                      aria-invalid={Boolean(fieldErrors.consent)}
                      aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
                      className="mt-0.5 h-5 w-5 shrink-0 accent-[#7c6cff]"
                    />
                    <span>J’accepte que mes informations soient utilisées pour répondre à ma demande.</span>
                  </label>
                  {fieldErrors.consent && <span id="consent-error" className="text-xs font-medium text-red-600 md:col-span-2">{fieldErrors.consent}</span>}
                </div>
              </fieldset>

              {(stepError || status === "error") && (
                <p ref={stepErrorRef} id="lead-step-error" role="alert" tabIndex={-1} className="mt-5 rounded-lg border border-red-500/20 bg-red-50 p-3 text-sm text-red-700 outline-none focus-visible:ring-2 focus-visible:ring-red-400/50">
                  {stepError || "Vérifiez les champs indiqués avant de continuer."}
                </p>
              )}

              <div className="mt-auto flex flex-col-reverse gap-3 pt-6 sm:flex-row sm:justify-between md:pt-8">
                {step > 0 ? (
                  <button type="button" onClick={previousStep} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-black/14 px-5 text-sm font-semibold text-black/68 transition-colors hover:border-black/30 hover:bg-black/[0.035] sm:w-auto">
                    <ArrowLeft className="button-arrow" size={16} />
                    Précédent
                  </button>
                ) : (
                  <span />
                )}

                {step < 2 ? (
                  <button type="button" onClick={nextStep} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#101014] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#28282f] sm:w-auto">
                    {nextStepLabels[step]}
                    <ArrowRight className="button-arrow" size={16} />
                  </button>
                ) : (
                  <button type="submit" disabled={status === "submitting"} className="button-accent disabled:cursor-not-allowed disabled:opacity-55">
                    {status === "submitting" ? (
                      <>
                        <LoaderCircle className="animate-spin" size={17} />
                        Préparation…
                      </>
                    ) : (
                      <>
                        Préparer mon message WhatsApp
                        <ArrowRight className="button-arrow" size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

export default function LeadQualification() {
  const { intent } = useProjectIntent();
  const formKey = [intent.offer, intent.projectType, intent.objective, intent.budget].join("|");

  return <LeadQualificationForm key={formKey} intent={intent} />;
}
