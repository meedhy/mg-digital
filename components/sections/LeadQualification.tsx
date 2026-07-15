"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Compass, LayoutTemplate, LoaderCircle, MessageCircle, RefreshCw, Sparkles, WalletCards, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectIntent, useProjectIntent } from "@/components/providers/ProjectIntentProvider";
import { whatsappHref } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";

const projectTypes = ["J’ai une idée à clarifier", "Je veux créer mon site", "Je veux améliorer mon site", "J’ai un autre besoin"];
const projectObjectives: Record<string, string> = {
  "J’ai une idée à clarifier": "Clarifier et prioriser mon projet",
  "Je veux créer mon site": "Lancer un site complet",
  "Je veux améliorer mon site": "Moderniser un site existant",
  "J’ai un autre besoin": "Besoin spécifique",
};
const budgets = ["Moins de 500 $", "De 500 à 900 $", "De 1 000 à 2 000 $", "Plus de 2 000 $"];
const nextStepLabels = ["Choisir mon budget", "Ajouter mes coordonnées"];
const fieldClassName =
  "min-h-12 rounded-lg border border-black/10 bg-black/[0.025] px-4 text-base font-normal text-black/78 outline-none transition-colors placeholder:text-black/28 focus:border-accent/70";

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
  const [status, setStatus] = useState<"idle" | "preview" | "submitting" | "success" | "error">("idle");
  const [previewMessage, setPreviewMessage] = useState("");
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

    setPreviewMessage(buildWhatsappMessage(values, intent.offer));
    setStatus("preview");
    setStepError("");

    trackEvent("lead_form_step_complete", { step: 3, value: "coordonnées" });
    trackEvent("lead_form_step_complete", {
      step: 3,
      value: "aperçu du message",
      projectType: values.projectType,
      objective: values.objective,
      budget: values.budget,
      offer: intent.offer || undefined,
    });
  }

  function sendPreview() {
    if (!previewMessage.trim() || status === "submitting") return;
    const href = whatsappHref(previewMessage);
    setFallbackHref(href);
    setStatus("submitting");
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

  const questions = ["Où en est votre projet ?", "Quel budget envisagez-vous ?", "Comment puis-je vous répondre ?"];

  return (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full bg-white p-4 text-[#101014] sm:p-6 md:p-8 lg:p-10"
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

          <div className="border-b border-black/10 pb-5">
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
          ) : status === "preview" || status === "submitting" ? (
            <div className="flex min-h-[430px] flex-col pt-7 md:pt-9">
              <p className="text-xs font-bold uppercase text-black/36">Votre message</p>
              <h3 className="mt-3 text-2xl font-semibold text-black/88 md:text-3xl">Vérifiez avant l’envoi.</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-black/48">Vous pouvez modifier librement le message préparé.</p>
              <label className="mt-5 grid flex-1 gap-2 text-sm font-semibold text-black/68">
                Aperçu modifiable
                <textarea
                  value={previewMessage}
                  onChange={(event) => setPreviewMessage(event.target.value)}
                  rows={12}
                  className="min-h-64 resize-y rounded-lg border border-black/10 bg-black/[0.025] px-4 py-4 font-normal leading-6 text-black/76 outline-none transition-colors focus:border-accent/70"
                />
              </label>
              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-black/14 px-5 text-sm font-semibold text-black/68 transition-colors hover:border-black/30 hover:bg-black/[0.035] sm:w-auto"
                >
                  <ArrowLeft size={16} aria-hidden="true" />
                  Modifier mes réponses
                </button>
                <button
                  type="button"
                  onClick={sendPreview}
                  disabled={status === "submitting" || !previewMessage.trim()}
                  className="button-accent disabled:cursor-not-allowed disabled:opacity-55"
                >
                  {status === "submitting" ? <LoaderCircle className="animate-spin" size={17} /> : <MessageCircle size={17} />}
                  {status === "submitting" ? "Ouverture…" : "Envoyer mon projet"}
                </button>
              </div>
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
                    Votre prénom
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
                    Votre activité ou entreprise
                    <input
                      name="company"
                      value={values.company}
                      onChange={(event) => updateValue("company", event.target.value)}
                      autoComplete="organization"
                      className={fieldClassName}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-black/68 md:col-span-2">
                    Votre WhatsApp ou votre email
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
                    Quelques mots sur votre projet — facultatif
                    <textarea
                      name="message"
                      value={values.message}
                      onChange={(event) => updateValue("message", event.target.value)}
                      placeholder="Contexte, délai ou contrainte particulière"
                      rows={3}
                      className="resize-none rounded-lg border border-black/10 bg-black/[0.025] px-4 py-3 text-base font-normal leading-7 text-black/78 outline-none transition-colors placeholder:text-black/28 focus:border-accent/70"
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
                    <span>Vos informations seront uniquement utilisées pour répondre à votre demande.</span>
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
                  <button type="submit" className="button-accent">
                    Préparer mon projet
                    <ArrowRight className="button-arrow" size={16} />
                  </button>
                )}
              </div>
            </div>
          )}
        </form>
  );
}

