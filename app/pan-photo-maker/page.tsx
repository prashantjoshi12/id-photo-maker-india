import type { Metadata } from "next";
import { PhotoToolClient } from "@/tools/PhotoToolClient";

export const metadata: Metadata = {
  title: "PAN Photo Maker (35×25 mm)",
  description:
    "Format PAN card photographs at 35mm × 25mm. Cropping and export run entirely in your browser.",
  alternates: { canonical: "/pan-photo-maker" },
};

export default function PanPhotoMakerPage() {
  return (
    <PhotoToolClient
      presetId="pan"
      title="PAN Photo Maker"
      description="Upload your photo and generate a PAN-ready image."
      downloadFileName="pan-photo.jpg"
    />
  );
}
