"use client";

import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PreviewBoxProps = {
  src: string | null;
  alt?: string;
  className?: string;
};

export function PreviewBox({ src, alt = "Output preview", className }: PreviewBoxProps) {
  return (
    <div
      className={cn(
        "flex aspect-[3/4] max-h-64 w-full max-w-xs items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50",
        className
      )}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-contain" />
      ) : (
        <div className="flex flex-col items-center gap-2 p-4 text-center text-slate-400">
          <ImageIcon className="size-10 opacity-50" aria-hidden />
          <span className="text-sm">Preview appears after you prepare the photo</span>
        </div>
      )}
    </div>
  );
}
