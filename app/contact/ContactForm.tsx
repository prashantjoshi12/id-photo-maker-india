"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!name.trim()) {
      errs.name = "Name is required.";
    }
    if (!email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!message.trim()) {
      errs.message = "Message is required.";
    } else if (message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    return errs;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  function handleReset() {
    setName("");
    setEmail("");
    setMessage("");
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-green-100">
          <svg
            className="size-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800">
          Message sent successfully!
        </h3>
        <p className="mt-2 text-slate-600">
          Thank you, <span className="font-medium">{name}</span>! We&apos;ll
          get back to you at{" "}
          <span className="font-medium">{email}</span> within a few business
          days.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={handleReset}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="contact-name"
          className="mb-1.5 block text-sm font-semibold text-[#111827]"
        >
          Name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="Your full name"
          aria-required="true"
          aria-describedby={errors.name ? "name-error" : undefined}
          className={[
            "w-full rounded-lg border px-4 py-3 text-sm text-[#111827] placeholder-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]",
            "transition-colors bg-white",
            errors.name
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-slate-300 hover:border-slate-400",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="contact-email"
          className="mb-1.5 block text-sm font-semibold text-[#111827]"
        >
          Email <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder="you@example.com"
          aria-required="true"
          aria-describedby={errors.email ? "email-error" : undefined}
          className={[
            "w-full rounded-lg border px-4 py-3 text-sm text-[#111827] placeholder-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]",
            "transition-colors bg-white",
            errors.email
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-slate-300 hover:border-slate-400",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-semibold text-[#111827]"
        >
          Message <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
          }}
          placeholder="Describe your question or feedback…"
          aria-required="true"
          aria-describedby={errors.message ? "message-error" : undefined}
          className={[
            "w-full resize-y rounded-lg border px-4 py-3 text-sm text-[#111827] placeholder-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]",
            "transition-colors bg-white min-h-[120px]",
            errors.message
              ? "border-red-400 focus:border-red-500 focus:ring-red-200"
              : "border-slate-300 hover:border-slate-400",
          ]
            .filter(Boolean)
            .join(" ")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send Message
      </Button>
    </form>
  );
}
