"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";

import {
  createLeadSchema,
  BUDGET_LABELS,
  BUDGET_RANGES,
  PROJECT_TYPES,
  type LeadInput,
} from "@/server/validators/lead";
import { submitLead } from "@/server/actions/submit-lead";
import { readAttribution } from "@/lib/analytics/utm";
import { EVENTS, track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { ArrowUpRight, Check } from "@/components/ui/icons";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type Status = "idle" | "submitting" | "success" | "error";

export function LeadForm({
  locale,
  dict,
  className,
}: {
  locale: Locale;
  dict: Dictionary;
  className?: string;
}) {
  const params = useSearchParams();
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const startedRef = useRef(false);
  const reduced = useReducedMotionSafe();

  /* Validation messages come from the dictionary, so errors are translated. */
  const schema = useMemo(() => createLeadSchema(dict.form.errors), [dict]);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      projectType: (params.get("type") as LeadInput["projectType"]) ?? "website",
      budget: undefined,
      message: "",
      website: "",
      locale,
    },
  });

  /* Attribution is captured on mount, not typed by the visitor. */
  useEffect(() => {
    const attribution = readAttribution(params.get("source") ?? undefined);
    setValue("source", attribution.source);
    setValue("pageUrl", attribution.pageUrl);
    setValue("utmSource", attribution.utmSource);
    setValue("utmMedium", attribution.utmMedium);
    setValue("utmCampaign", attribution.utmCampaign);

    // A builder or estimator hand-off pre-fills the brief so nothing is retyped.
    const modules = params.get("modules");
    const brief = params.get("brief");
    if (brief) setValue("message", brief);
    else if (modules) setValue("message", `${modules.split(",").join(", ")}\n\n`);
  }, [params, setValue]);

  const onFirstInteraction = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track(EVENTS.contactFormStart);
  };

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");
    setServerMessage("");
    const result = await submitLead({ ...values, locale });

    if (result.ok) {
      setStatus("success");
      setServerMessage(result.message);
      track(EVENTS.contactFormSubmit, { projectType: values.projectType, budget: values.budget });
      reset();
      return;
    }

    setStatus("error");
    setServerMessage(result.message);
    for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
      setError(field as keyof LeadInput, { type: "server", message });
    }
  });

  if (status === "success") {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("border border-accent/40 bg-accent/5 p-8 md:p-10", className)}
        role="status"
      >
        <span className="flex size-10 items-center justify-center rounded-full bg-accent text-accent-fg">
          <Check />
        </span>
        <h3 className="font-display mt-6 text-2xl">{dict.form.successTitle}</h3>
        <p className="mt-3 max-w-md text-lg text-muted">{serverMessage}</p>
        <p className="mt-6 text-base text-muted">
          {dict.form.successUrgent}{" "}
          <a href={`mailto:${site.email}`} className="link-underline text-fg">
            {site.email}
          </a>
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mono-sm mt-8 text-faint underline-offset-4 hover:text-fg hover:underline"
        >
          {dict.cta.sendAnother}
        </button>
      </motion.div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onChange={onFirstInteraction}
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${uid}-name`} label={dict.form.name} error={errors.name?.message} required>
          <input
            id={`${uid}-name`}
            autoComplete="name"
            aria-invalid={!!errors.name}
            className={inputClass(!!errors.name)}
            {...register("name")}
          />
        </Field>

        <Field id={`${uid}-email`} label={dict.form.email} error={errors.email?.message} required>
          <input
            id={`${uid}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            className={inputClass(!!errors.email)}
            {...register("email")}
          />
        </Field>

        <Field
          id={`${uid}-company`}
          label={dict.form.company}
          error={errors.company?.message}
          hint={dict.form.optional}
        >
          <input
            id={`${uid}-company`}
            autoComplete="organization"
            className={inputClass(!!errors.company)}
            {...register("company")}
          />
        </Field>

        <Field
          id={`${uid}-budget`}
          label={dict.form.budget}
          error={errors.budget?.message}
          hint={dict.form.optional}
        >
          <select id={`${uid}-budget`} className={inputClass(!!errors.budget)} {...register("budget")}>
            <option value="">{dict.form.budgetPlaceholder}</option>
            {BUDGET_RANGES.map((value) => (
              <option key={value} value={value}>
                {BUDGET_LABELS[value]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="mono-sm mb-3 text-faint">{dict.form.projectType}</legend>
        <div className="flex flex-wrap gap-2">
          {PROJECT_TYPES.map((type) => (
            <label key={type} className="group cursor-pointer" data-cursor="explore">
              <input type="radio" value={type} className="peer sr-only" {...register("projectType")} />
              <span className="inline-flex border border-line px-4 py-2 text-base text-muted transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-fg peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent group-hover:border-fg group-hover:text-fg">
                {dict.projectTypes[type]}
              </span>
            </label>
          ))}
        </div>
        {errors.projectType ? (
          <p role="alert" className="mono-sm mt-2 text-accent">
            {errors.projectType.message}
          </p>
        ) : null}
      </fieldset>

      <Field
        id={`${uid}-message`}
        label={dict.form.message}
        error={errors.message?.message}
        required
        hint={dict.form.messageHint}
      >
        <textarea
          id={`${uid}-message`}
          rows={6}
          aria-invalid={!!errors.message}
          className={cn(inputClass(!!errors.message), "resize-y")}
          {...register("message")}
        />
      </Field>

      {/* Honeypot — visually and semantically hidden, never focusable. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${uid}-website`}>website</label>
        <input id={`${uid}-website`} tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <AnimatePresence>
        {status === "error" && serverMessage ? (
          <motion.p
            role="alert"
            initial={reduced ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="border border-accent/40 bg-accent/5 px-4 py-3 text-base text-fg"
          >
            {serverMessage}
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "submitting"}
          data-cursor="explore"
          className="group inline-flex h-14 items-center gap-3 bg-accent px-8 font-medium text-accent-fg transition-[filter] hover:brightness-110 disabled:opacity-60"
        >
          {status === "submitting" ? dict.form.sending : dict.cta.send}
          <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
        <p className="mono-sm max-w-xs text-faint">{dict.form.note}</p>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full border bg-transparent px-4 py-3 text-base text-fg outline-none transition-colors placeholder:text-faint",
    hasError ? "border-accent" : "border-line focus:border-fg",
  );
}

function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="mono-sm flex items-baseline justify-between gap-3 text-faint">
        <span>
          {label}
          {required ? <span className="text-accent"> *</span> : null}
        </span>
        {hint ? <span className="normal-case tracking-normal text-faint/70">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mono-sm text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}
