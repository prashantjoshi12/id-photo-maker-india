import {
  Camera,
  IdCard,
  Image as ImageIcon,
  PenLine,
  Train,
  BadgeCheck,
  GraduationCap,
} from "lucide-react";

/**
 * Tool creation flow
 * ------------------
 * 1. Register metadata here (card copy, icon, URL).
 * 2. Add a route under app/<slug>/page.tsx that renders PhotoToolClient with preset id.
 * 3. Presets drive aspect ratio and output rules — no duplicate logic in pages.
 */

export const toolCards = [
  {
    id: "passport" as const,
    title: "Passport Photo Maker",
    description: "Create passport-size photo (35mm × 45mm)",
    href: "/passport-photo-maker",
    icon: Camera,
  },
  {
    id: "ssc" as const,
    title: "SSC Photo Resizer",
    description: "Resize SSC photo to 20KB–50KB",
    href: "/ssc-photo-resizer",
    icon: ImageIcon,
  },
  {
    id: "pan" as const,
    title: "PAN Photo Maker",
    description: "Format PAN card photo correctly",
    href: "/pan-photo-maker",
    icon: IdCard,
  },
  {
    id: "signature" as const,
    title: "Signature Resizer",
    description: "Resize signature to required size",
    href: "/signature-resizer",
    icon: PenLine,
  },
  {
    id: "aadhaar" as const,
    title: "Aadhaar Photo Maker",
    description: "35mm × 45mm photo for Aadhaar-related uploads",
    href: "/aadhaar-photo-maker",
    icon: BadgeCheck,
  },
  {
    id: "railway" as const,
    title: "Railway Exam Photo",
    description: "Typical railway recruitment photo size & KB band",
    href: "/railway-exam-photo",
    icon: Train,
  },
  {
    id: "upsc" as const,
    title: "UPSC Photo Maker",
    description: "Competitive exam style photo (verify current notice)",
    href: "/upsc-photo-maker",
    icon: GraduationCap,
  },
] as const;
