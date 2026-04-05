"use client";

import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import type { CropperWrapperHandle } from "@/components/CropperWrapper";

const Inner = dynamic(() => import("@/components/CropperWrapper"), {
  ssr: false,
  loading: () => (
    <div
      className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="size-8 animate-spin text-[#2563EB]" aria-hidden />
      <span className="sr-only">Loading cropper</span>
    </div>
  ),
});

type Props = {
  src: string;
  aspectRatio: number;
  className?: string;
  onCropEvent?: () => void;
};

/** Code-splits Cropper.js; keeps refs working for getCroppedCanvas(). */
export const CropperDynamic = forwardRef<CropperWrapperHandle, Props>(
  function CropperDynamic(props, ref) {
    return <Inner ref={ref} {...props} />;
  }
);
