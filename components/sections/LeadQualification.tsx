"use client";

import { ArrowLeft, ArrowRight, Check, LoaderCircle, MessageCircle } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ProjectIntent, useProjectIntent } from "@/components/providers/ProjectIntentProvider";
import { whatsappHref } from "@/lib/contact";
import { trackEvent } from "@/lib/tracking";

const projectTypes = ["Créer un site", "Refaire un site", "Vendre en ligne", "Créer une plateforme", "Je ne sais pas encore"];
const objectives = ["Présenter mon activité", "Générer des demandes", "Vendre", "Digitaliser un service"];
const budgets = ["Moins de 500 $", "500 $ à 900 $", "1 000 $ à 2 000 $", "Plus de 2 000 $", "J’ai besoin d’être conseillé"];
const nextStepLabels = ["Définir mon objectif", "Choisir mon budget", "Ajouter mes coordonnées"];
const fieldClassName =
  "min-h-12 rounded-lg border border-white/10 bg-white/[0.035] px-4 text-sm font-normal text-white outline-none transition-colors placeholder:text-white/24 focus:border-accent/70";

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
}: {
  name: string;
  values: string[];
  selected: string;
  onChange: (value: string) => void;
  describedBy?: string;
}) {
  return (
    <div role="radiogroup" aria-describedby={describedBy} className="grid gap-2 sm:grid-cols-2">
      {values.map((value) => (
        <label
          key={value}
          className={`relative flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-lg border px-4 py-3 text-sm font-semibold transition-colors duration-200 ${
            selected === value
              ? "border-accent/55 bg-accent/12 text-white"
              : "border-white/10 bg-white/[0.025] text-white/58 hover:border-white/20 hover:text-white/82"
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
          <span>{value}</span>
          <span
            aria-hidden="true"
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
              selected === value ? "border-accent bg-accent text-white" : "border-white/18"
            } peer-focus-visible:ring-2 peer-focus-visible:ring-[#9f96ff] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[#0d0d13]`}
          >
            {selected === value && <Check size={12} strokeWidth={3} />}
          </span>
        </label>
      ))}
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
    if (step === 1) return values.objective;
    if (step === 2) return values.budget;
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
    setStep((current) => Math.min(3, current + 1));
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
      trackEvent("lead_form_error", { step: 4, reason: "honeypot" });
      return;
    }

    if (!validateContactStep()) {
      setStatus("error");
      trackEvent("lead_form_error", { step: 4, reason: "invalid_contact_details" });
      window.requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });
      return;
    }

    const href = whatsappHref(buildWhatsappMessage(values, intent.offer));
    setFallbackHref(href);
    setStatus("submitting");
    setStepError("");

    trackEvent("lead_form_step_complete", { step: 4, value: "coordonnées" });
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
      trackEvent("lead_form_error", { step: 4, reason: "whatsapp_open_failed" });
    }
  }

  const questions = ["Quel est votre besoin ?", "Quel est votre objectif principal ?", "Quel budget envisagez-vous ?", "Comment pouvons-nous vous recontacter ?"];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#08080c] py-24 md:py-28 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(124,108,255,0.11),transparent_32%)]" />
      <div className="page-shell relative grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
        <div className="lg:sticky lg:top-32">
          <p className="section-label">Lancer votre projet</p>
          <h2 className="mt-5 text-[2.4rem] font-semibold leading-[1.02] text-white md:text-[3.5rem]">
            Parlons de votre <span className="font-editorial font-normal italic text-gradient">projet.</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/58 md:text-lg">
            Répondez à quelques questions pour recevoir une première lecture de votre besoin.
          </p>
          <div className="mt-9 flex flex-wrap gap-2">
            {["4 étapes", "Premier échange gratuit", "WhatsApp prérempli"].map((item) => (
              <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/42">
                {item}
              </span>
            ))}
          </div>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="min-h-[560px] rounded-lg border border-white/12 bg-[#0d0d13] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.32)] md:min-h-[590px] md:p-8 lg:p-10"
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

          <div className="flex items-center justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase text-white/32">Étape {step + 1} sur 4</p>
              {intent.offer && <p className="mt-2 text-xs text-[#a9a1ff]">Formule envisagée : {intent.offer}</p>}
            </div>
            <span className="font-editorial text-3xl italic text-white/42">0{step + 1}</span>
          </div>

          <div
            role="progressbar"
            aria-label="Progression du formulaire"
            aria-valuemin={1}
            aria-valuemax={4}
            aria-valuenow={step + 1}
            className="mt-6 h-1 overflow-hidden rounded-full bg-white/8"
          >
            <div
              className="h-full origin-left bg-gradient-to-r from-accent to-accent-secondary transition-transform duration-500 ease-premium"
              style={{ transform: `scaleX(${(step + 1) / 4})` }}
            />
          </div>

          {status === "success" ? (
            <div className="flex min-h-[430px] flex-col items-start justify-center" role="status">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success/12 text-success">
                <Check size={24} strokeWidth={2} />
              </span>
              <h3 className="mt-7 text-3xl font-semibold text-white">Votre message est prêt.</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-white/56">
                WhatsApp a été ouvert avec toutes vos réponses. Vérifiez le message, puis envoyez-le pour démarrer l’échange.
              </p>
              <a href={fallbackHref} target="_blank" rel="noopener noreferrer" className="button-accent mt-8">
                Ouvrir WhatsApp
                <MessageCircle size={17} />
              </a>
            </div>
          ) : (
            <div className="mt-9 flex min-h-[420px] flex-col">
              <fieldset className={step === 0 ? "block" : "hidden"} aria-hidden={step !== 0}>
                <legend className="mb-7 text-2xl font-semibold text-white md:text-3xl">{questions[0]}</legend>
                <ChoiceGroup
                  name="projectType"
                  values={projectTypes}
                  selected={values.projectType}
                  onChange={(value) => updateValue("projectType", value)}
                  describedBy="lead-step-error"
                />
              </fieldset>

              <fieldset className={step === 1 ? "block" : "hidden"} aria-hidden={step !== 1}>
                <legend className="mb-7 text-2xl font-semibold text-white md:text-3xl">{questions[1]}</legend>
                <ChoiceGroup
                  name="objective"
                  values={objectives}
                  selected={values.objective}
                  onChange={(value) => updateValue("objective", value)}
                  describedBy="lead-step-error"
                />
              </fieldset>

              <fieldset className={step === 2 ? "block" : "hidden"} aria-hidden={step !== 2}>
                <legend className="mb-7 text-2xl font-semibold text-white md:text-3xl">{questions[2]}</legend>
                <ChoiceGroup
                  name="budget"
                  values={budgets}
                  selected={values.budget}
                  onChange={(value) => updateValue("budget", value)}
                  describedBy="lead-step-error"
                />
              </fieldset>

              <fieldset className={step === 3 ? "block" : "hidden"} aria-hidden={step !== 3}>
                <legend className="mb-7 text-2xl font-semibold text-white md:text-3xl">{questions[3]}</legend>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold text-white/72">
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
                    {fieldErrors.name && <span id="name-error" className="text-xs font-medium text-red-300">{fieldErrors.name}</span>}
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-white/72">
                    Entreprise ou activité
                    <input
                      name="company"
                      value={values.company}
                      onChange={(event) => updateValue("company", event.target.value)}
                      autoComplete="organization"
                      className={fieldClassName}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-white/72 md:col-span-2">
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
                    {fieldErrors.contact && <span id="contact-error" className="text-xs font-medium text-red-300">{fieldErrors.contact}</span>}
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-white/72 md:col-span-2">
                    Message facultatif
                    <textarea
                      name="message"
                      value={values.message}
                      onChange={(event) => updateValue("message", event.target.value)}
                      placeholder="Contexte, délai ou contrainte particulière"
                      rows={3}
                      className="resize-none rounded-lg border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-normal leading-6 text-white outline-none transition-colors placeholder:text-white/24 focus:border-accent/70"
                    />
                  </label>
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-white/52 md:col-span-2">
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
                  {fieldErrors.consent && <span id="consent-error" className="text-xs font-medium text-red-300 md:col-span-2">{fieldErrors.consent}</span>}
                </div>
              </fieldset>

              {(stepError || status === "error") && (
                <p ref={stepErrorRef} id="lead-step-error" role="alert" tabIndex={-1} className="mt-5 rounded-lg border border-red-300/20 bg-red-300/8 p-3 text-sm text-red-200 outline-none focus-visible:ring-2 focus-visible:ring-red-200/70">
                  {stepError || "Vérifiez les champs indiqués avant de continuer."}
                </p>
              )}

              <div className="mt-auto flex flex-col-reverse gap-3 pt-8 sm:flex-row sm:justify-between">
                {step > 0 ? (
                  <button type="button" onClick={previousStep} className="button-secondary px-5">
                    <ArrowLeft className="button-arrow" size={16} />
                    Précédent
                  </button>
                ) : (
                  <span />
                )}

                {step < 3 ? (
                  <button type="button" onClick={nextStep} className="button-primary px-6">
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
