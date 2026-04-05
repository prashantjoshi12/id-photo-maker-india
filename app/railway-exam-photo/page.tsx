import type { Metadata } from "next";
import { PhotoToolClient } from "@/tools/PhotoToolClient";

export const metadata: Metadata = {
  title: "Railway Exam Photo",
  description:
    "Resize photos for typical Indian Railway recruitment applications. Verify dimensions in the active notification.",
  alternates: { canonical: "/railway-exam-photo" },
};

export default function RailwayExamPhotoPage() {
  return (
    <PhotoToolClient
      presetId="railway"
      title="Railway Exam Photo"
      description="Upload your photo and export a JPEG sized for common railway portal rules."
      downloadFileName="railway-exam-photo.jpg"
    />
  );
}
