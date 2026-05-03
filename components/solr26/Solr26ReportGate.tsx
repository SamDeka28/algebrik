"use client";

import { useLayoutEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Lock } from "lucide-react";

const HUBSPOT_PORTAL_ID = "47671281";
const HUBSPOT_FORM_ID = "27fc1d39-ca1c-42a2-b35c-b9063f28d842";
const HUBSPOT_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
const HUBSPOT_EMBED_SCRIPT =
  "https://js-na2.hsforms.net/forms/embed/developer/47671281.js";

const STORAGE_KEY = "algebrik_solr26_report_gate_v1";

const TITLE_ID = "solr26-report-gate-title";

function splitFullName(fullName: string): { firstname: string; lastname: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstname = parts[0] ?? "";
  const lastname = parts.length > 1 ? parts.slice(1).join(" ") : "";
  return { firstname, lastname };
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required("Your full name is required")
    .test(
      "full-name-parts",
      "Enter your first and last name",
      (value) => {
        if (!value) return false;
        return splitFullName(value).lastname.length > 0;
      },
    ),
  email: Yup.string()
    .email("Invalid email address")
    .required("Work email is required"),
});

type Solr26ReportGateProps = {
  children: React.ReactNode;
};

export default function Solr26ReportGate({ children }: Solr26ReportGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useLayoutEffect(() => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1") {
        setUnlocked(true);
      }
    } catch {
      /* private mode */
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitError(null);
      const { firstname, lastname } = splitFullName(values.fullName);
      try {
        const res = await fetch(HUBSPOT_SUBMIT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: [
              { name: "0-1/firstname", value: firstname },
              { name: "0-1/lastname", value: lastname },
              { name: "0-1/email", value: values.email.trim() },
            ],
            context: {
              pageUri:
                typeof window !== "undefined" ? window.location.href : "",
              pageName: "SOLR26 — Complete report download",
            },
          }),
        });
        if (!res.ok) {
          setSubmitError("Something went wrong. Please try again.");
          return;
        }
        try {
          localStorage.setItem(STORAGE_KEY, "1");
        } catch {
          /* still unlock this session */
        }
        setUnlocked(true);
        formik.resetForm();
      } catch {
        setSubmitError("Something went wrong. Please try again.");
      }
    },
  });

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="relative isolate grid w-full min-h-[min(100dvh,880px)] grid-cols-1 grid-rows-1 bg-[#3a4150] [grid-template-areas:'gate']">
      {/* Blurred gated sections — height drives the stack; min-h-full fills when min-height exceeds content */}
      <div
        className="[grid-area:gate] col-start-1 row-start-1 flex min-h-full w-full flex-col select-none blur-md sm:blur-lg [transition:filter_0.2s_ease]"
        aria-hidden
      >
        {children}
      </div>

      {/* Dark veil over blur (charcoal band like the mock) */}
      <div
        className="[grid-area:gate] pointer-events-none col-start-1 row-start-1 min-h-full w-full bg-slate-900/45"
        aria-hidden
      />

      {/* Modal: sticky 100dvh rail centers the card in the viewport while scrolling within this gate only */}
      <div className="[grid-area:gate] pointer-events-none col-start-1 row-start-1 flex min-h-full w-full justify-center px-4 py-6 sm:px-6 sm:py-8 md:px-8">
        <Script src={HUBSPOT_EMBED_SCRIPT} strategy="lazyOnload" />
        <div
          className="hs-form-html sr-only"
          data-region="na2"
          data-form-id={HUBSPOT_FORM_ID}
          data-portal-id={HUBSPOT_PORTAL_ID}
          aria-hidden
        />

        <div className="pointer-events-none sticky top-0 z-10 flex h-[100dvh] max-h-[100dvh] w-full max-w-[960px] flex-col items-center justify-center py-4 sm:py-6">
          <div
            className="pointer-events-auto w-full max-h-[calc(100dvh-2rem)] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby={TITLE_ID}
          >
          <div className="rounded-2xl border border-slate-200/90 bg-white shadow-[0_20px_60px_-12px_rgba(15,23,42,0.35)] sm:rounded-[22px]">
            <div className="grid grid-cols-1 overflow-hidden rounded-2xl sm:rounded-[22px] lg:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center px-8 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                <h2
                  id={TITLE_ID}
                  className="text-left text-2xl font-bold leading-tight text-[#0c2340] sm:text-[1.75rem] md:text-3xl"
                >
                  Unlock the Complete 2026 Report
                </h2>
                <p className="mt-3 text-left text-sm leading-relaxed text-[#606060] sm:text-base">
                  22 pages of NCUA data analysis + SOLR survey insights + 2026
                  action plan. Free for credit union leaders.
                </p>

                <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200/90 bg-[#eef4fb] px-4 py-3 text-left text-sm leading-snug text-[#4b5563]">
                  <Lock
                    className="mt-0.5 h-5 w-5 shrink-0 text-amber-500"
                    aria-hidden
                  />
                  <span>
                    Findings 4 &amp; 5 + full 2026 Action Plan are in the
                    complete report.
                  </span>
                </div>

                <form
                  onSubmit={formik.handleSubmit}
                  className="mt-8 flex flex-col gap-4"
                  noValidate
                >
                  <div>
                    <label htmlFor="solr26-gate-fullname" className="sr-only">
                      Your full name
                    </label>
                    <input
                      id="solr26-gate-fullname"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-slate-200 bg-[#f4f6f9] px-4 py-3.5 text-[#292929] outline-none transition-colors placeholder:text-slate-400 focus:border-[#2A5FAC] focus:bg-white"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.fullName}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label htmlFor="solr26-gate-email" className="sr-only">
                      Work email address
                    </label>
                    <input
                      id="solr26-gate-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Work email address"
                      className="w-full rounded-lg border border-slate-200 bg-[#f4f6f9] px-4 py-3.5 text-[#292929] outline-none transition-colors placeholder:text-slate-400 focus:border-[#2A5FAC] focus:bg-white"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <p className="mt-1 text-sm text-red-600">
                        {formik.errors.email}
                      </p>
                    ) : null}
                  </div>

                  {submitError ? (
                    <p className="text-center text-sm text-red-600">
                      {submitError}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="mt-2 w-full rounded-xl bg-[#2A5FAC] py-3.5 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#234f8c] disabled:opacity-60"
                  >
                    {formik.isSubmitting
                      ? "Submitting…"
                      : "Download Full Report: Free"}
                  </button>
                </form>
              </div>

              <div className="relative min-h-[260px] bg-[#0c2340] sm:min-h-[300px] lg:min-h-[440px]">
                <Image
                  src="/assets/ucr.png"
                  alt="State of AI in Lending Report — Credit Union Edition (2026)"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 480px"
                  priority
                />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
