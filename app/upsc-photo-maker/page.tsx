import type { Metadata } from "next";
import { PhotoToolClient } from "@/tools/PhotoToolClient";

export const metadata: Metadata = {
  title: "UPSC Photo Maker",
  description:
    "Prepare application photos for UPSC and similar exams. Confirm exact specs in the current exam notice.",
  alternates: { canonical: "/upsc-photo-maker" },
};

export default function UpscPhotoPage() {
  return (
    <PhotoToolClient
      presetId="upsc"
      title="UPSC Photo Maker"
      description="Upload your photo and export a JPEG in a typical competitive-exam size band."
      downloadFileName="upsc-photo.jpg"
    />
  );
}
