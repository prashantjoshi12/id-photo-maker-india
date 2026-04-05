import type { Metadata } from "next";
import { PhotoToolClient } from "@/tools/PhotoToolClient";

export const metadata: Metadata = {
  title: "Passport Photo Maker (35×45 mm)",
  description:
    "Crop and export passport-size photos at 35mm × 45mm. Private browser processing for Indian passport applications.",
  alternates: { canonical: "/passport-photo-maker" },
};

export default function PassportPhotoMakerPage() {
  return (
    <PhotoToolClient
      presetId="passport"
      title="Passport Photo Maker"
      description="Upload your photo and generate a passport-ready image."
      downloadFileName="passport-photo.jpg"
    />
  );
}
