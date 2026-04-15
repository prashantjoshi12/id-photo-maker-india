import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const paths = [
    "",
    "/passport-photo-maker",
    "/ssc-photo-resizer",
    "/pan-photo-maker",
    "/signature-resizer",
    "/aadhaar-photo-maker",
    "/railway-exam-photo",
    "/upsc-photo-maker",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-use",
    "/terms-and-conditions",
  ];
  const now = new Date();
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
