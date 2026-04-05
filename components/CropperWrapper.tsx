"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import { cn } from "@/lib/utils";

let faceModelsPromise: Promise<void> | null = null;

async function ensureFaceModels(
  faceapi: typeof import("@vladmandic/face-api")
): Promise<void> {
  if (!faceModelsPromise) {
    faceModelsPromise = faceapi.nets.tinyFaceDetector.loadFromUri(
      "https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.15/model"
    );
  }
  await faceModelsPromise;
}

export type CropperWrapperHandle = {
  getCroppedCanvas: () => HTMLCanvasElement | null;
  tryAutoCenterFace: () => Promise<{ ok: boolean; message?: string }>;
};

type CropperWrapperProps = {
  src: string;
  aspectRatio: number;
  className?: string;
  onCropEvent?: () => void;
};

/**
 * Cropper.js wrapper + optional face-api auto-center (lazy-loaded on demand).
 */
const CropperWrapper = forwardRef<CropperWrapperHandle, CropperWrapperProps>(
  function CropperWrapper({ src, aspectRatio, className, onCropEvent }, ref) {
    const imgRef = useRef<HTMLImageElement>(null);
    const cropperRef = useRef<Cropper | null>(null);
    const onCropEventRef = useRef(onCropEvent);
    onCropEventRef.current = onCropEvent;

    useImperativeHandle(ref, () => ({
      getCroppedCanvas: () => {
        const c = cropperRef.current;
        if (!c) return null;
        return c.getCroppedCanvas({
          imageSmoothingEnabled: true,
          imageSmoothingQuality: "high",
        });
      },
      tryAutoCenterFace: async () => {
        const img = imgRef.current;
        const cropper = cropperRef.current;
        if (!img?.naturalWidth || !cropper) {
          return { ok: false, message: "NO_CROPPER" };
        }
        try {
          const faceapi = await import("@vladmandic/face-api");
          await ensureFaceModels(faceapi);
          const det = await faceapi.detectSingleFace(
            img,
            new faceapi.TinyFaceDetectorOptions({
              scoreThreshold: 0.45,
              inputSize: 416,
            })
          );
          if (!det) {
            return { ok: false, message: "NO_FACE" };
          }
          const box = det.box;
          const imgW = img.naturalWidth;
          const imgH = img.naturalHeight;
          const ac = aspectRatio;
          let bw = box.width * 1.5;
          let bh = bw / ac;
          if (bh < box.height * 1.4) {
            bh = box.height * 1.4;
            bw = bh * ac;
          }
          const cx = box.x + box.width / 2;
          const cy = box.y + box.height / 2;
          let x = cx - bw / 2;
          let y = cy - bh / 2;
          x = Math.max(0, Math.min(x, imgW - bw));
          y = Math.max(0, Math.min(y, imgH - bh));
          bw = Math.min(bw, imgW - x);
          bh = Math.min(bh, imgH - y);
          cropper.setData({
            x,
            y,
            width: bw,
            height: bh,
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
          });
          return { ok: true };
        } catch {
          return { ok: false, message: "FACE_LOAD_FAILED" };
        }
      },
    }));

    useEffect(() => {
      const el = imgRef.current;
      if (!el || !src) return;

      cropperRef.current?.destroy();
      const fire = () => onCropEventRef.current?.();
      const c = new Cropper(el, {
        aspectRatio,
        viewMode: 1,
        dragMode: "move",
        autoCropArea: 0.92,
        responsive: true,
        restore: false,
        guides: true,
        center: true,
        highlight: true,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
        crop: fire,
        cropend: fire,
      });
      cropperRef.current = c;

      return () => {
        c.destroy();
        cropperRef.current = null;
      };
    }, [src, aspectRatio]);

    return (
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-slate-200 bg-slate-100",
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt="Photo to crop"
          className="max-h-[min(70vh,560px)] w-full"
          crossOrigin="anonymous"
        />
      </div>
    );
  }
);

CropperWrapper.displayName = "CropperWrapper";

export default CropperWrapper;
