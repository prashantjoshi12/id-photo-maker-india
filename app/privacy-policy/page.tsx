import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for ID Photo Maker India.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-[#2563EB]">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
        <p>
          ID Photo Maker India processes images locally in your web browser.
          Photographs and signatures you select are not transmitted to our
          servers for processing.
        </p>
        <p>
          Standard web hosting may log basic technical data (such as page
          requests) as configured by your hosting provider. We do not use those
          logs to identify the content of your images.
        </p>
      </div>
    </div>
  );
}