export default function LeadQualification() {
  const { intent, isLeadFlowOpen, openLeadFlow, closeLeadFlow } = useProjectIntent();
  const formKey = [intent.offer, intent.projectType, intent.objective, intent.budget].join("|");

  useEffect(() => {
    if (!isLeadFlowOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLeadFlow();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeLeadFlow, isLeadFlowOpen]);

  const bottomSheet =
    isLeadFlowOpen && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-[100] flex items-end justify-center" role="dialog" aria-modal="true" aria-label="Parlons de votre projet">
            <button
              type="button"
              aria-label="Fermer le formulaire"
              onClick={closeLeadFlow}
              className="absolute inset-0 bg-black/62 backdrop-blur-sm"
            />
            <div className="panel-in relative z-10 max-h-[calc(100dvh-env(safe-area-inset-top)-0.75rem)] w-full max-w-4xl overflow-y-auto rounded-t-[24px] bg-white shadow-[0_-30px_100px_rgba(0,0,0,0.3)]">
              <div className="sticky top-0 z-20 flex justify-center bg-white/92 pb-1 pt-3 backdrop-blur-md">
                <span className="h-1 w-12 rounded-full bg-black/14" aria-hidden="true" />
                <button
                  type="button"
                  onClick={closeLeadFlow}
                  aria-label="Fermer"
                  className="absolute right-3 top-2 grid size-10 place-items-center rounded-full border border-black/10 bg-white text-black/58 transition-colors hover:bg-black/[0.04] hover:text-black"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
              <LeadQualificationForm key={formKey} intent={intent} />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <section id="contact" className="atmosphere noise relative overflow-hidden border-t border-white/10 bg-[#07070b] px-0 py-20 text-white md:py-28 lg:py-32">
        <div className="interface-grid pointer-events-none absolute inset-0 opacity-35" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(124,108,255,0.24),transparent_38%)]" />
        <div className="page-shell relative flex flex-col items-center text-center">
          <p className="text-[0.72rem] font-bold uppercase text-white/40">Votre projet</p>
          <h2 className="mt-5 max-w-3xl text-[2.2rem] font-semibold leading-[0.98] text-white md:text-6xl">
            Parlons de votre <span className="font-editorial font-normal italic text-white/55">projet.</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/52 md:text-base md:leading-7">
            Quelques réponses suffisent pour comprendre votre situation et vous recommander la bonne approche.
          </p>
          <button
            type="button"
            onClick={() => openLeadFlow({ offer: "", projectType: "", objective: "", budget: "" })}
            className="button-primary mt-8 min-w-[240px] md:mt-10"
          >
            Démarrer mon projet
            <ArrowUpRight className="button-arrow" size={17} />
          </button>
        </div>
      </section>
      {bottomSheet}
    </>
  );
}
