"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import blueLogo from "@/public/blue_logo.webp";

const HUBSPOT_PORTAL_ID = "47671281";
const HUBSPOT_FORM_ID = "9313c170-8c23-4d25-a165-53c22fa8e85e";
const HUBSPOT_SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

const storageKeyForSlug = (slug: string) => `algebrik_webinar_gate_${slug}`;

const validationSchema = Yup.object({
  "0-1/firstname": Yup.string().required("First name is required"),
  "0-1/lastname": Yup.string().required("Last name is required"),
  "0-1/email": Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

type WebinarGateProps = {
  children: React.ReactNode;
  /** Unique id per webinar route (e.g. 20-nov-2025) — used for localStorage unlock */
  webinarSlug: string;
  /** Shown in HubSpot context.pageName for attribution */
  pageTitle?: string;
};

export default function WebinarGate({
  children,
  webinarSlug,
  pageTitle,
}: WebinarGateProps) {
  const [mounted, setMounted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const key = storageKeyForSlug(webinarSlug);

  useEffect(() => {
    setMounted(true);
    try {
      if (typeof window !== "undefined" && localStorage.getItem(key) === "1") {
        setUnlocked(true);
      }
    } catch {
      /* private mode */
    }
  }, [key]);

  const formik = useFormik({
    initialValues: {
      "0-1/firstname": "",
      "0-1/lastname": "",
      "0-1/email": "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitError(null);
      try {
        const pageName =
          pageTitle?.trim() ||
          `Webinar — ${webinarSlug.replace(/-/g, " ")}`;
        const res = await fetch(HUBSPOT_SUBMIT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: Object.keys(values).map((name) => ({
              name,
              value: values[name as keyof typeof values],
            })),
            context: {
              pageUri:
                typeof window !== "undefined" ? window.location.href : "",
              pageName,
            },
          }),
        });
        if (!res.ok) {
          setSubmitError("Something went wrong. Please try again.");
          return;
        }
        try {
          localStorage.setItem(key, "1");
        } catch {
          /* still show content this session */
        }
        setUnlocked(true);
        formik.resetForm();
      } catch {
        setSubmitError("Something went wrong. Please try again.");
      }
    },
  });

  if (!mounted) {
    return (
      <div className="min-h-screen w-full bg-[#f0f4fa] font-plus-jakarta" />
    );
  }

  if (unlocked) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen w-full bg-[#f0f4fa] flex flex-col items-center justify-center px-4 py-16 font-plus-jakarta">
      <div className="w-full max-w-md rounded-2xl border border-[#E2E8F1] bg-white p-8 shadow-[0px_20px_36px_0px_rgba(10,64,108,0.1)]">
        <div className="mb-8 flex justify-center">
          <Image src={blueLogo} alt="Algebrik" className="h-8 w-auto" />
        </div>
        <h1 className="text-center text-xl font-bold text-[#2A5FAC] md:text-2xl">
          Access this webinar
        </h1>
        <p className="mt-3 text-center text-sm text-[#292929]">
          Enter your details to continue. We&apos;ll send updates about this
          session and related resources.
        </p>

        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 flex flex-col gap-4"
          noValidate
        >
          <div>
            <label
              htmlFor="webinar-firstname"
              className="mb-1 block text-sm font-medium text-[#292929]"
            >
              First name
            </label>
            <input
              id="webinar-firstname"
              name="0-1/firstname"
              type="text"
              autoComplete="given-name"
              className="w-full rounded-lg border border-[#B4C7E1] px-4 py-3 text-[#292929] outline-none focus:border-[#2A5FAC]"
              value={formik.values["0-1/firstname"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched["0-1/firstname"] &&
              formik.errors["0-1/firstname"] && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors["0-1/firstname"]}
                </p>
              )}
          </div>
          <div>
            <label
              htmlFor="webinar-lastname"
              className="mb-1 block text-sm font-medium text-[#292929]"
            >
              Last name
            </label>
            <input
              id="webinar-lastname"
              name="0-1/lastname"
              type="text"
              autoComplete="family-name"
              className="w-full rounded-lg border border-[#B4C7E1] px-4 py-3 text-[#292929] outline-none focus:border-[#2A5FAC]"
              value={formik.values["0-1/lastname"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched["0-1/lastname"] &&
              formik.errors["0-1/lastname"] && (
                <p className="mt-1 text-sm text-red-600">
                  {formik.errors["0-1/lastname"]}
                </p>
              )}
          </div>
          <div>
            <label
              htmlFor="webinar-email"
              className="mb-1 block text-sm font-medium text-[#292929]"
            >
              Work email
            </label>
            <input
              id="webinar-email"
              name="0-1/email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-[#B4C7E1] px-4 py-3 text-[#292929] outline-none focus:border-[#2A5FAC]"
              value={formik.values["0-1/email"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched["0-1/email"] && formik.errors["0-1/email"] && (
              <p className="mt-1 text-sm text-red-600">
                {formik.errors["0-1/email"]}
              </p>
            )}
          </div>

          {submitError && (
            <p className="text-center text-sm text-red-600">{submitError}</p>
          )}

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="mt-2 w-full rounded-[36px] bg-[#2A5FAC] py-4 text-center text-[18px] font-semibold text-white transition hover:bg-[#1e4a8a] disabled:opacity-60"
          >
            {formik.isSubmitting ? "Submitting…" : "Continue to webinar"}
          </button>
        </form>
      </div>
    </div>
  );
}
