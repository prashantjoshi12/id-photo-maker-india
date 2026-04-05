import type { Metadata } from "next";
import { PhotoToolClient } from "@/tools/PhotoToolClient";

export const metadata: Metadata = {
  title: "Signature Resizer (10–20 KB)",
  description:
    "Crop and compress scanned signatures for government forms with a 10–20 KB target range.",
  alternates: { canonical: "/signature-resizer" },
};

export default function SignatureResizerPage() {
  return (
    <PhotoToolClient
      presetId="signature"
      title="Signature Resizer"
      description="Upload a scan or photo of your signature and export a compact JPEG."
      downloadFileName="signature.jpg"
      downloadLabel="Download Signature"
    />
  );
}
