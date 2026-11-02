'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, X, Loader2, Image as ImageIcon, CheckCircle2 } from 'lucide-react';

interface ImageUploadDropzoneProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxFiles?: number;
}

export default function ImageUploadDropzone({
  images = [],
  onChange,
  maxFiles = 8,
}: ImageUploadDropzoneProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} photos.`);
      return;
    }

    setError(null);
    setUploading(true);

    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Client-side quick check
        if (!file.type.startsWith('image/')) {
          setError(`File ${file.name} is not an image.`);
          continue;
        }

        if (file.size > 5 * 1024 * 1024) {
          setError(`File ${file.name} exceeds 5MB limit.`);
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Upload failed for ${file.name}`);
        }

        const data = await res.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        onChange([...images, ...uploadedUrls]);
      }
    } catch (err: any) {
      setError(err.message || 'Error uploading image. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
          uploading
            ? 'border-forest-400 bg-forest-50/50 cursor-wait'
            : 'border-charcoal-300 hover:border-gold-accent hover:bg-slate-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading || images.length >= maxFiles}
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          {uploading ? (
            <div className="flex flex-col items-center space-y-2">
              <Loader2 className="w-8 h-8 text-forest-700 animate-spin" />
              <p className="text-xs font-bold text-forest-900">
                Uploading High-Definition Photos...
              </p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-2xl bg-forest-900 text-gold-accent flex items-center justify-center shadow-md">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-forest-950">
                  Tap to Choose Photos from Gallery or Camera
                </p>
                <p className="text-[11px] text-charcoal-400 mt-0.5">
                  JPG, PNG, WEBP up to 5MB each (Max {maxFiles} photos)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-lg border border-rose-200">
          {error}
        </p>
      )}

      {/* Thumbnails Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
          {images.map((url, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-xl overflow-hidden border border-charcoal-200 bg-slate-100 group shadow-sm"
            >
              <img
                src={url}
                alt={`Uploaded photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 0 && (
                <span className="absolute bottom-1 left-1 bg-forest-950/80 text-gold-light text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                  Cover
                </span>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white hover:bg-rose-600 transition-colors shadow"
                aria-label="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
