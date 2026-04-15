import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | ID Photo Maker India",
  description:
    "Get in touch with the ID Photo Maker India team. Send us your questions, feedback, or support requests.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#2563EB] sm:text-4xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          Have a question, found a bug, or want to give feedback? Fill in the
          form below and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        {/* Contact Form */}
        <div className="lg:col-span-3">
          <ContactForm />
        </div>

        {/* Contact Info Sidebar */}
        <aside className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-[#111827]">
              Other ways to reach us
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <svg
                    className="size-4 text-[#2563EB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">Email</p>
                  <a
                    href="mailto:support@idphotomaker.in"
                    className="text-sm text-[#2563EB] underline-offset-4 hover:underline"
                  >
                    support@idphotomaker.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <svg
                    className="size-4 text-[#2563EB]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Response time
                  </p>
                  <p className="text-sm text-slate-500">
                    Usually within 2–3 business days
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500 leading-relaxed">
                For questions about specific photo requirements, please check
                the official portal directly. We cannot guarantee acceptance
                criteria set by government bodies.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
