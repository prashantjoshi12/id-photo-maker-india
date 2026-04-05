/** Canonical origin for metadata, sitemap, and robots. Override when deploying. */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://idphotomaker.in";
  return raw.replace(/\/$/, "");
}
