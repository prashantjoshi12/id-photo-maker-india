"use client";

import { useCallback, useRef, useState } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

type ImageUploaderProps = {
  onFile: (file: File) => void;
  disabled?: boolean;
  className?: string;
};

export function ImageUploader({ onFile, disabled, className }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      const f = list?.[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={cn(
          "flex min-h-[200px] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-10 transition-colors touch-manipulation",
          isDragging
            ? "border-[#2563EB] bg-[#2563EB]/5"
            : "border-slate-300 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-50",
          disabled && "pointer-events-none opacity-50"
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-white text-[#2563EB] shadow-sm ring-1 ring-slate-200">
          <Upload className="size-7" aria-hidden />
        </span>
        <span className="text-center text-base font-semibold text-slate-800">
          Click or Drag Image Here
        </span>
        <span className="text-center text-sm text-slate-500">
          Supported: JPG, PNG
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,.jpg,.jpeg,.png"
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
