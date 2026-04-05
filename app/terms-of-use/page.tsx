import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for ID Photo Maker India.",
  alternates: { canonical: "/terms-of-use" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-[#2563EB]">Terms of Use</h1>
      <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
        <p>
          This website is provided &quot;as is&quot; for convenience. Government
          portals change their requirements; you are responsible for confirming
          dimensions, file size, and background rules on the official site
          before applying.
        </p>
        <p>
          We are not affiliated with the Government of India or any specific
          ministry. Trademarks belong to their respective owners.
        </p>
      </div>
    </div>
  );
}
