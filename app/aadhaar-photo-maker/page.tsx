import type { Metadata } from "next";
import { PhotoToolClient } from "@/tools/PhotoToolClient";

export const metadata: Metadata = {
  title: "Aadhaar Photo Maker (35×45 mm)",
  description:
    "Create 35mm × 45mm photos for Aadhaar-related uploads. Processing stays in your browser.",
  alternates: { canonical: "/aadhaar-photo-maker" },
};

export default function AadhaarPhotoPage() {
  return (
    <PhotoToolClient
      presetId="aadhaar"
      title="Aadhaar Photo Maker"
      description="Upload your photo and generate an Aadhaar-style ID image (35mm × 45mm). Always verify current UIDAI guidelines."
      downloadFileName="aadhaar-photo.jpg"
    />
  );
}
