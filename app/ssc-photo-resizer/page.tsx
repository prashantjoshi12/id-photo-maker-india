import type { Metadata } from "next";
import { PhotoToolClient } from "@/tools/PhotoToolClient";

export const metadata: Metadata = {
  title: "SSC Photo Resizer (20–50 KB)",
  description:
    "Resize SSC application photos to a typical 20–50 KB JPEG window with fixed pixel dimensions.",
  alternates: { canonical: "/ssc-photo-resizer" },
};

export default function SscPhotoResizerPage() {
  return (
    <PhotoToolClient
      presetId="ssc"
      title="SSC Photo Resizer"
      description="Upload your photo and export a JPEG sized for common SSC upload rules."
      downloadFileName="ssc-photo.jpg"
    />
  );
}
