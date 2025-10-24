"use client";

import React, { useEffect, useRef, useState } from "react";

type DropzoneProps = {
  value?: File | string | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
  maxSizeMB?: number;
  accept?: string;
  label?: string;
  hint?: string;
};

export default function Dropzone({
  value,
  onChange,
  disabled = false,
  maxSizeMB = 2,
  accept = "image/*",
  label = "Click to upload or drag and drop",
  hint = "SVG, PNG, JPG or GIF (MAX. 800×400px)",
}: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    if (typeof value === "string") {
      setPreview(value);
      return;
    }
    const url = URL.createObjectURL(value);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [value]);

  const prevent = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDrop = (e: React.DragEvent) => {
    prevent(e);
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleFile = (file?: File) => {
    if (!file) return onChange(null);
    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }
    const sizeMB = file.size / 1024 / 1024;
    if (sizeMB > maxSizeMB) {
      alert(`File is too large. Max ${maxSizeMB} MB allowed.`);
      return;
    }
    onChange(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const onRemove = (e?: React.MouseEvent) => {
    e?.preventDefault();
    onChange(null);
  };

  return (
    <div className="w-full">
      <label
        className={`group block w-full rounded-lg border-2 ${
          isDragging
            ? "border-blue-400 bg-blue-50/40"
            : "border-dashed border-gray-300 bg-gray-50"
        } p-8 text-center transition-colors`}
        onDragEnter={(e) => {
          prevent(e);
          setIsDragging(true);
        }}
        onDragOver={(e) => prevent(e)}
        onDragLeave={(e) => {
          prevent(e);
          setIsDragging(false);
        }}
        onDrop={onDrop}
      >
        <input
          ref={fileRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={onInputChange}
          disabled={disabled}
        />

        <div
          role="button"
          tabIndex={0}
          onClick={() => !disabled && fileRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              !disabled && fileRef.current?.click();
            }
          }}
          className="flex flex-col items-center justify-center gap-3 select-none"
        >
          {/* Icon */}
          <svg
            className="mx-auto h-8 w-8 text-gray-400 group-hover:text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16l5-5 5 5M12 3v12"
            />
          </svg>

          <p className="text-sm font-semibold text-gray-700">{label}</p>
          <p className="text-xs text-gray-500">{hint}</p>
          <p className="text-xs text-gray-400 mt-1">
            {disabled ? "Disabled" : `Max ${maxSizeMB} MB`}
          </p>
        </div>
      </label>

      {/* preview */}
      <div className="mt-3 flex items-center justify-between gap-4">
        {preview ? (
          <>
            <div className="overflow-hidden rounded-md border w-full max-h-40">
              <img
                src={preview}
                alt="preview"
                className="object-cover w-full h-40"
              />
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onRemove}
                disabled={disabled}
                className="rounded-md bg-white border px-3 py-1 text-sm shadow-sm hover:bg-gray-50"
              >
                Remove
              </button>
            </div>
          </>
        ) : (
          <div className="text-xs text-gray-400">No image chosen</div>
        )}
      </div>
    </div>
  );
}
