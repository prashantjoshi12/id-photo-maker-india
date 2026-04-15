import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ID Photo Maker India | Free ID Photo Tools",
  description:
    "Learn about ID Photo Maker India — a free, privacy-first browser tool for creating passport photos, PAN card photos, SSC photos, and signature resizing for Indian government portals.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#2563EB] sm:text-4xl">
          About ID Photo Maker India
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          A fast, free, and privacy-friendly platform for creating
          government-ready ID photos — entirely in your browser.
        </p>
      </div>

      <div className="space-y-12">
        {/* Who We Are */}
        <section>
          <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
            Who We Are
          </h2>
          <div className="mt-4 space-y-3 text-slate-700 leading-relaxed">
            <p>
              ID Photo Maker India is an independent, browser-based toolkit
              built to help Indian citizens prepare photos and signatures that
              meet the exact specifications required by government portals. We
              are not affiliated with any government ministry or agency.
            </p>
            <p>
              Our platform was created out of a simple need: to make the process
              of preparing government-compliant ID photos quick, accurate, and
              accessible to everyone — without requiring expensive software or
              photo studios.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section>
          <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
            What We Offer
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Our platform provides a suite of specialised photo tools designed
            for common Indian government and recruitment portals:
          </p>
          <ul className="mt-4 space-y-3">
            {[
              {
                title: "Passport Photo Maker",
                desc: "Resize and crop photos to the 35mm × 45mm standard required for Indian passport applications.",
              },
              {
                title: "PAN Card Photo Maker",
                desc: "Format your photo to the exact dimensions and file size accepted by the NSDL/UTI PAN portal.",
              },
              {
                title: "SSC Photo Resizer",
                desc: "Prepare photos within the 20 KB–50 KB range specified by SSC CGL, CHSL, and related exams.",
              },
              {
                title: "Signature Resizer",
                desc: "Optimise and resize signature images with background removal and ink enhancement.",
              },
              {
                title: "Aadhaar, UPSC & Railway Photo Tools",
                desc: "Additional tools tailored for Aadhaar-related uploads, UPSC civil services, and railway recruitment board requirements.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span className="mt-1 size-5 shrink-0 rounded-full bg-[#2563EB]/10 text-center text-xs leading-5 font-bold text-[#2563EB]">
                  ✓
                </span>
                <span className="text-slate-700 leading-relaxed">
                  <span className="font-semibold text-[#111827]">
                    {item.title}
                  </span>{" "}
                  — {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why Choose Us */}
        <section>
          <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
            Why Choose Us
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            We built ID Photo Maker India around four core principles:
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: "⚡",
                title: "Fast Processing",
                desc: "All image processing happens instantly in your browser. No uploads, no waiting for server responses.",
              },
              {
                icon: "📱",
                title: "Mobile Friendly",
                desc: "Works seamlessly on smartphones and tablets. Prepare your documents from anywhere.",
              },
              {
                icon: "🔒",
                title: "Secure Image Handling",
                desc: "Your photos never leave your device. Processing is done locally using modern browser APIs.",
              },
              {
                icon: "🆓",
                title: "Completely Free",
                desc: "All tools are free to use with no sign-up, no subscription, and no hidden fees.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="text-2xl">{card.icon}</div>
                <h3 className="mt-2 font-semibold text-[#111827]">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy Commitment */}
        <section className="rounded-xl border border-blue-100 bg-blue-50/60 p-6">
          <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
            Privacy Commitment
          </h2>
          <div className="mt-4 space-y-3 text-slate-700 leading-relaxed">
            <p>
              We take your privacy seriously. Every photo and signature you
              process on this platform stays on your device. We do not upload,
              store, or transmit your images to any server.
            </p>
            <p>
              All processing is performed locally in your browser using
              JavaScript and the HTML5 Canvas API. Once you close the tab, no
              trace of your files remains on our infrastructure — because they
              were never there to begin with.
            </p>
            <p>
              We may use basic analytics to understand how the platform is used
              in aggregate, but this never includes the content of your images.
              See our{" "}
              <a
                href="/privacy-policy"
                className="font-medium text-[#2563EB] underline underline-offset-4 hover:text-[#1D4ED8]"
              >
                Privacy Policy
              </a>{" "}
              for full details.
            </p>
          </div>
        </section>

        {/* Disclaimer */}
        <p className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-700">Disclaimer:</span>{" "}
          Government portals update their requirements periodically. Always
          verify the latest photo specifications on the official portal before
          submitting your application. ID Photo Maker India is not responsible
          for rejection due to specification changes.
        </p>
      </div>
    </div>
  );
}
