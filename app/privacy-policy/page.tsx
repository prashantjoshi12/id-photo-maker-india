import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | ID Photo Maker India",
  description:
    "Privacy policy for ID Photo Maker India. Learn how we handle your data — all image processing is done locally in your browser and no files are stored on our servers.",
  alternates: { canonical: "/privacy-policy" },
};

const EFFECTIVE_DATE = "15 April 2025";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#2563EB] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          Effective date: {EFFECTIVE_DATE}
        </p>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          ID Photo Maker India is committed to protecting your privacy. This
          policy explains what data we collect, how we use it, and the rights
          you have over your information.
        </p>
      </div>

      {/* Key Highlight */}
      <div className="mb-10 rounded-xl border border-blue-100 bg-blue-50/70 px-6 py-5">
        <p className="text-slate-700 leading-relaxed">
          <span className="font-semibold text-[#2563EB]">
            Important summary:
          </span>{" "}
          Images you upload are processed entirely within your browser using
          local JavaScript. They are{" "}
          <span className="font-semibold">never transmitted</span> to our
          servers and are{" "}
          <span className="font-semibold">never stored permanently</span>{" "}
          anywhere.
        </p>
      </div>

      <div className="space-y-10">
        {/* 1. Information Collection */}
        <section>
          <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
            1. Information Collection
          </h2>
          <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              We collect minimal information to operate and improve the service.
              Specifically:
            </p>
            <ul className="space-y-3 pl-1">
              {[
                {
                  heading: "No personal data stored.",
                  body: "We do not require you to create an account or provide any personal information to use our tools.",
                },
                {
                  heading: "Images processed locally.",
                  body: "All photos and signatures you select are processed in your browser using the HTML5 Canvas API. No image data is sent to our servers at any point.",
                },
                {
                  heading: "No permanent file storage.",
                  body: "Files are held temporarily in browser memory for the duration of your session only. When you close or refresh the tab, all data is discarded automatically.",
                },
                {
                  heading: "Standard server logs.",
                  body: "Our hosting provider may log basic technical data such as IP address, browser type, and pages visited. This is standard practice for web services and is not linked to the content of any images you process.",
                },
              ].map((item) => (
                <li key={item.heading} className="flex gap-3">
                  <span className="mt-1 text-[#2563EB]">•</span>
                  <span>
                    <span className="font-semibold text-[#111827]">
                      {item.heading}
                    </span>{" "}
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 2. Cookies */}
        <section>
          <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
            2. Cookies and Tracking
          </h2>
          <div className="mt-4 space-y-3 text-slate-700 leading-relaxed">
            <p>We may use the following types of cookies:</p>
            <ul className="space-y-3 pl-1">
              {[
                {
                  heading: "Essential cookies.",
                  body: "Basic cookies required to maintain your language preference and session state within the application.",
                },
                {
                  heading: "Analytics cookies.",
                  body: "We may use analytics services (such as Google Analytics) to understand aggregate usage patterns — for example, which tools are most popular. This data is anonymised and does not identify individual users.",
                },
              ].map((item) => (
                <li key={item.heading} className="flex gap-3">
                  <span className="mt-1 text-[#2563EB]">•</span>
                  <span>
                    <span className="font-semibold text-[#111827]">
                      {item.heading}
                    </span>{" "}
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
            <p>
              You can control or disable cookies through your browser settings
              at any time. Disabling cookies will not affect the core
              functionality of our image processing tools.
            </p>
          </div>
        </section>

        {/* 3. Third-party Services */}
        <section>
          <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
            3. Third-Party Services
          </h2>
          <div className="mt-4 space-y-3 text-slate-700 leading-relaxed">
            <p>
              We may integrate the following third-party services. Each operates
              under its own privacy policy:
            </p>
            <ul className="space-y-3 pl-1">
              {[
                {
                  heading: "Google Analytics.",
                  body: "Used to collect anonymous usage statistics such as page views and session duration. Google may set its own cookies. See Google's Privacy Policy for details.",
                },
                {
                  heading: "Google AdSense (planned).",
                  body: "We may display advertisements through Google AdSense in the future. Advertising cookies may be used to show relevant ads. You can opt out via Google's Ad Settings.",
                },
              ].map((item) => (
                <li key={item.heading} className="flex gap-3">
                  <span className="mt-1 text-[#2563EB]">•</span>
                  <span>
                    <span className="font-semibold text-[#111827]">
                      {item.heading}
                    </span>{" "}
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. User Rights */}
        <section>
          <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
            4. Your Rights
          </h2>
          <div className="mt-4 space-y-3 text-slate-700 leading-relaxed">
            <p>
              You retain full control over any files you use on this platform:
            </p>
            <ul className="space-y-3 pl-1">
              {[
                {
                  heading: "Full control of uploaded files.",
                  body: "You decide which images to load into the tool. No data is sent elsewhere without your action.",
                },
                {
                  heading: "No retention of images.",
                  body: "We do not keep copies of your photos or signatures. They exist only in your browser's temporary memory and are cleared when you leave the page.",
                },
                {
                  heading: "Right to access and erasure.",
                  body: "Since we do not store personal data, there is nothing for us to delete on your behalf. To remove analytics data, you can opt out of Google Analytics using a browser extension.",
                },
              ].map((item) => (
                <li key={item.heading} className="flex gap-3">
                  <span className="mt-1 text-[#2563EB]">•</span>
                  <span>
                    <span className="font-semibold text-[#111827]">
                      {item.heading}
                    </span>{" "}
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. Changes */}
        <section>
          <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
            5. Changes to This Policy
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. When we do, we will
            update the effective date at the top of this page. We encourage you
            to review this policy periodically.
          </p>
        </section>

        {/* 6. Contact */}
        <section>
          <h2 className="text-xl font-bold text-[#111827] sm:text-2xl">
            6. Contact Us
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            If you have any questions or concerns about this Privacy Policy,
            please reach out to us via our{" "}
            <a
              href="/contact"
              className="font-medium text-[#2563EB] underline underline-offset-4 hover:text-[#1D4ED8]"
            >
              Contact page
            </a>{" "}
            or email us at{" "}
            <a
              href="mailto:support@idphotomaker.in"
              className="font-medium text-[#2563EB] underline underline-offset-4 hover:text-[#1D4ED8]"
            >
              support@idphotomaker.in
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
