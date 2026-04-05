import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information for ID Photo Maker India.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-[#2563EB]">Contact</h1>
      <p className="mt-4 text-slate-700">
        For feedback or licensing questions about this tool, please use the
        support channel provided by your deployment maintainer. This demo site
        does not collect personal data through a contact form.
      </p>
    </div>
  );
}
