import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Providers } from "@/components/providers";
import { getSiteUrl } from "@/lib/site";
import { brandColors } from "@/styles/colors";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const site = "ID Photo Maker India";

export const viewport: Viewport = {
  themeColor: brandColors.primary,
};

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default:
      "ID Photo Maker India | Create Passport, PAN, SSC Photos Online",
    template: `%s | ${site}`,
  },
  description:
    "Create passport, SSC, PAN, and signature images that match common Indian government portal rules. Fast, private, browser-only processing.",
  applicationName: site,
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/app-icon.png", sizes: "512x512", type: "image/png" }],
  },
  openGraph: {
    title: site,
    siteName: site,
    description:
      "Resize and crop photos for Indian government forms. All processing in your browser.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ID Photo Maker India — Create Government-Ready Photos in Seconds",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site,
    description:
      "Resize and crop photos for Indian government forms. All processing in your browser.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
