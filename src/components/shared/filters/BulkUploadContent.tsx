import FileDropZone from "@/components/shared/form/FileDropZone";
import { Dot, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BulkUploadContentProps {
  instructions?: string[];
  footerText?: string;
  title?: string;
  className?: string;
  onDownloadTemplate?: () => void;
  isDownloading?: boolean;
  onFileUpload?: (files: File[]) => void;
  isUploading?: boolean;
}

export default function BulkUploadContent({
  instructions = [
    "Download excel template above",
    "Fill all columns with correct details/data",
    "Save the edited document",
    "and upload back here to continue",
  ],
  footerText = "Download Sample Excel Template",
  className,
  title = "How to bulk upload",
  onDownloadTemplate,
  isDownloading = false,
  onFileUpload,
  isUploading = false,
}: BulkUploadContentProps) {
  return (
    <div className={cn("", className)}>
      <FileDropZone
        className="my-8 w-2/3 mx-auto"
        onFilesAccepted={onFileUpload}
        accept={{
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
            ".xlsx",
          ],
          "application/vnd.ms-excel": [".xls"],
        }}
        maxFiles={1}
        disabled={isUploading}
      />

      {onDownloadTemplate && (
        <div className="flex justify-center mb-4">
          <Button
            type="button"
            variant="link"
            onClick={onDownloadTemplate}
            disabled={isDownloading}
            className="text-[#0A60E1] hover:text-[#0A60E1]/80 flex items-center gap-2"
          >
            <Download size={16} />
            {isDownloading ? "Downloading..." : footerText}
          </Button>
        </div>
      )}

      <h3 className="text-[#202020] text-base font-medium">{title}</h3>

      <ul className="grid grid-cols-2 gap-5 mt-3">
        {instructions.map((instruction, i) => (
          <li key={i} className="flex items-center gap-0">
            <span>
              <Dot size={32} color="#DBEBFF" strokeWidth={8} />
            </span>
            <span className="text-sm text-[#888888]">{instruction}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
