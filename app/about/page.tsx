import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "ID Photo Maker India helps citizens prepare photos and signatures for common government forms using private, in-browser tools.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-[#2563EB]">About</h1>
      <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
        <p>
          ID Photo Maker India is a lightweight toolkit for resizing and
          cropping photos and signatures to dimensions and file sizes often
          required by Indian government portals such as SSC, PAN, and Passport
          services.
        </p>
        <p>
          Your files are processed entirely in your browser. We do not upload
          images to our servers. Always verify the latest specifications on the
          official portal before submitting an application.
        </p>
      </div>
    </div>
  );
}
