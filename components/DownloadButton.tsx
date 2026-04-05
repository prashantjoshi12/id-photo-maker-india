"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DownloadButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  label?: string;
  className?: string;
};

export function DownloadButton({
  onClick,
  disabled,
  loading,
  label = "Download Photo",
  className,
}: DownloadButtonProps) {
  return (
    <Button
      type="button"
      variant="download"
      size="lg"
      className={cn("w-full touch-manipulation", className)}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span
            className="size-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
            aria-hidden
          />
          Processing…
        </span>
      ) : (
        <>
          <Download className="size-5" aria-hidden />
          {label}
        </>
      )}
    </Button>
  );
}
