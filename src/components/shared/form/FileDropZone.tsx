"use client";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { X, File, CloudUpload } from "lucide-react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface FileDropZoneProps {
  label?: string;
  onFilesAccepted?: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  className?: string;
  multiple?: boolean;
  footerText?: string;
  disabled?: boolean;
  existingFileUrl?: string;
  existingFileName?: string;
  onRemoveExisting?: () => void;
}

export default function FileDropZone({
  label,
  onFilesAccepted,
  maxFiles = 5,
  maxSize = 5242880,
  accept,
  className,
  multiple = true,
  footerText,
  disabled = false,
  existingFileUrl,
  existingFileName,
  onRemoveExisting,
}: FileDropZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [showExisting, setShowExisting] = useState(!!existingFileUrl);

  useEffect(() => {
    const syncExistingTimeout = window.setTimeout(() => {
      setShowExisting(!!existingFileUrl);
    }, 0);

    return () => window.clearTimeout(syncExistingTimeout);
  }, [existingFileUrl]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = multiple ? [...files, ...acceptedFiles] : acceptedFiles;
      const limitedFiles = newFiles.slice(0, maxFiles);
      setFiles(limitedFiles);

      setTimeout(() => {
        onFilesAccepted?.(limitedFiles);
      }, 0);
    },
    [maxFiles, multiple, onFilesAccepted, files],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      maxFiles,
      maxSize,
      accept,
      multiple,
      disabled,
    });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);

    setTimeout(() => {
      onFilesAccepted?.(newFiles);
    }, 0);
  };

  const removeExisting = () => {
    setShowExisting(false);
    onRemoveExisting?.();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className={cn("w-full space-y-2.5", className)}>
      {label && (
        <Label className="text-[#202020] font-medium text-sm">{label}</Label>
      )}
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          disabled
            ? "cursor-not-allowed opacity-50 bg-gray-50"
            : "cursor-pointer hover:border-[#0A60E1] hover:bg-[#F5F9FF]",
          isDragActive && !disabled && "border-[#0A60E1] bg-[#F5F9FF]",
          isDragReject && "border-red-500 bg-red-50",
          !isDragActive && !isDragReject && "border-gray-300",
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-3">
          <div className="p-3 bg-[#F0F2F5] rounded-full">
            <CloudUpload className="w-8 h-8 text-[#475367]" />
          </div>
          {isDragActive ? (
            <p className="text-[#0A60E1] font-medium">Drop the files here...</p>
          ) : (
            <>
              <div>
                <p className="font-semibold text-[#012F7F]">
                  Click to upload
                  <span className="text-[#475367] font-normal!">
                    &nbsp; or drag and drop
                  </span>
                </p>
                <p className="text-[#636363] text-sm mt-1">
                  PNG or Jpeg (max. {formatFileSize(maxSize)})
                  {maxFiles > 1 && ` Up to ${maxFiles} files`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {showExisting && existingFileUrl && (
        <div className="mt-4">
          <div className="flex items-center justify-between p-3 bg-[#F5F9FF] rounded-lg border border-[#E8E8E8]">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {existingFileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <Image
                  src={existingFileUrl}
                  alt="Current logo"
                  width={48}
                  height={48}
                  unoptimized
                  className="object-cover rounded"
                />
              ) : (
                <div className="p-2 bg-white rounded">
                  <File className="w-5 h-5 text-[#0A60E1]" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[#202020] text-sm font-medium truncate">
                  {existingFileName || "Current file"}
                </p>
                <p className="text-[#636363] text-xs">Uploaded</p>
              </div>
            </div>
            {onRemoveExisting && (
              <button
                type="button"
                onClick={removeExisting}
                className="p-1 hover:bg-red-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            )}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-[#F5F9FF] rounded-lg border border-[#E8E8E8]"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 bg-white rounded">
                  <File className="w-5 h-5 text-[#0A60E1]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#202020] text-sm font-medium truncate">
                    {file.name}
                  </p>
                  <p className="text-[#636363] text-xs">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-red-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {footerText && (
        <p className="text-[#0A60E1] text-center text-base">{footerText}</p>
      )}
    </div>
  );
}
